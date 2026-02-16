import PixelBlast from "./ui/pixel-blast";

export default function Hero() {
  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* pixcel as background layer */}
      <div className="absolute inset-0 z-0">
        <PixelBlast />
      </div>
      
      {/*content layer OVER pixel */}
      <div className="relative z-10 flex flex-col items-center justify-center bg-gradient-to-b from-primary/50 to-secondary/60 rounded-xl p-4 shadow-md">
        <h1 className="text-4xl font-bold text-foreground text-center">
          Your javascript compiler.
        </h1>
        <p className="text-lg text-foreground text-center">Compile your javascript code to a executable file.</p>
      </div>
    </div>
  );
}