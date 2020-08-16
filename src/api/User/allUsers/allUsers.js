import {prisma} from "../../../../prismagram/generated/prisma-client"

export default {
    Query : {
        allUsers : async() => {
           return await prisma.users();
        }
    }
}