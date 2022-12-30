import { client } from "./lib/twitter";

export const retweetWithPhoto = async (
  path: string,
  status: string,
  id: string
) => {
  const mediaId = await client.v1.uploadMedia(path);

  try {
    await client.v2.quote(status, id, {
      media: {
        media_ids: [mediaId],
      },
    });
  } catch (error) {
    console.log("Something went wrong when posting photo!", error);
  }
};

export const replyToTweet = async (path: string, id: string) => {
  const mediaId = await client.v1.uploadMedia(path);

  try {
    await client.v2.reply("", id, {
      media: {
        media_ids: [mediaId],
      },
    });
  } catch (error) {
    console.log("Something went wrong when replying to tweet!", error);
  }
};
