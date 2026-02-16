import Hero from "@/components/hero";
// import Features from "@/components/features";
import Compiler from "@/components/compiler";
// import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
       <Hero />
       {/* <Features /> */}
       <Compiler />   
      {/* <Footer /> */}
    </div>
  );
}
