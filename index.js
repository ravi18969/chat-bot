const config = require('./config');
const utils = require('./util');

async function executeChatBot() {
    // Register user
    const user = await utils.registerUser(config.userName, config.userEmail);
    // Get conversation Id
    const conversation =  await utils.generateConversationId(user.user_id);
    console.log(conversation)
    let reply = false;
    do {
        // Get Messages  
        const chatBotMessages = await utils.retrieveNewMessage(conversation.conversation_id)
        console.log(chatBotMessages)
        let retry = 1;

        // TODO on each retry try with different answers
        // try for three times if getting error
        while(retry < 4) {
            const messageToProcess = chatBotMessages.messages.length ? chatBotMessages.messages[chatBotMessages.messages.length -1] : '';
            const chatBotReply = await utils.replyToChatBot(conversation.conversation_id, messageToProcess);
            console.log(chatBotReply)
            if(chatBotReply.correct == false) {
                retry++
            }
            else {
                retry = 4
            } 
            reply = chatBotReply.correct;
        }
        // Reply back to chat bot
    }
    while(reply) 
}

executeChatBot()
.then(res => {
    console.log('Chat bot execution completed');
})
.catch(err => {
    console.log('Chat bot Failed with error:', err);
});