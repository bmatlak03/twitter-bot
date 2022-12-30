import { client } from "./lib/twitter";
import {
  StreamingV2AddRulesParams,
  TweetSearchV2StreamParams,
} from "twitter-api-v2";

export const deleteAllRules = async () => {
  const rules = await client.v2.streamRules();
  if (rules.data?.length) {
    await client.v2.updateStreamRules({
      delete: { ids: rules.data.map((rule) => rule.id) },
    });
  }
};
export const addNewStreamRules = async (rules: StreamingV2AddRulesParams) =>
  await client.v2.updateStreamRules(rules);

export const createStream = async () => {
  const endpointParameters: TweetSearchV2StreamParams = {
    "tweet.fields": ["author_id", "conversation_id"],
    expansions: ["author_id", "referenced_tweets.id"],
    "media.fields": ["url"],
    "user.fields": ["username"],
    backfill_minutes: 0,
    "place.fields": [],
    "poll.fields": [],
  };
  const stream = client.v2.searchStream(endpointParameters);
  return stream;
};
