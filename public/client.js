console.log("hello world");
const socket=io()
const textarea=document.getElementById("textarea")
const msgArea = document.getElementById("message__area")
let clientName;
do{
    clientName = prompt("enter your name")
} while (!clientName)

textarea.addEventListener("keyup",function(e){
    if(e.key==="Enter"){
        sentMessage(e.target.value)
        e.target.value=""
    }   
})
function sentMessage(sentMessage) {
let msg={
    user:clientName,
    message: sentMessage,
}
appendMessage(msg,"outgoing")
    socket.emit('message', msg)
}
function appendMessage(msg,type) {
const div = document.createElement("div")
const className=type
div.classList.add(className,"message")
let markup = `
<h4>${msg.user}</h4>
<p>${msg.message}</p>`
div.innerHTML = markup
msgArea.appendChild(div)
}


socket.on("message",(msg) =>{
    // console.log(msg)
    appendMessage(msg,"incoming")
} )