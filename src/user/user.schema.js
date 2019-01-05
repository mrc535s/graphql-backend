export const userSchema = `

  extend type Query {
    users: [User]
  }

  extend type Mutation {
    addUser(input: UserInput!): User
  }

  type User {
    id: ID!
    email: String!
    password: String!
    firstName: String!
    lastName: String,
    github: GitHub,
    type: [UserType]
    gitHubUserName: String
  }
  

  input UserInput {
    email: String
    password: String
    firstName: String
    lastName: String
    type: [UserType]
    gitHubUserName: String
  }

  type GitHub {
    userName: String
    numRepos: Int
  }

  enum UserType {
    Recruiter
    Developer
  }
  
`;
