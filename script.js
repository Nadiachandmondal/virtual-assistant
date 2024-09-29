let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");


function speak(text){
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "hi-G8"
    window.speechSynthesis.speak(text_speak)
  
}

function wishme(){
    let day = new Date()
    let hours = day.getHours()

    if(hours >= 0 && hours <12){
        speak("Good Morning sir i am your vertual assistant , How Can  I Help You!")
    }

    else if(hours >=12 && hours < 16){
        speak("Good Afternoon sir i am your vertual assistant , How Can  I Help You!")
    }

    else if(hours>=16 && hours < 20){
        speak("Good evening sir i am your vertual assistant , How Can  I Help You!")
    }

    else{
        speak("Good Night sir i am your vertual assistant , How Can  I Help You!")
    }
}

// window.addEventListener('load' , ()=>{
//     wishme()
// })

let spechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition 
let recognition = new spechRecognition()
recognition.onresult = (event)=>{
   let currentIndex = event.resultIndex
   let transcript = event.results[currentIndex][0].transcript
   content.innerText = transcript
   takeCommand(transcript.toLowerCase())

}

btn.addEventListener('click',()=>{
    recognition.start()
    btn.style.display = "none"
    voice.style.display = "block"
})

function takeCommand(message){
    btn.style.display = "flex"
    voice.style.display = "none"
    if(message.includes("hello shipra")){
        speak("hellow sir what can i help you ")
    }
    else if(message.includes("who are you")){
        speak(" i am your virtual assistent , created by Nadia chand sir")
    }
    else if(message.includes("how are you")){
        speak("i am fine")
    }
    else if(message.includes("open youtube")){
        speak("openning youtube")
        window.open("https://www.youtube.com")
    }
    else if(message.includes("open facebook")){
        speak("openning facebook")
        window.open("https://www.facebook.com")
    }
    else if(message.includes("open instagram")){
        speak("openning instagram")
        window.open("https://www.instagram.com")
    }
    else if(message.includes("open linkedin")){
        speak("openning linkedin")
        window.open("hhttps://www.linkedin.com")
    }
    else if(message.includes("open calculator")){
        speak("openning calculator")
        window.open("calculator://")
    }
    else if(message.includes("open whatsapp")){
        speak("openning whatshap")
        window.open("whatsapp://")
    }
    else if(message.includes("time")){
        let time =new Date().toLocaleString(undefined,{hour:"numeric",minute:"numeric"})
        speak(time)
    }
    else if(message.includes("date")){
        let date =new Date().toLocaleString(undefined,{day:"numeric",month:"short"})
        speak(date)
    }
    else{
       let finalText =  "this is what i found on internet regarding" + message.replace("Tufan","")||message.replace("Toofan","")
        speak(finalText)
        window.open(`https://www.google.com/search?q=${message.replace("Tufan","")}`)
    }
    
    
}