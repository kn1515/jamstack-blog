import { render, screen } from "@testing-library/react";
import WikiPage from "@/app/wiki/page";
import WikiDetail from "@/app/wiki/[slug]/page";
import { http, HttpResponse } from "msw";
import { server } from "../setup/vitest-setup";
import { mockWikiPosts } from "../mocks/data";

describe("Wiki Page", () => {
  describe("正常系", () => {
    it("Wikiページのタイトルが表示される", async () => {
      render(await WikiPage());

      expect(
        screen.getByRole("heading", { level: 1, name: "Wiki" })
      ).toBeVisible();
    });

    it("Wiki記事の一覧が表示される", async () => {
      render(await WikiPage());

      const articleHeadings = screen.getAllByRole("heading", { level: 2 });
      expect(articleHeadings).toHaveLength(mockWikiPosts.length);
    });

    it("各Wiki記事の詳細ページへ正しくリンクされている", async () => {
      render(await WikiPage());

      mockWikiPosts.forEach((post) => {
        const titleHeading = screen.getByRole("heading", {
          level: 2,
          name: post.title,
        });
        const link = titleHeading.closest("a");
        expect(link).not.toBeNull();
        expect(link).toHaveAttribute("href", `/wiki/${post.id}`);
      });
    });
  });

  describe("異常系", () => {
    it("APIエラー時は、Next.jsのエラーページにフォールバックされる", async () => {
      server.use(
        http.get("*/wiki", () => {
          return new HttpResponse(null, { status: 500 });
        })
      );
      await expect(WikiPage()).rejects.toThrow();
    });
  });
});

describe("Wiki Detail Page", () => {
  describe("正常系", () => {
    it("記事タイトルが表示される", async () => {
      render(
        await WikiDetail({
          params: Promise.resolve({ slug: mockWikiPosts[0].id }),
        })
      );

      const title = await screen.findByRole("heading", {
        level: 1,
        name: mockWikiPosts[0].title,
      });
      expect(title).toBeVisible();
    });

    it("本文が表示される", async () => {
      render(
        await WikiDetail({
          params: Promise.resolve({ slug: mockWikiPosts[0].id }),
        })
      );

      const headline = await screen.findByRole("heading", {
        level: 2,
        name: "JAMstackとは",
      });
      expect(headline).toBeVisible();
    });

    it("Wiki一覧へのリンクが表示される", async () => {
      render(
        await WikiDetail({
          params: Promise.resolve({ slug: mockWikiPosts[0].id }),
        })
      );

      const link = screen.getByRole("link", { name: "Wiki一覧へ" });
      expect(link).toHaveAttribute("href", "/wiki");
    });
  });

  describe("異常系", () => {
    it("記事が見つからない場合は404を返す", async () => {
      server.use(
        http.get("*/wiki/not-found", () => {
          return new HttpResponse(null, { status: 404 });
        })
      );

      await expect(
        WikiDetail({ params: Promise.resolve({ slug: "not-found" }) })
      ).rejects.toThrow();
    });
  });
});
