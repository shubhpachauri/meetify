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
export default typeDef;
