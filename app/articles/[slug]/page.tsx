import { getArticleBySlug, getArticles } from "@/lib/newt";
import { Metadata } from "next";
import { draftMode } from "next/headers";
import Link from "next/link";

type Props = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { isEnabled } = draftMode();
  const { slug } = params;
  const article = await getArticleBySlug(slug, isEnabled);

  return {
    title: article?.title,
    description: "投稿詳細",
  };
}

export default async function Article({ params }: Props) {
  const { isEnabled } = draftMode();
  const { slug } = params;
  const article = await getArticleBySlug(slug, isEnabled);
  if (!article) return;

  return (
    <main>
      {isEnabled && (
        <Link href="/api/disable-draft" prefetch={false}>
          Draft Modeをやめる
        </Link>
      )}
      <h1>{article.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: article.body }} />
    </main>
  );
}
