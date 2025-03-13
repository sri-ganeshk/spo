import { h1 } from "motion/react-client";
import { GoogleGeminiEffectDemo } from "./components/GoogleGeminiEffectDemo";
import { HeroParallaxDemo } from "./components/HeroParallaxDemo";
import { WavyBackgroundDemo } from "./components/WavyBackgroundDemo";

export default function Home() {
    return (
        <div className=" ">      
            <GoogleGeminiEffectDemo/>
            <HeroParallaxDemo/>
        </div>    
        );
}
