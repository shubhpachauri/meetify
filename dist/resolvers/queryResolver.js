"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
//push
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryResolver = void 0;
// src/resolvers/queryResolver.ts
const googleapis_1 = require("googleapis");
const googleCalendar_1 = require("../services/googleCalendar");
exports.queryResolver = {
  Name: () =>
    __awaiter(void 0, void 0, void 0, function* () {
      return "Shubh";
    }),
  Age: () =>
    __awaiter(void 0, void 0, void 0, function* () {
      return 22;
    }),
  getContacts: () =>
    __awaiter(void 0, void 0, void 0, function* () {
      const service = googleapis_1.google.people({
        version: "v1",
        auth: googleCalendar_1.oauth2Client,
      });
      const res = yield service.people.connections.list({
        resourceName: "people/me",
        pageSize: 20,
        personFields: "names,emailAddresses",
      });
      const connections = res.data.connections;
      return connections.map((person) => ({
        // displayName: person.names ? person.names[0].displayName : null,
        displayName: person.names[0].displayName || null,
      }));
    }),
};
