import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const Contact = () => {
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);

    try {
      // Simulated POST request using fetch
      const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "Contact Form",
          body: "Message from contact page",
        }),
      });

      if (res.ok) {
        toast.success("Message sent successfully!");
        (e.target as HTMLFormElement).reset();
      }
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-20">
      <div className="max-w-xl mx-auto">
        <h1 className="text-4xl md:text-5xl mb-4">Get in Touch</h1>
        <p className="text-muted-foreground text-lg mb-10">
          Send us a message. This form submits via a POST fetch request.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="text-sm font-medium mb-1.5 block">Name</label>
            <Input id="name" placeholder="Your name" required />
          </div>
          <div>
            <label htmlFor="email" className="text-sm font-medium mb-1.5 block">Email</label>
            <Input id="email" type="email" placeholder="you@example.com" required />
          </div>
          <div>
            <label htmlFor="message" className="text-sm font-medium mb-1.5 block">Message</label>
            <Textarea id="message" placeholder="What's on your mind?" rows={5} required />
          </div>
          <Button type="submit" disabled={sending} className="w-full">
            {sending ? "Sending…" : "Send Message"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
