import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Coins, CheckCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

type Mode = "pow" | "pos";

interface Block {
  id: number;
  miner: string;
  hash: string;
}

export function ConsensusVisualizer() {
  const [mode, setMode] = useState<Mode>("pow");
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [miningProgress, setMiningProgress] = useState(0);
  const [validators, setValidators] = useState([
    { id: "V1", stake: 1000, active: false },
    { id: "V2", stake: 5000, active: false },
    { id: "V3", stake: 500, active: false },
    { id: "V4", stake: 3000, active: false },
  ]);

  // Simulation loop
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (mode === "pow") {
      interval = setInterval(() => {
        setMiningProgress((prev) => {
          if (prev >= 100) {
            addBlock("Miner " + Math.floor(Math.random() * 100));
            return 0;
          }
          return prev + Math.random() * 20;
        });
      }, 500);
    } else {
      // PoS logic
      interval = setInterval(() => {
        setMiningProgress((prev) => {
          if (prev >= 100) {
            // Pick validator weighted by stake
            const totalStake = validators.reduce((sum, v) => sum + v.stake, 0);
            let random = Math.random() * totalStake;
            let selected = validators[0];
            
            for (const v of validators) {
              random -= v.stake;
              if (random <= 0) {
                selected = v;
                break;
              }
            }
            
            // Visualize selection
            setValidators(v => v.map(val => ({...val, active: val.id === selected.id})));
            setTimeout(() => setValidators(v => v.map(val => ({...val, active: false}))), 1000);
            
            addBlock(`Validator ${selected.id}`);
            return 0;
          }
          return prev + 25; // Faster blocks in PoS
        });
      }, 800);
    }

    return () => clearInterval(interval);
  }, [mode, validators]);

  const addBlock = (miner: string) => {
    setBlocks(prev => {
      const newBlock = {
        id: prev.length + 1,
        miner,
        hash: Math.random().toString(36).substring(7)
      };
      const newList = [newBlock, ...prev];
      return newList.slice(0, 5); // Keep last 5
    });
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Controls */}
      <div className="space-y-6">
        <div className="bg-card border border-border rounded-xl p-1">
          <div className="grid grid-cols-2 gap-1">
            <button
              onClick={() => { setMode("pow"); setBlocks([]); setMiningProgress(0); }}
              className={cn(
                "flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-all",
                mode === "pow" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-muted"
              )}
            >
              <Cpu className="w-5 h-5" />
              Proof of Work
            </button>
            <button
              onClick={() => { setMode("pos"); setBlocks([]); setMiningProgress(0); }}
              className={cn(
                "flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-all",
                mode === "pos" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-muted"
              )}
            >
              <Coins className="w-5 h-5" />
              Proof of Stake
            </button>
          </div>
        </div>

        <div className="bg-card border border-border p-6 rounded-xl">
          <h3 className="text-xl font-bold mb-4 font-display">How it works</h3>
          {mode === "pow" ? (
            <div className="space-y-4 text-muted-foreground">
              <p>In Proof of Work, miners compete to solve complex mathematical puzzles. This requires significant computational power (electricity).</p>
              <div className="flex items-center gap-3 text-primary">
                <Clock className="w-5 h-5" />
                <span className="font-semibold">Current Difficulty: High</span>
              </div>
            </div>
          ) : (
            <div className="space-y-4 text-muted-foreground">
              <p>In Proof of Stake, validators are chosen to create new blocks based on how many coins they hold and are willing to "stake" as collateral.</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {validators.map(v => (
                  <motion.div 
                    key={v.id}
                    animate={{ scale: v.active ? 1.1 : 1, borderColor: v.active ? "var(--primary)" : "transparent" }}
                    className="p-3 border border-border bg-muted/30 rounded-lg flex flex-col items-center min-w-[80px]"
                  >
                    <span className="font-bold text-foreground">{v.id}</span>
                    <span className="text-xs">{v.stake} coins</span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Visualization */}
      <div className="bg-card/50 border border-border rounded-xl p-6 min-h-[400px] flex flex-col">
        <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"/>
          Live Network Status
        </h3>

        {/* Mining Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm mb-2 text-muted-foreground">
            <span>{mode === "pow" ? "Mining Hash..." : "Selecting Validator..."}</span>
            <span>{Math.round(miningProgress)}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-primary"
              style={{ width: `${miningProgress}%` }}
            />
          </div>
        </div>

        {/* Blockchain */}
        <div className="flex-1 flex flex-col gap-4 relative">
          <AnimatePresence mode="popLayout">
            {blocks.map((block) => (
              <motion.div
                key={block.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="p-4 rounded-xl border border-primary/20 bg-primary/5 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    #{block.id}
                  </div>
                  <div>
                    <div className="font-mono text-sm text-primary/80">Hash: {block.hash}</div>
                    <div className="text-xs text-muted-foreground">Found by: {block.miner}</div>
                  </div>
                </div>
                <CheckCircle className="w-5 h-5 text-green-500" />
              </motion.div>
            ))}
          </AnimatePresence>
          
          {blocks.length === 0 && (
            <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm italic">
              Waiting for first block...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
