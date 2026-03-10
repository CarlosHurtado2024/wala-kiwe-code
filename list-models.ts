import { GoogleGenerativeAI } from "@google/generative-ai";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const key = process.env.GEMINI_API_KEY || "AIzaSyB6g6yQnrCunfeyw2udIYYWZ2tOlxr4x4w";

async function main() {
    try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`;
        const res = await fetch(url);
        if (!res.ok) {
            console.error("HTTP error:", res.status, await res.text());
            return;
        }
        const data = await res.json();
        const models = data.models.map((m: any) => m.name);
        console.log("Available models:");
        console.log(models.filter((m: string) => m.includes("gemini")));
    } catch (err) {
        console.error("Fetch failed:", err);
    }
}

main();
