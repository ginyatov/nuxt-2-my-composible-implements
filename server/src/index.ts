import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { faker } from '@faker-js/faker'

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
# Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

type Book {
    id: ID!
    title: String
    author: String
}

type Product {
    id: ID!
    title: String!
    price: Int!
    oldPrice: Int
    discount: Int
    image: String!
    article: Int!
}

type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    createdAt: String!
    updatedAt: String!
}

type Cart {
    id: ID!
    products: [Product!]!
    total: Int!
    createdAt: String!
    updatedAt: String!
    user: User!
}

type Todo {
    id: ID!
    title: String!
    completed: Boolean!
    author: String!
    createdAt: String!
    updatedAt: String!
}

input CreateTodoInput {
    title: String!
    author: String!
}

input UpdateTodoInput {
    id: ID!
    title: String
    completed: Boolean
}

type Query {
    books: [Book]!
    todos(limit: Int = 10): [Todo!]!
    products: [Product!]!
    productById(id: ID!): Product!
    cart: [Cart]!
}

type Mutation {
    updateProduct(id: ID!, title: String, price: Int): Product!
    deleteProduct(id: ID!): Product!
    addTodo(input: CreateTodoInput!): Todo!
    updateTodo(input: UpdateTodoInput!): Todo!
    deleteTodo(id: ID!): Todo!
}
`

const createMockTodo = () => ({
  id: faker.string.uuid(),
  title: faker.lorem.sentence(),
  completed: faker.datatype.boolean(),
  author: faker.internet.userName(),
  createdAt: faker.date.past().toISOString(),
  updatedAt: faker.date.recent().toISOString(),
})

const books = [
  {
    id: '1',
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
  },
  {
    id: '2',
    title: 'Jurassic Park',
    author: 'J.K. Rowling',
  },
]

const createMockProduct = () => ({
  article: faker.number.int({ max: 2000 }),
  discount: faker.commerce.price(),
  image: faker.image.urlLoremFlickr({
    category: 'product',
  }),
  oldPrice: faker.commerce.price(),
  price: faker.commerce.price(),
  id: faker.string.uuid(),
  title: faker.commerce.productName(),
})

const products = Array.from({ length: 10 }, createMockProduct)

const cart = []

const todos = Array.from({ length: 5 }, createMockTodo)
const resolvers = {
  Query: {
    books: () => books,
    todos: (_, { limit }) => todos.slice(0, limit),
    products: () => products,
    productById: (_, { id }) => products.find((product) => product.id === id),
    cart: () => cart,
  },
  Mutation: {
    addTodo: (_, { input }) => {
      const newTodo = {
        id: faker.string.uuid(),
        title: input.title,
        completed: false,
        author: input.author,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      todos.push(newTodo)

      return newTodo
    },
    updateTodo: (_, { input }) => {
      // Mock updating an existing todo
      const existingTodo = todos.find((todo) => todo.id === input.id)
      if (!existingTodo) {
        throw new Error(`Todo with id ${input.id} not found`)
      }
      existingTodo.title = input.title ?? existingTodo.title
      existingTodo.completed = input.completed ?? existingTodo.completed
      existingTodo.updatedAt = new Date().toISOString()

      return existingTodo
    },
    deleteTodo: (_, { id }) => {
      const index = todos.findIndex((todo) => todo.id === id)
      if (index === -1) {
        throw new Error(`Todo with id ${id} not found`)
      }
      const [deleteTodo] = todos.splice(index, 1)
      return deleteTodo
    },
  },
}

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
})

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
})

console.log(`🚀  Server ready at: ${url}`)
