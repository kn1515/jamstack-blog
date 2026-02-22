import { BlogListResponse, WikiListResponse } from "@/lib/microcms/types";
import { http, HttpResponse } from "msw";
import { mockPosts, mockWikiPosts } from "./data";

export const handlers = [
  http.get("*/blog", () => {
    const response: BlogListResponse = {
      contents: mockPosts,
      totalCount: mockPosts.length,
      offset: 0,
      limit: 6,
    };
    return HttpResponse.json(response);
  }),

  http.get("*/blog/:id", ({ params }) => {
    const { id } = params;
    const post = mockPosts.find((post) => post.id === id);

    if (!post) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(post);
  }),

  http.get("*/wiki", () => {
    const response: WikiListResponse = {
      contents: mockWikiPosts,
      totalCount: mockWikiPosts.length,
      offset: 0,
      limit: 100,
    };
    return HttpResponse.json(response);
  }),

  http.get("*/wiki/:id", ({ params }) => {
    const { id } = params;
    const post = mockWikiPosts.find((post) => post.id === id);

    if (!post) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(post);
  }),
];