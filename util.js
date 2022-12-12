const axios = require('axios');
const config = require('./config');

async function registerUser(name, email) {
    try {
        const data = JSON.stringify({
            name: name,
            email: email
        });
        const axiosConfig = {
            method: 'POST',
            url: `${config.baseUrl}/challenge-register`,
            headers: { 
                'content-type': 'application/json'
            },
            data : data
        }
    
        const response =  await axios(axiosConfig)
        return response.data;
    }
    catch(err) {
        console.log('Error occured while registering user:', err);
        throw err;
    }
}

async function generateConversationId(userId) {
    try {
        const data = JSON.stringify({
            user_id: userId
        });
        const axiosConfig = {
            method: 'POST',
            url: `${config.baseUrl}/challenge-conversation`,
            headers: { 
                'content-type': 'application/json'
            },
            data : data
        }
    
        const response =  await axios(axiosConfig)
        return response.data;
    }
    catch(err) {
        console.log('Error occured while getting convesation Id:', err);
        throw err;
    }
}

async function retrieveNewMessage(conversationId) {
    try {
        const axiosConfig = {
            method: 'GET',
            url: `${config.baseUrl}/challenge-behaviour/${conversationId}`,
            headers: { 
                'content-type': 'application/json'
            }
        }

        const response =  await axios(axiosConfig)
        return response.data;
    }
    catch(err) {
        console.log('Error occured while getting new message:', err);
        throw err;
    }
}

// Parse message and process its response
function parseMessage(message) {
    // Parse numbers from text
    const parseNumbers = message.text.match(/[-+]?[0-9]*\.?[0-9]+/g);

    // Parse words from a text after :
    const parsedText = message.text.split(':')[1] ? message.text.split(':')[1].split(',') : [] || [];
    const wordsAfterParseAndReplace = []

    parsedText.forEach(item => {
        const replacedItem = item.replace('.', '').trim()
        wordsAfterParseAndReplace.push(replacedItem);
    })

    if(parseNumbers && parseNumbers.length) {
        if(message.text.includes('sum') || message.text.includes('add')) {
            const sum = parseNumbers.reduce((acc, cur) => {
                return acc += Number(cur);
            }, 0)
            return `${sum}`
        }
        else if(message.text.includes('largest') || message.text.includes('max')) {
            const max = Math.max(...parseNumbers)
            return `${max}`
        }
        else if(message.text.includes('smallest') || message.text.includes('min')) {
            const min = Math.min(...parseNumbers)
            return `${min}`
        }
        // Add more if else check based on type of questions can come
        else {
            return 'false';
        }
    }
    else if(message.text.includes('begin') || message.text.includes('start') || message.text.includes('ready')) {
        const probableAnswers = [ 'yes', 'no'];
        // Uncomment below line of code if we want system to ptovide yes/no reponse randomly
        // return probableAnswers[Math.floor(Math.random()*probableAnswers.length)]
        return 'yes';
    }
    else if(message.text.includes('alphabetize') || message.text.includes('sort')) {
        return wordsAfterParseAndReplace.sort().join(',')
    }
    else if(message.text.includes('even number') && message.text.includes('letters')) {
        return wordsAfterParseAndReplace.filter(item => item.length % 2 == 0).join(',');
    }
    else if(message.text.includes('thanks') || message.text.includes('thank you')) {
        return "congrats"
    }
    else {

        return 'false';
    }
}

async function replyToChatBot(conversationId, message) {
    console.log(message.text)
    const reply = parseMessage(message);
    try {
        console.log('reply', reply)
        const data = JSON.stringify({
            content: reply.toString()
        });
        const axiosConfig = {
            method: 'POST',
            url: `${config.baseUrl}/challenge-behaviour/${conversationId}`,
            headers: { 
                'content-type': 'application/json'
            },
            data : data
        }
    
        const response =  await axios(axiosConfig)
        return response.data;
    }
    catch(err) {
        console.log('Error occured while replying to chat:', err);
        throw err;
    }
}

module.exports = {
    registerUser,
    generateConversationId,
    retrieveNewMessage,
    replyToChatBot
}