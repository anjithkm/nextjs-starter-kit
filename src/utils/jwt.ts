import jwt, { JwtPayload, Secret } from "jsonwebtoken";

const secretKey: Secret = "your_secret_key"; // Use an environment variable in production

// Define the type for the payload. You can replace `Record<string, any>` with a more specific type.
export function generateToken(payload: Record<string, any>): string {
	return jwt.sign(payload, secretKey, { expiresIn: "1h" });
}

export function verifyToken(token: string): JwtPayload | null {
	try {
		return jwt.verify(token, secretKey) as JwtPayload;
	} catch (error) {
		return null;
	}
}
