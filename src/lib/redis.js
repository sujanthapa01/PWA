require("dotenv").config();
import { Redis } from "@upstash/redis";

if (!process.env.NEXT_PUBLIC_UPSTASH_REDIS_REST_URL || !process.env.NEXT_PUBLIC_UPSTASH_REDIS_REST_TOKEN) {
    console.log("Missing Upstash Redis environment variables!");
}
const upstashUrl = process.env.NEXT_PUBLIC_UPSTASH_REDIS_REST_URL;
const upstashToken = process.env.NEXT_PUBLIC_UPSTASH_REDIS_REST_TOKEN;


const redis = new Redis({
    url: upstashUrl,
    token: upstashToken
});

export default redis;
