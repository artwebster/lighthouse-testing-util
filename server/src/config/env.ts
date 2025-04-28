import dotenv from "dotenv";

dotenv.config();

if (
	!process.env.GOOGLE_CLIENT_ID ||
	!process.env.GOOGLE_CLIENT_SECRET ||
	!process.env.SESSION_SECRET ||
	!process.env.CLIENT_URL
) {
	throw new Error("Missing required environment variables.");
}

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
export const SESSION_SECRET = process.env.SESSION_SECRET;
export const CLIENT_URL = process.env.CLIENT_URL;
export const PORT = process.env.PORT || 5000;
export const JWT_SECRET = process.env.JWT_SECRET || "secret-key";
