import { prisma } from "../../../../generated/prisma-client";
export default {
    Mutation : {
        createAccount : async(_, args, { request }) => { // server.js에서 context에 담아 전달한 request를 가져옴
            const { username, email, firstName = "", lastName = "", bio = "" } = args;
            const user = await prisma.createUser({
                username, 
                email,
                firstName, 
                lastName, 
                bio
            });

            return user;
        }
    }
}