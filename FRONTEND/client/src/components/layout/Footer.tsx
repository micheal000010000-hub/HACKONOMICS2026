import { Github, Terminal, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

type SubscribeStatus = "idle" | "success" | "already" | "error" | "loading";

export function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<SubscribeStatus>("idle");

  // Auto reset button state
  useEffect(() => {
    if (status === "success" || status === "already" || status === "error") {
      const timer = setTimeout(() => {
        setStatus("idle");
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      setStatus("loading");

      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.status === 200 || res.status === 201) {
        setStatus("success");
        setEmail("");
      } else if (res.status === 409) {
        setStatus("already");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <footer className="border-t border-border/50 bg-card/40 backdrop-blur-sm mt-12">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-12 mb-12">

          {/* Updates */}
          <div>
            <h3 className="font-bold text-lg mb-4">Stay Updated</h3>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Button
                type="submit"
                disabled={status === "loading"}
                className={`
                  w-full transition-colors
                  ${status === "success" && "bg-secondary"}
                  ${status === "already" && "bg-destructive"}
                  ${status === "error" && "bg-destructive"}
                `}
              >
                {status === "loading" && "Subscribing..."}
                {status === "success" && "Subscribed ✓"}
                {status === "already" && "Already Subscribed"}
                {status === "error" && "Try Again"}
                {status === "idle" && "Get Updates"}
              </Button>
            </form>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <a
              href="mailto:michealangelo000010000@gmail.com"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <Mail className="w-4 h-4" />
              michealangelo000010000@gmail.com
            </a>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Connect</h3>
            <div className="space-y-3">
              <a
                href="https://github.com/micheal000010000-hub"
                target="_blank"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
              >
                <Github className="w-4 h-4" /> GitHub
              </a>
              <a
                href="https://leetcode.com/u/micheal000010000/"
                target="_blank"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
              >
                <Terminal className="w-4 h-4" /> LeetCode
              </a>
            </div>
          </div>

        </div>

        <div className="border-t pt-6 text-center text-sm text-muted-foreground">
          © 2026 TrustBlocks. Educational platform for financial literacy.
        </div>
      </div>
    </footer>
  );
}
