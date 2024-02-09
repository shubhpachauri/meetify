import dotenv from "dotenv";
import { config } from "dotenv";
import fastify from "fastify";
import mercurius from "mercurius";
import { google } from "googleapis";
import dayjs from "dayjs";

config(); // dotenv
const app = fastify({ logger: true });

const PORT = 4000;
const calendar = google.calendar({ version: "v3" });
const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URL
);

const scopes = [
  "https://www.googleapis.com/auth/calendar",
  "https://www.googleapis.com/auth/userinfo.email openid",
];

const getData = () => {
  return [
    { id: 1, name: "abc" },
    { id: 2, name: "xyz" },
    { id: 3, name: "pqr" },
  ];
};

const typeDef = `


type Query{
  Name:String!,
  Age:Int  
}

  type Mutation {
    createEvent(summary: String!, description: String!, start: String!, end: String!): String!
  }
`;

const resolvers = {
  Query: {
    Name: async () => {
      return "Shubh";
    },
    Age: async () => {
      return 22;
    },
  },
  Mutation: {
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
  },
};

app.register(mercurius, {
  schema: typeDef,
  resolvers: resolvers,
  graphiql: true,
});

app.get("/", (req, res: any) => {
  res.send("use /data to get response data");
});

app.get("/google", (request, reply) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
  });
  reply.redirect(url);
});

app.get("/google/redirect", async (request, reply) => {
  const code = request.query.code;
  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    reply.send({
      msg: "you have successfully logged in ",
    });
  } catch (error) {
    console.error("Error getting tokens:", error);
    reply.status(500).send({ error: "Failed to authenticate user" });
  }
});

const start = async () => {
  try {
    app.listen({ port: PORT }, () => {
      console.log(`Server is running on ${PORT}`);
    });
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

start();
