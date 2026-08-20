import { Bree_Serif, Raleway } from "next/font/google";

export const breeSerif = Bree_Serif({
    weight: ["400"],
    subsets: ["latin"],
    display: "swap",
    fallback: ["Georgia", "serif"],
    variable: "--font-bree-serif",
});

export const raleway = Raleway({
    weight: ["400", "500", "700"], 
    subsets: ["latin"],
    display: "swap",
    fallback: ["Georgia", "serif"],
    variable: "--font-raleway", 
});