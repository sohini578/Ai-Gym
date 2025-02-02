let select=document.querySelector(".select-heading")
let arrow=document.querySelector(".select-heading img")
let options=document.querySelector(".options")
let option=document.querySelectorAll(".option")
let selecttext=document.querySelector(" .select-heading span")
select.addEventListener("click",()=>{
options.classList.toggle("active-options")
arrow.classList.toggle("rotate")
})

option.forEach((item)=>{
    item.addEventListener("click",()=>{
       selecttext.innerText=item.innerText;
    })
})

//chat bot

let prompt=document.querySelector(" .prompt")
let chatbtn=document.querySelector(" .input-area button")
let chatContainer=document.querySelector(" .chat-container")
let h1=document.querySelector(".h1")
let chatimg=document.querySelector("#chatbotimg")
let chatbox=document.querySelector(" .chat-box")
let userMessage="";
chatimg.addEventListener("click",()=>{
    chatbox.classList.toggle("active-chat-box")
    if(chatbox.classList.contains("active-chat-box")){
        chatimg.src="cross.svg"
    }else{
        chatimg.src="chat.svg"
    }
})
chatimg.addEventListener("click",()=>{

})
let Api_url="https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyCGQAxkhxL1vZMkQTdzZ0v41JYBHf_FZWQ"

async function generateApiResponse(aiChatBox){
    const textElement=aiChatBox.querySelector(" .text")
    try{
        const response=await fetch(Api_url,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                contents:[{
                    "role":"user",
                    "parts":[{text:`${userMessage} in 10 words`}]
                }]
            })
        })
        const data=await response.json()
        const apiResponse=data?.candidates[0].content.parts[0].text.trim();
        textElement.innerText=apiResponse
    }
    catch(error){
        console.log(error)
    }
    finally{
    aiChatBox.querySelector(" .loading").style.display="none"
    }
}

function createChatBox(html,className){
    const div=document.createElement("div")
    div.classList.add(className)
    div.innerHTML=html;
    return div
}
function showLoading(){
    const html= `<p class="text"></p>
    <img src="https://i.pinimg.com/originals/42/78/76/42787621ed6d40f0c30f0ae423fc572c.gif" class="loading" width="50px">`
             let aiChatBox=createChatBox(html,"ai-chat-box")
             chatContainer.appendChild(aiChatBox) 
             generateApiResponse(aiChatBox)
}

chatbtn.addEventListener("click",()=>{
    h1.style.display="none"
    userMessage=prompt.value;
    
    const html=` <p class="text"></p>`
    let userChatBox=createChatBox(html,"user-chat-box")
    userChatBox.querySelector(" .text").innerText=userMessage
    chatContainer.appendChild(userChatBox)
    prompt.value=""
    setTimeout(showLoading,500)
})

//virtual-assistant
let ai=document.querySelector(".virtual-assistant img")
let speakpage=document.querySelector(".speak-page")
let content=document.querySelector(".speak-page h1")


function speak(text){
    let text_speak=new SpeechSynthesisUtterance(text)
    text_speak.rate=1
    text_speak.pitch=1
    text_speak.volume=1
    text_speak.lang= "en"
    window.speechSynthesis.speak(text_speak)

}
let speechRecognition= window.SpeechRecognition || window.webkitSpeechRecognition
let recognition=new speechRecognition()
recognition.onresult=(event)=>{
    speakpage.style.display="none"
    let currentIndex=event.resultIndex
    let transcript=event.results[currentIndex][0].transcript
    content.innerText=transcript
   takeCommand(transcript.toLowerCase())
}
function takeCommand(message){
    if(message.includes("open") && message.includes("chat")){
        speak("ok")
    chatbox.classList.add("active-chat-box")
}
else if(message.includes("close") && message.includes("chat")){
    speak("ok")
    chatbox.classList.remove("active-chat-box")
}
else if(message.includes("back")){
    speak("ok")
    window.open("back.html")
}
else if(message.includes("chest")){
    speak("ok")
    window.open("chest.html")
}
else if(message.includes("biceps")||message.includes("triceps")){
    speak("ok")
    window.open("biceps.html")
}
else if(message.includes("leg")){
    speak("ok")
    window.open("leg.html")
}
else if(message.includes("home")){
    speak("ok")
    window.open("index.html")
}
}
ai.addEventListener("click",()=>{
    recognition.start()
   speakpage.style.display="flex";
})

