import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AITutor } from "@/components/features/AITutor";
import { WorkflowDiagram } from "@/components/features/WorkflowDiagram";
import { motion } from "framer-motion";
import { Landmark, Network, CheckCircle2 } from "lucide-react";

export default function Stimulation() {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="pt-24 pb-12 px-4 flex-1 flex flex-col">
        <div className="max-w-5xl mx-auto w-full">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10 text-center"
          >
            <h1 className="text-4xl font-display font-bold mb-3">
              Financial Transaction Simulation
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Interactive, real-time comparison of traditional finance and
              blockchain transaction flows
            </p>
          </motion.div>

          {/* Side-by-side Comparison */}
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {/* Traditional */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl bg-primary-950/20 border border-primary-900/50 p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary-500/20 flex items-center justify-center">
                  <Landmark className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="text-lg font-bold text-emerald-400">
                  Traditional System
                </h3>
              </div>

              <WorkflowDiagram
                type="traditional"
                activeStep={activeStep}
                onStepChange={setActiveStep}
              />
            </motion.div>

            {/* Blockchain */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl bg-primary-950/20 border border-primary-900/50 p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                  <Network className="w-5 h-5 text-cyan-400" />
                </div>
                <h3 className="text-lg font-bold text-cyan-400">
                  Blockchain System
                </h3>
              </div>

              <WorkflowDiagram
                type="blockchain"
                activeStep={activeStep}
                onStepChange={setActiveStep}
              />
            </motion.div>
          </div>

          {/* Key Insight */}
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="
              p-6 rounded-2xl border backdrop-blur-sm
              bg-gradient-to-r
              from-secondary/15 to-primary/15
              dark:from-primary/20 dark:to-secondary/20
              border-white/10
            "
          >

            <div className="flex items-start gap-4">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5 text-secondary dark:text-primary" />
              <div>
                <h4 className="font-semibold text-sm mb-2">
                  Key Difference — Step {activeStep + 1}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {activeStep === 0 &&
                    "Legal agreements and courts enforce trust in traditional systems, while cryptography enforces trust on blockchain."}
                  {activeStep === 1 &&
                    "Banks act as custodians and intermediaries, whereas blockchain replaces them with automated smart contracts."}
                  {activeStep === 2 &&
                    "Centralized validation can censor or reverse transactions; decentralized consensus cannot."}
                  {activeStep === 3 &&
                    "Traditional settlement takes days due to reconciliation, while blockchain achieves near-instant finality."}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <AITutor />
      <Footer />
    </div>
  );
}
