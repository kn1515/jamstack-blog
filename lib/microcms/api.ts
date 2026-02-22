import { client } from "./client";
import { BlogPost, WikiPost } from "./types";

// microCMSからブログ記事を取得
async function getBlogPosts(): Promise<BlogPost[]> {
  const data = await client.get({
    endpoint: "blog",
    queries: {
      limit: 6, // 最新の6件を取得
    },
  });
  return data.contents;
}

// microCMSから特定の記事を取得
async function getBlogPostById(id: string): Promise<BlogPost> {
  const data = await client.get({
    endpoint: `blog/${id}`,
  });
  return data;
}

// microCMSからWiki記事を取得
async function getWikiPosts(): Promise<WikiPost[]> {
  const data = await client.get({
    endpoint: "wiki",
    queries: {
      limit: 100,
    },
  });
  return data.contents;
}

// microCMSから特定のWiki記事を取得
async function getWikiPostById(id: string): Promise<WikiPost> {
  const data = await client.get({
    endpoint: `wiki/${id}`,
  });
  return data;
}

export { getBlogPosts, getBlogPostById, getWikiPosts, getWikiPostById };