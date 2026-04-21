import Beams from "@/app/_components/beams-background";
import { buttonVariants } from "@/app/_components/ui/button";
import { ArrowLeftIcon, BrainCircuit } from "lucide-react";
import Link from "next/link";
import { PropsWithChildren } from "react";

export default function Page({ children }: PropsWithChildren) {
  return (
    <div className="relative grid min-h-svh">
      <div className="absolute inset-0">
        <Beams
          lightColor="#7c3aed"
          beamWidth={2}
          beamHeight={20}
          beamNumber={30}
          speed={0.8}
          noiseIntensity={1.5}
          rotation={30}
          scale={0.15}
        />
      </div>
      <div className="relative flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-start gap-2">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-lg shadow-primary/20 transition-transform group-hover:scale-105">
              <BrainCircuit className="h-6 w-6" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">Neli AI</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-[440px] rounded-2xl border border-white/10 bg-zinc-950/80 p-8 backdrop-blur-2xl shadow-[0_0_50px_-12px_rgba(124,58,237,0.3)]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
