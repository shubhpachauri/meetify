// src/services/googleCalendar.ts
import { google } from "googleapis";

export const calendar = google.calendar({ version: "v3" });

export const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URL
);
