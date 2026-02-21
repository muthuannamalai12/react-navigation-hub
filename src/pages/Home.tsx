import { useEffect, useState } from "react";

interface Post {
  id: number;
  title: string;
  body: string;
}

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=6")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div>
      <section className="py-24 px-6 text-center">
        <h1 className="text-5xl md:text-7xl tracking-tight mb-6">
          Stories worth<br />
          <span className="text-primary">telling</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          A collection of thoughts, fetched live from an API. Navigate between pages to explore.
        </p>
      </section>

      <section className="container mx-auto px-6 pb-20">
        <h2 className="text-2xl mb-8">Latest Posts</h2>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-xl bg-card border p-6 animate-pulse h-48" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <article
                key={post.id}
                className="rounded-xl bg-card border p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <span className="text-xs font-semibold text-primary uppercase tracking-widest">
                  Post #{post.id}
                </span>
                <h3 className="text-lg mt-2 mb-3 leading-snug capitalize">{post.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-3">{post.body}</p>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
