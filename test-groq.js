// const fetch = require('node-fetch'); // no longer needed in Node 24+
require('dotenv').config({ path: '.env.local' });

async function testGroq() {
    const key = process.env.GROQ_API_KEY;
    console.log("Using key:", key?.substring(0, 10) + "...");
    
    try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: { 
                "Authorization": `Bearer ${key}`, 
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [
                    { role: "user", content: "Hola, esto es una prueba." }
                ],
                temperature: 0
            })
        });

        if (!response.ok) {
            const err = await response.json();
            console.error("HTTP Error:", response.status, err);
        } else {
            const data = await response.json();
            console.log("Success:", data.choices[0].message.content);
        }
    } catch (e) {
        console.error("Fetch Error:", e.message);
        if (e.cause) console.error("Cause:", e.cause);
    }
}

testGroq();
