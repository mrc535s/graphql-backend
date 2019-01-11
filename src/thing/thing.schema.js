export const thingSchema = `

  extend type Query {
    things: [Thing]
  }

  extend type Mutation {
    addThing(input: ThingInput!): Thing
  }

  type Thing {
    id: ID!
    user: User
    description: String!
    thingDate: String!
    image: String
    type: String
    status: String!
  }
  

  input ThingInput {
    userId: ID!
    description: String!
    thingDate: String
    image: String
    type: String
    status: String!
  }
  
`;
