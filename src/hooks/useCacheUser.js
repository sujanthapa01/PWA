import redis from "@/lib/redis";

const cacheUser = async (userId, user) => {
    if(!userId || !user){
        console.log("error to set the data in redis")
    }
    await redis.set(`userID:${userId}`,  JSON.stringify(user),  { "ex": 1209600 });
    console.log("data is cached", JSON.stringify(user))
    return;

    }
    export default cacheUser;