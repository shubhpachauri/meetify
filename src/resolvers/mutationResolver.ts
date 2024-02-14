// src/resolvers/mutationResolver.ts
import { calendar, oauth2Client } from "../services/googleCalendar";
import dayjs from "dayjs";

interface EventArgs {
  summary: string;
  description: string;
  start: string;
  end: string;
}

export const mutationResolver = {
  createEvent: async (_, { summary, description, start, end }) => {
    await calendar.events.insert({
      calendarId: "primary",
      auth: oauth2Client,
      requestBody: {
        summary,
        description,
        start: {
          dateTime: dayjs(start).toISOString(),
          timeZone: "Asia/Kolkata",
        },
        end: {
          dateTime: dayjs(end).toISOString(),
          timeZone: "Asia/Kolkata",
        },
      },
    });
    return "Event created successfully!";
  },
};
