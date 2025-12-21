import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  FileSignature,
  Cpu,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";

export interface WorkflowDiagramProps {
  type: "traditional" | "blockchain";
  activeStep: number;
  onStepChange: (step: number) => void;
}

const MotionIcon = motion;

const STEPS = [
  {
    title: "Agreement",
    icon: FileSignature,
    traditional: "Paper contract signed between buyer and seller.",
    blockchain: "Digitally signed transaction intent."
  },
  {
    title: "Intermediary",
    icon: Cpu,
    traditional: "Bank manually verifies identity and funds.",
    blockchain: "Smart contract checks balance automatically."
  },
  {
    title: "Validation",
    icon: ShieldCheck,
    traditional: "Central authority approves the transfer.",
    blockchain: "Network nodes validate transaction."
  },
  {
    title: "Settlement",
    icon: CheckCircle2,
    traditional: "Ledger updated after T+2 days.",
    blockchain: "Block added and settled instantly."
  }
];

export function WorkflowDiagram({
  type,
  activeStep,
  onStepChange
}: WorkflowDiagramProps) {
  return (
    <div className="flex flex-col gap-4">
      {STEPS.map((step, index) => {
  const isActive = index === activeStep;

  // ✅ CORRECT: wrap icon here
  const MotionIcon = motion(step.icon);

  return (
    <motion.div
      key={step.title}
      onClick={() => onStepChange(index)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "cursor-pointer rounded-xl border p-4 transition-all",
        isActive
          ? type === "traditional"
            ? "bg-emerald-500/20 border-emerald-400 shadow-md"
            : "bg-cyan-500/20 border-cyan-400 shadow-md"
          : "bg-white/5 border-white/10 hover:bg-white/10"
      )}
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "w-10 h-10 rounded-lg flex items-center justify-center",
            isActive
              ? type === "traditional"
                ? "bg-emerald-500/20 text-emerald-400"
                : "bg-cyan-500/20 text-cyan-400"
              : "bg-white/5 text-muted-foreground"
          )}
        >
          {/* ✅ Animated Lucide Icon */}
          <MotionIcon
            className="w-5 h-5"
            animate={
              isActive
                ? type === "blockchain"
                  ? { rotate: 360 }
                  : { scale: [1, 1.2, 1] }
                : { scale: 1 }
            }
            transition={
              type === "blockchain"
                ? { repeat: Infinity, duration: 6, ease: "linear" }
                : { duration: 0.6 }
            }
          />
        </div>

        <h4 className="font-semibold text-sm">
          Step {index + 1}: {step.title}
        </h4>
      </div>

      <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
        {type === "traditional"
          ? step.traditional
          : step.blockchain}
      </p>
    </motion.div>
  );
})}

    </div>
  );
}
