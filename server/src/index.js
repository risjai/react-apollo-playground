const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')
const Query = require('./resolvers/Query')
// import x from './resolvers/Query';
const Mutation = require('./resolvers/Mutation')
const Subscription = require('./resolvers/Subscription')
const Feed = require('./resolvers/Feed')
const YAML = require('yamljs')
const dbConfigData = YAML.load('dbConfig.yml');

const resolvers = {
  Query,
  Mutation,
  Subscription,
  Feed,
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: YAML.parse(dbConfigData.dbServerEndpoint),
      secret: YAML.parse(dbConfigData.dbServerSecret),
      debug: true
    }),
  }),
})

server.start(() => console.log('Server is running on http://localhost:4000'))
