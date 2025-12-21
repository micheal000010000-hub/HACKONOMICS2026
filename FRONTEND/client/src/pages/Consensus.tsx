import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ConsensusVisualizer } from "@/components/features/ConsensusVisualizer";
import { AITutor } from "@/components/features/AITutor";

export default function Consensus() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="pt-24 pb-16 px-4 max-w-6xl mx-auto flex-1">
        <div className="mb-12">
          <h1 className="text-4xl font-display font-bold mb-4">Consensus Mechanisms</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            How do thousands of computers agree on the same history without a boss?
            Visualize the two most popular methods: Proof of Work (Bitcoin) and Proof of Stake (Ethereum).
          </p>
        </div>

        <ConsensusVisualizer />
      </main>
      <AITutor />
      <Footer />
    </div>
  );
}
