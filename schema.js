import { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLList } from "graphql"

const attachmentType = new GraphQLObjectType({
  name: 'Attachment',
  fields: {
    photo: { 
      id: { type: GraphQLString },
    }
  }
})

const feedType = new GraphQLObjectType({
  name: 'Feed',
  fields: {
    id: { type: GraphQLString },
    text: { type: GraphQLString },
    attachments: { type: new GraphQLList(attachmentType) },
    actorId: { type: GraphQLString }
  }
})

const sampleFeed = {
  id: '1',
  text: 'sample feed text',
  attachments: [{photo: { id: '516166463' }}],
  actorId: '12651654'
}

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    feed: {
      type: feedType,
      resolve() {
        return sampleFeed
      }
    }
  }
})

const schema = new GraphQLSchema({
  query: RootQuery,
})

export default schema