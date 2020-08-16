import {prisma} from "../../../prismagram/generated/prisma-client"

const resolvers = {
    Query : {
        sayHello : async () => {
            console.log(await prisma.users());
            return "HELLO";
        }
    }
}

export default resolvers;