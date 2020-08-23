import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";

import dotenv from "dotenv";
import path from "path";
import { prisma } from "../generated/prisma-client";

dotenv.config({
    path : path.resolve(__dirname, ".env")
})

const jwtOptions = {
    // authentication 헤더에서 jwt를 찾는 역할
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    // 토큰을 암호화하는데 사용되는 값(이값을 이용해 암호화된 토큰을 복호화함)
    secretOrKey : process.env.JWT_SECRET
};

// 3. jwt인증으로부터 토큰을 복호화해서 가져옴
// 4. 가져온 토큰 정보에서 사용자 id 값을 꺼내 db에서 정보를 찾아 있을 경우 다음진행
const verifyUser =  async (payload, done) => {
    try{
        const user = await prisma.user({id : payload.id});

        if(user !== null) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    } catch(error) {
        return done(error, false);
    }
}

// 미들웨어로 토큰을 받아서 해석하고 사용자를 찾고 사용자가 존재하면 req객체에 사용자를 추가하고나면
// graphql 함수를 실행하게 됨
// 로그인이 확인되면 모든 graphql요청에 사용자 정보가 추가되어 요청되게 됨
// 미들웨어 => 서버 수행 전 사전 작업
// 2. GraphqlServer 수행 전 수행되고 이때, verifyUser 메서드 수행
export const authenticateJwt = (req, res, next) => {
    return passport.authenticate("jwt", {sessions: false}, (error, user) => {
        // verifyUser에서 사용자 정보를 받아온 후에, 사용자 정보가 존재하면 그
        // 사용자 정보를 req객체에 넣어줌
        if(user){ // 5. callback함수로 복호화된 토큰으로 사용자 정보를 찾아왔으면 해당 user정보를 request에 넣어줌
            req.user = user;
        } else {
            console.log('not-------------');
        }
        next();
    })(req, res, next);
}


// callback 함수로 복호화된 토큰 정보가 넘어옴
passport.use(new Strategy(jwtOptions, verifyUser));
passport.initialize();
