
const chatBotService = {
    getBotResponse(userInput){
        return fetchResponse(userInput);
    }
}

const fetchResponse = (userInput)=>{
    return new Promise((res, rej)=>{
        try {
            setTimeout(()=>{
                res(responseObj[userInput]);
            },1000)
        } catch (error) {
            rej(error);
        }
    });
}

export default chatBotService;