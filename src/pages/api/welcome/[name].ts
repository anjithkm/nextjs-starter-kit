import { NextApiRequest, NextApiResponse } from "next";
import { verifyToken } from "@/utils/jwt";
import { JwtPayload } from "jsonwebtoken";

// Define the type for your request object to include `user`

// You can replace `JwtPayload` with a more specific interface if needed
declare module "next" {
	interface NextApiRequest {
		user?: JwtPayload;
	}
}

// API route handler using the middleware-like function
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	console.log("req", req.query);

	const { name, id } = req.query;

	// Simulate middleware behavior by calling the token verification function
	//   await verifyTokenMiddleware("all");

	switch (req.method) {
		case "GET":
			res.status(200).json({ message: `${name}`, id: id });
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
