import { GraphQLServer } from "graphql-yoga";
// 환경설정 파일을 불러옴(key:value 형태로 구성된) => .env 파일을 읽음
import dotenv from "dotenv";
dotenv.config();

// 로거
import logger from "morgan";
import schema from "./schema";

// .env파일에 있는 PORT변수에 접근(.env파일은 루트 디렉토리에 있어야함!)
const PORT = process.env.PORT || 4000;

console.log("test : " + process.env.PORT);

const typeDefs = `
    type Query{
        hello : String!
    }
`;

const resolvers = {
    Query : {
        hello : () => "hello"
    }
}

const server = new GraphQLServer({
    schema
});

// graphql은 express 서버를 내장하고 있고 로거를 사용할 수 있도록 지정해주는 부분
server.express.use(logger("dev"));

server.start({
    port : PORT
}, () => console.log(`server start : http://localhost:${PORT}`));