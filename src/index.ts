import "dotenv/config";
import { fastify, FastifyReply, FastifyRequest } from "fastify";
import mercurius from "mercurius";
import { resolvers } from "./resolvers";
import typeDef from "./schema";
import { oauth2Client } from "./services/googleCalendar";

const scopes = [
  "https://www.googleapis.com/auth/calendar",
  "https://www.googleapis.com/auth/contacts",
];

const app = fastify();
const PORT = 4000;

app.register(mercurius, {
  schema: typeDef,
  resolvers,
  graphiql: true,
});

app.get(
  "/",
  { websocket: true },
  (_req: FastifyRequest, res: FastifyReply): void => {
    res.send("use /google to get auth token data");
  }
);

app.get("/google", (_request, reply) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
  });
  reply.redirect(url);
});

app.get("/google/redirect", async (request, reply) => {
  const code = (request.query as any).code;
  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    reply.redirect("http://localhost:4000/graphiql#");
  } catch (error) {
    console.error("Error getting tokens:", error);
    reply.status(500).send({ error: "Failed to authenticate user" });
  }
});

app
  .listen({ port: PORT }) // Use an options object instead of passing port and host directly
  .then(() => {
    console.log(`Server is running on http://localhost:${PORT}`);
  })
  .catch((err) => {
    console.error("Error starting server:", err);
    process.exit(1);
  });
