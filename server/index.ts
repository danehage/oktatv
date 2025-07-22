import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { getVimeoVideos, getVimeoVideo } from "./routes/vimeo";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    res.json({ message: "Hello from Express server v2!" });
  });

  app.get("/api/demo", handleDemo);

  // Vimeo API routes
  app.get("/api/vimeo/videos", getVimeoVideos);
  app.get("/api/vimeo/videos/:videoId", getVimeoVideo);

  return app;
}
