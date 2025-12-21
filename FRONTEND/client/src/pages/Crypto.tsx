import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CryptoPlayground } from "@/components/features/CryptoPlayground";
import { AITutor } from "@/components/features/AITutor";

export default function Crypto() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="pt-24 pb-16 px-4 max-w-4xl mx-auto flex-1">
        <div className="mb-12">
          <h1 className="text-4xl font-display font-bold mb-4">Cryptography Playground</h1>
          <p className="text-xl text-muted-foreground">
            Explore the mathematical building blocks that make blockchains secure.
            No complex math required—just click and see.
          </p>
        </div>
        
        <CryptoPlayground />
      </main>
      <AITutor />
      <Footer />
    </div>
  );
}
