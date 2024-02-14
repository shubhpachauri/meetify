// src/resolvers/queryResolver.ts
import { google } from "googleapis";
import { oauth2Client } from "../services/googleCalendar";
import typeDef from "../schema";

export const queryResolver = {
  Name: async () => {
    return "Shubh";
  },
  Age: async () => {
    return 22;
  },
  getContacts: async () => {
    const service = google.people({ version: "v1", auth: oauth2Client });
    const res = await service.people.connections.list({
      resourceName: "people/me",
      pageSize: 20,
      personFields: "names,emailAddresses",
    });
    const connections = res.data.connections;
    return connections.map((person) => ({
      // displayName: person.names ? person.names[0].displayName : null,
      displayName: person.names[0].displayName || null,
    }));
  },
};
