import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { ArrowRight, Key, Lock, FileSignature, RefreshCw } from "lucide-react";

export function CryptoPlayground() {
  // Key Generation State
  const [keys, setKeys] = useState<{ public: string; private: string } | null>(null);
  
  // Hashing State
  const [hashInput, setHashInput] = useState("");
  const [hashOutput, setHashOutput] = useState("");

  // Signing State
  const [signMessage, setSignMessage] = useState("");
  const [signature, setSignature] = useState("");

  // Simple pseudo-crypto functions for demo purposes
  // In a real app, use window.crypto.subtle
  const generateKeys = () => {
    const randomHex = () => Math.random().toString(16).substring(2, 10);
    setKeys({
      public: `PUB_${randomHex()}${randomHex()}`,
      private: `PRIV_${randomHex()}${randomHex()}${randomHex()}`
    });
  };

  const calculateHash = async (text: string) => {
    setHashInput(text);
    if (!text) {
      setHashOutput("");
      return;
    }
    // Real SHA-256 using Web Crypto API
    const msgBuffer = new TextEncoder().encode(text);
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
    setHashOutput(hashHex);
  };

  const signData = () => {
    if (!keys || !signMessage) return;
    // Pseudo-signature for visual explanation
    const mockSig = `SIG_${btoa(signMessage + keys.private).substring(0, 32)}...`;
    setSignature(mockSig);
  };

  return (
    <div className="grid gap-8">
      
      {/* Step 1: Keypair Generation */}
      <Card className="p-6 border-primary/20 bg-card/50 backdrop-blur-sm">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-blue-500/10 text-blue-500">
            <Key className="w-6 h-6" />
          </div>
          <div className="flex-1 space-y-4">
            <div>
              <h3 className="text-xl font-bold">1. Digital Identity (Keys)</h3>
              <p className="text-muted-foreground mt-1">In blockchain, your "account" is a pair of mathematical keys. The public key is your address, the private key is your password.</p>
            </div>
            
            <Button onClick={generateKeys} variant="outline" className="gap-2 border-primary/50 hover:bg-primary/10">
              <RefreshCw className="w-4 h-4" />
              Generate New Keypair
            </Button>

            {keys && (
              <div className="grid md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-4">
                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                  <div className="text-xs font-bold text-green-500 uppercase mb-1">Public Key (Share freely)</div>
                  <code className="text-sm break-all font-mono text-green-500">{keys.public}</code>
                </div>
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                  <div className="text-xs font-bold text-red-500 uppercase mb-1">Private Key (Keep secret!)</div>
                  <code className="text-sm break-all font-mono text-red-500 blur-sm hover:blur-none transition-all cursor-help" title="Hover to reveal">{keys.private}</code>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Step 2: Hashing */}
      <Card className="p-6 border-purple-500/20 bg-card/50 backdrop-blur-sm">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-purple-500/10 text-purple-500">
            <Lock className="w-6 h-6" />
          </div>
          <div className="flex-1 space-y-4">
            <div>
              <h3 className="text-xl font-bold">2. Hashing (Fingerprinting)</h3>
              <p className="text-muted-foreground mt-1">Hashing turns any amount of data into a unique fixed-length string. Change one letter, and the hash changes completely.</p>
            </div>

            <div className="grid md:grid-cols-[1fr,auto,1fr] gap-4 items-center">
              <Input 
                placeholder="Type anything here..." 
                value={hashInput}
                onChange={(e) => calculateHash(e.target.value)}
                className="font-mono"
              />
              <ArrowRight className="hidden md:block text-muted-foreground" />
              <div className="p-3 bg-black/40 rounded-lg border border-border min-h-[46px] flex items-center">
                <code className="text-xs text-purple-300 font-mono break-all line-clamp-2">
                  {hashOutput || "SHA-256 Output..."}
                </code>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Step 3: Signing */}
      <Card className="p-6 border-orange-500/20 bg-card/50 backdrop-blur-sm">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-orange-500/10 text-orange-500">
            <FileSignature className="w-6 h-6" />
          </div>
          <div className="flex-1 space-y-4">
            <div>
              <h3 className="text-xl font-bold">3. Digital Signatures</h3>
              <p className="text-muted-foreground mt-1">Prove you sent a message without revealing your private key. The signature can be verified by anyone using your public key.</p>
            </div>

            <div className="space-y-4">
              <Textarea
                placeholder="Message to sign (e.g. 'I pay Alice 10 BTC')"
                value={signMessage}
                onChange={(e) => setSignMessage(e.target.value)}
                disabled={!keys}
              />
              
              {!keys && <p className="text-sm text-yellow-500">⚠️ Generate keys in step 1 first!</p>}

              <div className="flex justify-between items-center">
                <Button onClick={signData} disabled={!keys || !signMessage} className="bg-orange-600 hover:bg-orange-700">
                  Sign Message
                </Button>
                
                {signature && (
                  <div className="animate-in fade-in zoom-in duration-300">
                    <span className="text-xs text-muted-foreground mr-2">Generated Signature:</span>
                    <code className="bg-black/40 px-3 py-1 rounded text-orange-300 font-mono text-sm">{signature}</code>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
