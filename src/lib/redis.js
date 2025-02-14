import { Redis } from "@upstash/redis";

const redis = new Redis({
    url: "https://coherent-escargot-15164.upstash.io",
    token:"ATs8AAIjcDFhNTBhOWRjNzM3NjM0NTc5YjM5MzUyMzgzOWY5ZmEyY3AxMA" 
});

console.log(process.env.UPSTASH_REDIS_REST_URL,process.env.UPSTASH_REDIS_REST_TOKEN)
export default redis;
