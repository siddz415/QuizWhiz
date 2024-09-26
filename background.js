chrome.runtime.onInstalled.addListener(() => {
    console.log("QuizWhiz extension installed");
});

// Listen for messages from popup or content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'ASK_QUESTION') {
        const question = message.question;

        // Send the question to the backend API
        fetch('http://localhost:3000/ask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ question })
        })
        .then(response => response.json())
        .then(data => {
            console.log("Answer received from API:", data.answer);
            sendResponse({ answer: data.answer });
        })
        .catch(error => {
            console.error("Error fetching answer:", error);
            sendResponse({ answer: "Sorry, there was an error fetching the answer." });
        });

        // Return true to indicate we will respond asynchronously
        return true;
    }
});
