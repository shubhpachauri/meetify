"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oauth2Client = exports.calendar = void 0;
// src/services/googleCalendar.ts
const googleapis_1 = require("googleapis");
exports.calendar = googleapis_1.google.calendar({ version: "v3" });
exports.oauth2Client = new googleapis_1.google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URL);
