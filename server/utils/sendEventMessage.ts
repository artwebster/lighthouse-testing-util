import { Response } from "express";

// function to send messages to the frontend
// must be called within an SSE stream

export default function sendEventMessage(
  res: Response,
  event: "message" | "update" | "results",
  data: string
) {
  res.write(`event: ${event}\n`);
  res.write(`data: ${data}\n\n`);
}
