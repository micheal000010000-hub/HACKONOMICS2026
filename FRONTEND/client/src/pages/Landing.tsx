import { Link } from "wouter";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { AITutor } from "@/components/features/AITutor";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Database, Globe } from "lucide-react";
import { motion } from "framer-motion";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-purple-500/10 blur-[100px]" />

      <Navbar />

      <main className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Hero */}
        <div className="text-center space-y-8 mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-sm text-primary mb-6 font-medium">
              Interactive Financial Education
            </span>
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-6">
              Who Authorizes <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400 text-glow">
                Your Money?
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Understand the shift from institution-based trust to code-based verification.
              Experience how financial transactions work in both worlds.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/stimulation">
              <Button size="lg" className="h-14 px-8 text-lg rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all">
                Start Stimulation <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/crypto">
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-xl border-border hover:bg-white/5">
                Learn Cryptography
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Shield,
              title: "Stimulation",
              desc: "Compare how banks use legal authority versus how blockchains use mathematical proof.",
              href: "/stimulation"
            },
            {
              icon: Database,
              title: "Cryptography",
              desc: "See how data is stored, validated, and linked together to create immutable records.",
              href: "/crypto"
            },
            {
              icon: Globe,
              title: "Consensus",
              desc: "Learn how consensus algorithms allow thousands of strangers to agree on the state of money.",
              href: "/consensus"
            }
          ].map((feature, idx) => (
            <Link key={idx} href={feature.href}>
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="w-full p-8 rounded-2xl bg-card/50 border border-white/5 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/10 transition-all group hover:scale-105"
                data-testid={`card-feature-${feature.href}`}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-left">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-left">{feature.desc}</p>
              </motion.button>
            </Link>
          ))}
        </div>
      </main>

      <AITutor />
      <Footer />
    </div>
  );
}
