import { getWikiPostById, getWikiPosts } from "@/lib/microcms/api";
import { BookOpen } from "lucide-react";
import Link from "next/link";

type WikiDetailProps = {
  params: Promise<{ slug: string }>;
};

export default async function WikiDetail({ params }: WikiDetailProps) {
  const { slug } = await params;
  const post = await getWikiPostById(slug);

  return (
    <main className="flex-grow">
      <article className="max-w-3xl mx-auto px-4 pt-32 py-12">
        <header className="mb-6">
          <div className="relative">
            <h1 className="text-5xl font-medium leading-tight mb-8">
              {post.title}
            </h1>
            <BookOpen className="transform -rotate-12 h-8 w-8 absolute -top-4 -left-6" />
          </div>
          <div className="flex flex-wrap items-center gap-4 text-gray-600">
            <time>{new Date(post.updatedAt).toLocaleDateString("ja-JP")}</time>
            {post.tags?.length > 0 && (
              <>
                <div className="h-1 w-1 bg-gray-200 rounded-full" />
                <div className="flex gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag.id}>#{tag.name}</span>
                  ))}
                </div>
              </>
            )}
          </div>
        </header>

        <div
          className="prose prose-zinc prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.body }}
        />

        <footer className="space-y-6 mt-12">
          <div className="text-sm text-gray-400">― 記事の終わり</div>
          <Link href="/wiki" className="inline-flex text-sm underline">
            Wiki一覧へ
          </Link>
        </footer>
      </article>
    </main>
  );
}

export async function generateStaticParams() {
  const posts = await getWikiPosts();
  return posts.map((post) => ({ slug: post.id }));
}
