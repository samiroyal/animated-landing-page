import express, { Request, Response, NextFunction, Express } from "express";
import { registerRoutes } from "./routes.js";
import { serveStatic } from "./static.js";
import { createServer } from "http";
import type { IncomingMessage } from "http";

const app: Express = express();
const httpServer = createServer(app);

/* -------------------- TYPES -------------------- */
declare module "http" {
  interface IncomingMessage {
    rawBody?: Buffer;
  }
}

/* -------------------- BODY PARSING -------------------- */
app.use(
  express.json({
    verify: (req: IncomingMessage, _res, buf: Buffer) => {
      req.rawBody = buf;
    },
  }),
);

app.use(express.urlencoded({ extended: false }));

/* -------------------- LOGGER -------------------- */
export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

/* -------------------- API LOGGER MIDDLEWARE -------------------- */
app.use((req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: unknown;

  const originalResJson = res.json.bind(res);

  res.json = ((body: unknown) => {
    capturedJsonResponse = body;
    return originalResJson(body);
  }) as typeof res.json;

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      log(logLine);
    }
  });

  next();
});

/* -------------------- BOOTSTRAP -------------------- */
(async () => {
  await registerRoutes(httpServer, app);

  /* -------- ERROR HANDLER -------- */
  app.use((err: unknown, _req: Request, res: Response, next: NextFunction) => {
    const status =
      typeof err === "object" && err && "status" in err
        ? (err as any).status
        : 500;

    const message =
      typeof err === "object" && err && "message" in err
        ? (err as any).message
        : "Internal Server Error";

    console.error("Internal Server Error:", err);

    if (res.headersSent) {
      return next(err);
    }

    return res.status(status).json({ message });
  });

  /* -------- DEV / PROD MODE -------- */
  if (process.env.NODE_ENV === "production") {
    serveStatic(app);
  } else {
    const { setupVite } = await import("./vite.js");
    await setupVite(httpServer, app);
  }

  /* -------- SERVER START -------- */
  const port = parseInt(process.env.PORT || "5000", 10);

  app.listen(port, "0.0.0.0", () => {
    log(`serving on port ${port}`);
  });
})();
