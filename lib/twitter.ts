import { TwitterApi } from "twitter-api-v2";
import * as dotenv from "dotenv";
dotenv.config();

export const client = new TwitterApi(process.env.BEARER_TOKEN as string);
