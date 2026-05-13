let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

// ==============================
// 👥 CONTACT BOOK (EDIT HERE)
// ==============================
const contacts = {
    anirban2: "865337308",
    mom: "8509257859",
    dad: "7076546871"
};

// ==============================
// 🎤 SPEAK ENGINE
// ==============================
function speak(text){
    let utter = new SpeechSynthesisUtterance(text);
    utter.rate = 1;
    utter.pitch = 1;
    utter.volume = 1;
    utter.lang = "en-US";
    window.speechSynthesis.speak(utter);
}

// ==============================
// 🧼 CLEAN MESSAGE
// ==============================
function cleanMessage(message){
    return message
        .toLowerCase()
        .replace(/open the|please|can you|kindly|hey|ok|okay|just|now/g, "")
        .trim();
}

// ==============================
// 📱 WHATSAPP JARVIS ENGINE
// ==============================
function handleWhatsApp(message){

    if(message.includes("whatsapp") || message.includes("send message")){

        speak("Opening WhatsApp");

        let lowerMsg = message.toLowerCase();

        let contactName = null;

        // detect contact name
        for(let name in contacts){
            if(lowerMsg.includes(name)){
                contactName = name;
                break;
            }
        }

        // extract message
        let msg = "";

        if(lowerMsg.includes("message")){
            msg = lowerMsg.split("message")[1]?.trim();
        } 
        else if(lowerMsg.includes("send")){
            msg = lowerMsg.split("send")[1]?.trim();
        }

        if(!msg || msg.length === 0){
            msg = "Hello";
        }

        // IF CONTACT FOUND
        if(contactName && contacts[contactName]){

            let phone = contacts[contactName];

            let url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;

            window.open(url, "_blank");

            speak("Message ready for " + contactName);

        } else {

            // fallback generic
            let url = `https://wa.me/?text=${encodeURIComponent(msg)}`;

            window.open(url, "_blank");

            speak("Opening WhatsApp");
        }

        return true;
    }

    return false;
}

// ==============================
// 🌐 SMART WEBSITE OPEN
// ==============================
function smartOpen(message){

    const sites = {
        youtube: "https://www.youtube.com",
        facebook: "https://www.facebook.com",
        instagram: "https://www.instagram.com",
        linkedin: "https://www.linkedin.com",
        google: "https://www.google.com",
        wikipedia: "https://www.wikipedia.org",
        chatgpt: "https://chat.openai.com"
    };

    for(let key in sites){
        if(message.includes(key)){
            speak("Opening " + key);
            window.open(sites[key], "_blank");
            return true;
        }
    }

    return false;
}

// ==============================
// 🎵 MUSIC AUTO PLAY SYSTEM
// ==============================
function playMusic(message){

    if(message.includes("play") || message.includes("song") || message.includes("music")){

        let query = message
            .replace("play","")
            .replace("song","")
            .replace("music","")
            .trim();

        speak("Playing " + query);

        let player = document.querySelector("#player");
        if(!player) return false;

        let videoMap = {
            "sad": "higX3F3z5l8",
            "arijit": "2Vv-BfVoq4g",
            "love": "9bZkp7q19f0",
            "motivation": "IcrbM1l_BoI",
            "motivational": "IcrbM1l_BoI"
        };

        let videoId = "dQw4w9WgXcQ";

        for(let key in videoMap){
            if(query.includes(key)){
                videoId = videoMap[key];
            }
        }

        player.innerHTML = `
            <iframe 
                width="300" 
                height="170"
                src="https://www.youtube.com/embed/${videoId}?autoplay=1"
                allow="autoplay; encrypted-media"
                allowfullscreen>
            </iframe>
        `;

        return true;
    }

    return false;
}

// ==============================
// 🎤 SPEECH RECOGNITION
// ==============================
let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

recognition.onresult = (event)=>{
    let transcript = event.results[0][0].transcript;

    if(content){
        content.innerText = transcript;
    }

    takeCommand(transcript);
};

// ==============================
// 🎛️ BUTTON CLICK
// ==============================
btn.addEventListener("click", ()=>{
    recognition.start();
    btn.style.display = "none";
    voice.classList.add("show-voice");
});

// ==============================
// 🧠 MAIN AI BRAIN (JARVIS ENGINE)
// ==============================
function takeCommand(message){

    btn.style.display = "flex";
    voice.classList.remove("show-voice");

    message = cleanMessage(message);

    // ==========================
    // 📱 WHATSAPP FIRST
    // ==========================
    if(handleWhatsApp(message)) return;

    // ==========================
    // 🌐 OPEN APPS
    // ==========================
    if(smartOpen(message)) return;

    // ==========================
    // 🎵 MUSIC SYSTEM
    // ==========================
    if(playMusic(message)) return;

    // ==========================
    // 👋 GREETING
    // ==========================
    if(message.includes("hello") || message.includes("hi")){
        speak("Hello sir, I am your Jarvis assistant");
        return;
    }

    // ==========================
    // 👤 WHO AM I
    // ==========================
    if(message.includes("who are you")){
        speak("I am your AI Jarvis assistant created by Nadia Chand");
        return;
    }

    // ==========================
    // ⏰ TIME
    // ==========================
    if(message.includes("time")){
        speak(new Date().toLocaleTimeString());
        return;
    }

    // ==========================
    // 📅 DATE
    // ==========================
    if(message.includes("date")){
        speak(new Date().toDateString());
        return;
    }

    // ==========================
    // 🔍 GOOGLE SEARCH
    // ==========================
    speak("Searching on Google");

    window.open(
        `https://www.google.com/search?q=${message}`,
        "_blank"
    );
}