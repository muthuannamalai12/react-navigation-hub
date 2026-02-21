import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  company: { name: string; catchPhrase: string };
}

const About = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users?_limit=4")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="container mx-auto px-6 py-20">
      <h1 className="text-4xl md:text-5xl mb-4">About Us</h1>
      <p className="text-muted-foreground text-lg max-w-2xl mb-12">
        We're a team of passionate people. Here's our crew, fetched live via the Fetch API.
      </p>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="rounded-xl bg-card border p-6 animate-pulse h-36" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {users.map((user) => (
            <div
              key={user.id}
              className="rounded-xl bg-card border p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{user.name}</h3>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <p className="text-sm text-accent font-medium">{user.company.name}</p>
              <p className="text-sm text-muted-foreground italic mt-1">"{user.company.catchPhrase}"</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default About;
