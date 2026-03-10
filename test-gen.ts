import { GoogleGenerativeAI } from "@google/generative-ai";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const key = process.env.GEMINI_API_KEY;
if (!key) {
    console.error("GEMINI_API_KEY no definida");
    process.exit(1);
}

async function main() {
    try {
        const genAI = new GoogleGenerativeAI(key as string);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const result = await model.generateContent("Di hola");
        console.log("Success:", result.response.text());
    } catch (err: any) {
        console.error("SDK fetch failed:", err);
    }
}

main();
