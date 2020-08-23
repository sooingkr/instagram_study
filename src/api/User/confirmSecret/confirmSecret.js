import { prisma } from "../../../../generated/prisma-client";
import { generateToken } from "../../../utils";

export default {
    Mutation : {
        confirmSecret : async(_, args, {request}) => { // 7. context에서 공유한 request를 전달
            console.log(request.user);
            const {email, secret} = args;
            const user = await prisma.user({email});

            if(user.loginSecret === secret) {
                // JWT
                const token = generateToken(user.id);
                return token;
                
            } else {
                throw Error("Wrong email/secret conbination");
            }
        }
    }
}