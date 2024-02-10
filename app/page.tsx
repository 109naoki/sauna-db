import { getArticles } from "@/lib/newt";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const articles = await getArticles();
  return (
    <div>
      <h1>サウナDB</h1>
      <ul>
        {articles.map((article) => {
          return (
            <li key={article._id}>
              <Link href={`articles/${article.slug}`}>{article.title}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
