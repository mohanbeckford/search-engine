
const typeDefs = `
type Book {
  _id: ID
  authors: [String]
  description: String!
  bookId: String!
  image: String
  link: String
  title: String!
}

type User {
  _id: ID
  username: String!
  email: String!
  password: String!
  savedBooks: [Book]
  bookCount: Int
}

type Query {
  getUserById(userId: ID!): User
 
}

type Mutation {
  createUser(username: String!, email: String!, password: String!): User
  loginUser(email: String!, password: String!): User
  addBookToUser(userId: ID!, authors: [String], description: String!, bookId: String!, image: String, link: String, title: String!): User
}
`;


module.exports = typeDefs;