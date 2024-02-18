import { Response } from "express";

interface EventMessageParams {
	res: Response;
	event: "message" | "update" | "results" | "status";
	data: string | Object;
}

/**
 * Sends an event message to the response stream.
 *
 * @param {EventMessageParams} params - The parameters for the function.
 * @param {Response} params.res - The Express response object.
 * @param {"message" | "update" | "results" | "status"} params.event - The type of event.
 * @param {string | Object} params.data - The data to be sent with the event.
 */
export default function sendEventMessage(params: EventMessageParams) {
	let { res, event, data } = params;

	if (typeof data === "object") {
		data = JSON.stringify(data);
	}

	res.write(`event: ${event}\n`);
	res.write(`data: ${data}\n\n`);
}
