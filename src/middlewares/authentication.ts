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

// Helper function to verify the token
export const verifyAuthenticationMiddleware = 	async(...params: any) =>
	async (req: NextApiRequest, res: NextApiResponse) =>{

    console.log("params",params)

	const token = req?.headers?.authorization?.trim(); // Extract token from Authorization header

	if (!token) {
		return res.status(401).json({ message: "No token provided" });
	}

	const decoded = verifyToken(token); // Assuming this returns the decoded token or null

	if (!decoded) {
		return res.status(401).json({ message: "Failed to authenticate token" });
	}

	// Attach the decoded user information to the request
	req.user = decoded;
};

export default verifyAuthenticationMiddleware;