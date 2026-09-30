async function translateText() {
    const text = document.getElementById("inputText").value;
    const source = document.getElementById("sourceLanguage").value;
    const target = document.getElementById("targetLanguage").value;
    const output = document.getElementById("outputText");

    if (text.trim() === "") {
        output.innerText = "Please enter some text.";
        return;
    }

    output.innerText = "Translating...";

    try {
        const url =
            "https://api.mymemory.translated.net/get?q=" +
            encodeURIComponent(text) +
            "&langpair=" +
            source +
            "|" +
            target;

        const response = await fetch(url);
        const data = await response.json();

        if (data.responseData) {
            output.innerText = data.responseData.translatedText;
        } else {
            output.innerText = "Translation failed.";
        }

    } catch (error) {
        console.error(error);
        output.innerText = "Error connecting to translation service.";
    }
}

function copyText() {
    const text = document.getElementById("outputText").innerText;

    navigator.clipboard.writeText(text)
        .then(() => {
            alert("Translation copied!");
        });
}

function speakText() {
    const text = document.getElementById("outputText").innerText;

    if ("speechSynthesis" in window) {
        const speech = new SpeechSynthesisUtterance(text);
        speechSynthesis.speak(speech);
    } else {
        alert("Text-to-speech is not supported.");
    }
}