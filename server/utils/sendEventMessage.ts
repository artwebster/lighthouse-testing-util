// function to send messages to the frontend via SSE stream
// accepted event types are 'message', 'update', 'results'

export default function sendEventMessage(res, event, data) {
  res.write(`event: ${event}\n`);
  res.write(`data: ${data}\n\n`);
}
