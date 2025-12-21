import { Github,Terminal , Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function Footer() {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail("");
  };

  return (
    <footer className="border-t border-border/50 bg-card/40 backdrop-blur-sm mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Newsletter */}
          <div>
            <h3 className="font-display font-bold text-lg mb-4">Stay Updated</h3>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background/50"
              />
              <Button className="w-full bg-primary hover:bg-primary/90">
                Subscribe
              </Button>
            </form>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-bold text-lg mb-4">Contact</h3>
            <a
              href="mailto:michealangelo000010000@gmail.com"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="w-4 h-4" />
              michealangelo000010000@gmail.com
            </a>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-display font-bold text-lg mb-4">Connect</h3>
            <div className="space-y-3">
              <a
                href="https://github.com/micheal000010000-hub"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
              <a
                href="https://leetcode.com/u/micheal000010000/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LeetCode"
              >
                <Terminal  className="w-4 h-4" />
                LeetCode
              </a>
              <a
                href="https://github.com/micheal000010000-hub/HACKANOMICS2026"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Repository"
              >
                <Github className="w-4 h-4" />
                Repository
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border/30 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2026 TrustBlocks. Educational platform for financial literacy.</p>
        </div>
      </div>
    </footer>
  );
}
