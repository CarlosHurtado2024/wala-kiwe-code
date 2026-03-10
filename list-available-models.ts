const key = "AIzaSyC6bbGCApCIVkhEa4CvPj8c7QwVdxGEe7M";

async function listModels() {
    try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`;
        const res = await fetch(url);
        const data = await res.json();
        if (data.models) {
            console.log("Model Names:");
            data.models.forEach((m: any) => console.log(m.name));
        } else {
            console.log("Error:", data);
        }
    } catch (err) {
        console.error("Test failed:", err);
    }
}

listModels();
