document.getElementById("ask-button").addEventListener("click", async () => {
    const question = document.getElementById("quiz-input").value;
    if (!question) {
        alert("Please enter a question.");
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/ask", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ question }),
        });

        const result = await response.json();
        document.getElementById("response-text").innerText = result.answer || "No answer found.";
    } catch (error) {
        console.error("Error fetching answer:", error);
        document.getElementById("response-text").innerText = "Error fetching answer.";
    }
});

document.getElementById("auto-fetch").addEventListener("click", async () => {
    // Auto-fetch quiz question from content.js
    chrome.tabs.executeScript(
        { file: "content.js" },
        (result) => {
            document.getElementById("quiz-input").value = result[0] || "No question found.";
        }
    );
});