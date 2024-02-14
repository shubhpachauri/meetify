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
exports.mutationResolver = void 0;
// src/resolvers/mutationResolver.ts
const googleCalendar_1 = require("../services/googleCalendar");
const dayjs_1 = __importDefault(require("dayjs"));
exports.mutationResolver = {
    createEvent: (_, { summary, description, start, end }) => __awaiter(void 0, void 0, void 0, function* () {
        yield googleCalendar_1.calendar.events.insert({
            calendarId: "primary",
            auth: googleCalendar_1.oauth2Client,
            requestBody: {
                summary,
                description,
                start: {
                    dateTime: (0, dayjs_1.default)(start).toISOString(),
                    timeZone: "Asia/Kolkata",
                },
                end: {
                    dateTime: (0, dayjs_1.default)(end).toISOString(),
                    timeZone: "Asia/Kolkata",
                },
            },
        });
        return "Event created successfully!";
    }),
};
