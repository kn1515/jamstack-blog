import { getWikiPosts } from "@/lib/microcms/api";
import { BookOpen } from "lucide-react";
import Link from "next/link";

export default async function WikiPage() {
  const posts = await getWikiPosts();

  return (
    <main className="flex-grow">
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative max-w-3xl mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Wiki</h1>
          <BookOpen className="transform -rotate-12 h-8 w-8 absolute -top-3 -right-4" />
        </div>
        <p className="text-lg text-gray-600 mb-12">
          技術用語や概念をまとめたWikiページです。
        </p>
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.id}>
              <Link
                href={`/wiki/${post.id}`}
                className="block p-6 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <h2 className="text-xl font-semibold text-gray-900">
                  {post.title}
                </h2>
                <div className="flex gap-2 mt-2">
                  {post.tags?.map((tag) => (
                    <span key={tag.id} className="text-sm text-gray-500">
                      #{tag.name}
                    </span>
                  ))}
                </div>
                <time className="text-sm text-gray-400 mt-2 block">
                  {new Date(post.updatedAt).toLocaleDateString("ja-JP")}
                </time>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
