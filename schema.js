import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLID,
  GraphQLInputObjectType,
} from "graphql";
import Feed from "./models/Feed.js";
import User from "./models/User.js";
import Media from "./models/Media.js";

const userType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    sex: { type: GraphQLString },
  },
});

const attachmentType = new GraphQLObjectType({
  name: "Attachment",
  fields: {
    photo: {
      type: GraphQLID,
    },
  },
});

const mediaType = new GraphQLObjectType({
  name: "Media",
  fields: {
    id: { type: GraphQLID },
    mediaPath: { type: GraphQLID },
    altText: { type: GraphQLString },
    user: {
      type: userType,
      resolve(parent, args) {
        return User.findById(parent.actorId);
      },
    },
  },
});

const feedType = new GraphQLObjectType({
  name: "Feed",
  fields: {
    id: { type: GraphQLString },
    text: { type: GraphQLString },
    attachments: {
      type: new GraphQLList(mediaType),
      resolve(parent, args) {
        return Promise.all(parent.attachments.map(
          async (attachment) => await Media.findById(attachment.photo)
        ));
      },
    },
    user: {
      type: userType,
      resolve(parent, args) {
        return User.findById(parent.actorId);
      },
    },
  },
});

// const storyType = new GraphQLObjectType({
//   name: 'Story',
//   fields: {
//     id: { type: GraphQLID },
//     text: { type: GraphQLString },
//     attachments: {

//     }
//   }
// })

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    feeds: {
      type: new GraphQLList(feedType),
      resolve(parent, args) {
        return Feed.find();
      },
    },
    feed: {
      type: feedType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Feed.findById(args.id);
      },
    },
  },
});

const attachmentInputType = new GraphQLInputObjectType({
  name: "AttachmentInput",
  fields: {
    photo: { type: GraphQLID },
  },
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addFeed: {
      type: feedType,
      args: {
        text: { type: GraphQLString },
        attachments: {
          type: new GraphQLList(attachmentInputType),
        },
        actorId: { type: GraphQLID },
      },
      async resolve(parent, args) {
        const feed = new Feed({
          text: args.text,
          attachments: args.attachments,
          actorId: args.actorId,
        });

        return await feed.save();
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation,
});

export default schema;
