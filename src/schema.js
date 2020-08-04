import path from "path";
import { makeExecutableSchema } from "graphql-tools";
import { fileLoader, mergeResolvers, mergeTypes } from "merge-graphql-schemas";

// .graphql파일과 .js파일들을 가져와 defTypes, resolvers들을 묶음
const allTypes = fileLoader(path.join(__dirname, "/api/**/*.graphql"));
const allResolvers = fileLoader(path.join(__dirname, "/api/**/*.js"));

// 하나로 만듬
const schema = makeExecutableSchema({
    typeDefs : mergeTypes(allTypes),
    resolvers : mergeResolvers(allResolvers)
});

export default schema;