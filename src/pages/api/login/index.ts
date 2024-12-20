import { NextApiRequest, NextApiResponse } from "next";
import { verifyAuthenticationMiddleware } from '@/api-middlewares/authentication'

// API route handler using the middleware-like function
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {

	// const { name } = req.query;
    
	const name = "Anjith K M"

	// Simulate middleware behavior by calling the token verification function
	await verifyAuthenticationMiddleware("all");

	switch (req.method) {
		case "GET":
			res.status(404).json({ message: `${name}`});
			break;
		case "POST":
			break;
		case "PUT":
			break;
		case "DELETE":
			break;
		default:
			res.status(405).json({ message: "Method not allowed" });
	}
}