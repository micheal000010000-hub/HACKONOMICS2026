import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { ShieldCheck, Cpu, Network, Lock, Home, Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [location] = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/stimulation", label: "Stimulation", icon: Network },
    { href: "/crypto", label: "Cryptography", icon: Lock },
    { href: "/consensus", label: "Consensus", icon: Cpu },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group cursor-pointer">
            <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight">TrustBlocks</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location === item.href;
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href}>
                  <button
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium tracking-tight transition-all duration-200",
                      isActive
                        ? "bg-primary/10  shadow-sm"
                        : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                      
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </button>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              data-testid="button-theme-toggle"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </Button>

            <button
              className="md:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              data-testid="button-menu-toggle"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border/50 bg-card/50 backdrop-blur-sm">
            <div className="py-4 space-y-2">
              {navItems.map((item) => {
                const isActive = location === item.href;
                const Icon = item.icon;
                return (
                  <Link key={item.href} href={item.href}>
                    <button
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors",
                        isActive
                          ? "bg-white/10 text-white"
                          : "text-muted-foreground hover:text-white hover:bg-white/5"
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </button>
                  </Link>
                );
              })}
              <a
                href="mailto:hello@trustblocks.dev"
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-muted-foreground hover:text-white hover:bg-white/5 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Contact</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
