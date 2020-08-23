import { GraphQLServer } from "graphql-yoga";
// 환경설정 파일을 불러옴(key:value 형태로 구성된) => .env 파일을 읽음
import './env';

// 로거
import logger from "morgan";
import schema from "./schema";

import { sendSecretMail } from "./utils";

import passport from "passport";
import "./passport";
import { authenticateJwt } from "./passport";

import { prisma } from "../generated/prisma-client";

// TEST
sendSecretMail("dudfhd705@gmail.com","test123");

// .env파일에 있는 PORT변수에 접근(.env파일은 루트 디렉토리에 있어야함!)
const PORT = process.env.PORT || 4000;

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
    schema,
    // context => resolver들 사이에서 정보를 공유할 때 사용됨.
    // import된 prisma를 공유하도록 설정
    // 6. jwt 미들웨어가 수행되고 request에 사용자 User객체가 저장되게 되고, 이 request객체를 
        // 다른 resolver들이 전체적으로 공유하기 위해 context 객체에 맵핑해서 전달
    context : ({request}) => {
        return {
            request : request
        }
    }
});

// graphql은 express 서버를 내장하고 있고 로거를 사용할 수 있도록 지정해주는 부분
server.express.use(logger("dev"));

// 미들웨어에서 passport-jwt 사용하도록 설정
// 1. 미들웨어로 모든 GraphqlServer로 요청 전에 authenticateJwt 함수를 수행(in passport.js)
server.express.use(authenticateJwt);

server.start({
    port : PORT
}, () => console.log(`server start : http://localhost:${PORT}`));