export const jobsSchema = `

  extend type Query {
    jobs: [Job]
  }

  extend type Mutation {
    addJob(input: JobInput!): Job
  }

  type Job {
    id: ID!
    user: User
    minPay: Int!
    maxPay: Int!
    company: String!
    description: String!
    skills: [String]
  }
  

  input JobInput {
    userId: ID!
    minPay: Int!
    maxPay: Int!
    company: String!
    description: String!
    skills: [String]
  }
  
`;
