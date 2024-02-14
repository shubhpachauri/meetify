"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const fastify_1 = require("fastify");
const mercurius_1 = __importDefault(require("mercurius"));
const resolvers_1 = require("./resolvers");
const schema_1 = __importDefault(require("./schema"));
const googleCalendar_1 = require("./services/googleCalendar");
const scopes = [
    "https://www.googleapis.com/auth/calendar",
    "https://www.googleapis.com/auth/contacts",
];
const app = (0, fastify_1.fastify)();
const PORT = 4000;
app.register(mercurius_1.default, {
    schema: schema_1.default,
    resolvers: resolvers_1.resolvers,
    graphiql: true,
});
app.get("/", { websocket: true }, (_req, res) => {
    res.send("use /google to get auth token data");
});
app.get("/google", (_request, reply) => {
    const url = googleCalendar_1.oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: scopes,
    });
    reply.redirect(url);
});
app.get("/google/redirect", (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const code = request.query.code;
    try {
        const { tokens } = yield googleCalendar_1.oauth2Client.getToken(code);
        googleCalendar_1.oauth2Client.setCredentials(tokens);
        reply.redirect("http://localhost:4000/graphiql#");
    }
    catch (error) {
        console.error("Error getting tokens:", error);
        reply.status(500).send({ error: "Failed to authenticate user" });
    }
}));
app
    .listen({ port: PORT }) // Use an options object instead of passing port and host directly
    .then(() => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
    .catch((err) => {
    console.error("Error starting server:", err);
    process.exit(1);
});
