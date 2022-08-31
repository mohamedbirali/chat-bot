/*
    Used in the html file (index.html) 
    Classes :
    .chat
    .chat__header
    .chat__header--logo
    .chat__header--title
    .chat__body
    .chat__footer
    .inputSection
    .sendBtn

    Ids :
    #textInput
*/

/* 
    used in this file (bot.js) : 
    Classes :
    .userMessage
    . 
*/
import botResponseService from './botResponseService.js';

const chatBody = document.querySelector('.chat__body');
const textInput = document.querySelector('#textInput');
const sendBtn = document.querySelector('.sendBtn');
const loadingCircles = document.querySelector('.loading');
const header = document.querySelector('.chat__header');
// conatiner
const chat = document.querySelector('.chat');

// expand if toggled
header.addEventListener('click', ()=>{
    chat.classList.toggle("_collapse");
})

// send msg on clicking the button
sendBtn.addEventListener('click', () => renderUserMessage());

//send msg pressing enter keyboard
textInput.addEventListener('keyup', ($event)=>{
    if($event.keyCode === 13){
        renderUserMessage();
    }
})

// recieve input value and send bot's response
const renderUserMessage = () => {
    const userInput = textInput.value; // recieve user input
    renderMessageElm(userInput, "user"); // send user input
    toggleLoading(false);
    // setTimeout(()=>{
    renderBotResponse(userInput); // send bot's response
    // },1000);
    
}

// bot response
const renderBotResponse = (userMsg)=>{
    getChatResponse(userMsg);
    // renderMessageElm(res, "bot"); // "bot" is optional
}

// create message element
// u can add bot's image later
const renderMessageElm = (userInput, type) => {
    let className = "userMessage";
    if(type !== "user"){
        className = "botMessage"
    }
    const messageElm = document.createElement('div');
    const messageText = document.createTextNode(userInput);
    messageElm.classList.add(className);
    messageElm.appendChild(messageText);
    chatBody.appendChild(messageElm);
    clearInput();
}

const clearInput = () => {
    textInput.value = '';
}

// get a response
const getChatResponse = (userInput)=>{
     // we can acces bot-response.js file
    /*
    return responseObj[userInput] === undefined ? "i dont understand try something else ^^" : responseObj[userInput];
    */ 
    botResponseService.getBotResponse(userInput).then((res)=>{
        if(res === undefined) res = "i dont understand try something else ^^";
        renderMessageElm(res);
        setScrollPosition();
        toggleLoading(true);            
    }).catch((err)=>{
        toggleLoading(true);            
    })
}

// check if we have a scrollbar
const setScrollPosition = () => {
    if(chatBody.scrollHeight > 0){
        chatBody.scrollTop = chatBody.scrollHeight;
    }
}

// make circles hidden or shown
const toggleLoading = (isHidden)=>{
    loadingCircles.classList.toggle("hide", isHidden);
}

