"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeDef = `

type Person{
  displayName: String
}

type Query{
  Name:String,
  Age:Int  
  getContacts:[Person]
}

  type Mutation {
    createEvent(summary: String!, description: String!, start: String!, end: String!): String!
  }
`;
exports.default = typeDef;
