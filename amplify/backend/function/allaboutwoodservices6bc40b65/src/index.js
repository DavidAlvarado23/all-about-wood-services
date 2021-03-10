const { createQuote } = require("./createQuote");

const resolvers = {
  Mutation: {
    createQuote,
  },
};

exports.handler = async (event) => {
  const { fieldName, typeName } = event;

  if (typeName in resolvers) {
    if (fieldName in resolvers[typeName]) {
      return await resolvers[typeName][fieldName](event);
    }
  }

  throw new Error("Resolver not found");
};
