import "server-only";
import { createClient } from "newt-client-js";
import { Article } from "@/types/article";
import { cache } from "react";

const client = createClient({
  spaceUid: process.env.NEWT_SPACE_UID + "",
  token: process.env.NEWT_CDN_API_TOKEN + "",
  apiType: "cdn",
});

// 一覧
export const getArticles = cache(async () => {
  const { items } = await client.getContents<Article>({
    appUid: "blog",
    modelUid: "article",
    query: {
      select: ["_id", "title", "slug", "body"],
    },
  });
  return items;
});

// 詳細
export const getArticleBySlug = cache(async (slug: string) => {
  const article = await client.getFirstContent<Article>({
    appUid: "blog",
    modelUid: "article",
    query: {
      slug,
      select: ["_id", "title", "slug", "body"],
    },
  });
  return article;
});
