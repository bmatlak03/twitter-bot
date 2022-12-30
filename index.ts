import {
  addNewStreamRules,
  createStream,
  deleteAllRules,
} from "./streamController";
import { replyToTweet, retweetWithPhoto } from "./tweetsController";
import { ETwitterStreamEvent, StreamingV2AddRulesParams } from "twitter-api-v2";

const userId = "";

const setupRules = async (rules: StreamingV2AddRulesParams) => {
  await deleteAllRules(); //Delete all previous rules
  await addNewStreamRules(rules); //set up new rules we want to track
};

const listenForNewTweet = async (userId: string) => {
  const rules: StreamingV2AddRulesParams = {
    add: [{ value: `from:${userId}`, tag: `from ${userId}` }],
  };

  try {
    console.log(`Listening for new tweet from${userId}`);

    await setupRules(rules);
    const stream = await createStream();

    stream.on(ETwitterStreamEvent.Data, (stream) => {
      const status = `Hey guys @${userId} just dropped new tweet!`;
      retweetWithPhoto("assets/image.jpg", status, stream.data.id);
      replyToTweet("assets/image.jpg", stream.data.id);
    });
  } catch (error: any) {
    console.error("Something went wrong!", error.message);
  }
};

listenForNewTweet(userId);
