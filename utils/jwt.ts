import jwt from "jsonwebtoken";

export function jwtSign(token: any) {
  if (!process.env.NEXT_PUBLIC_JWT_CLIENT_PRIVATE_KEY) {
    throw new Error("Help me! No private key found");
  }

  return jwt.sign(token, process.env.NEXT_PUBLIC_JWT_CLIENT_PRIVATE_KEY, {
    algorithm: "RS256",
  });
}
