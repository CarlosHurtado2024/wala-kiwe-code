const key = "AIzaSyC6bbGCApCIVkhEa4CvPj8c7QwVdxGEe7M";

async function testKey() {
    try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`;
        const res = await fetch(url);
        const data = await res.json();
        console.log("Status:", res.status);
        console.log("Data:", JSON.stringify(data, null, 2));
    } catch (err) {
        console.error("Test failed:", err);
    }
}

testKey();
