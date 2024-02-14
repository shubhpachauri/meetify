"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
// src/resolvers/index.ts
const queryResolver_1 = require("./queryResolver");
const mutationResolver_1 = require("./mutationResolver");
exports.resolvers = {
  Query: queryResolver_1.queryResolver,
  Mutation: mutationResolver_1.mutationResolver,
};
