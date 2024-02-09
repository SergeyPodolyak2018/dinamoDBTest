import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLNonNull,
  GraphQLList,
} from 'graphql';
import statusController from '../controller/status.js';
import cardController from '../controller/cards.js';

const statusType = new GraphQLObjectType({
  name: 'StatusType',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
  },
});
const cardType = new GraphQLObjectType({
  name: 'CardType',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    body: { type: new GraphQLNonNull(GraphQLString) },
    status: { type: new GraphQLNonNull(GraphQLString) },
  },
});

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      status: {
        type: new GraphQLList(statusType),
        resolve: async () => {
          const data = await statusController.getAllStatus();
          return data;
        },
      },
      cards: {
        type: new GraphQLList(cardType),
        resolve: async () => {
          const data = await cardController.getAllCards();
          return data;
        },
      },
      cardsByStatus: {
        type: new GraphQLList(cardType),
        args: {
          status: { type: GraphQLString },
        },
        resolve: async (parent, args) => {
          const data = await cardController.getAllCardsByStatus(args.status);
          return data;
        },
      },
    },
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      updateCard: {
        type: GraphQLString,
        args: {
          id: { type: GraphQLString },
          status: { type: GraphQLString },
        },
        resolve: async (parent, args) => {
          const data = await cardController.updateCardStatus(
            args.id,
            args.status
          );
          return data;
        },
      },
    },
  }),
});

export default schema;
