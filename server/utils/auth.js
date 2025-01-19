import { auth } from "express-oauth2-jwt-bearer";
import dotenv from "dotenv";
dotenv.config();

export const validateToken = auth({
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`,
  audience: process.env.AUTH0_AUDIENCE,
});

export const getUserInfo = async (url, accessToken) => {
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    return null;
  }
};
