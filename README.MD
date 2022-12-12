# Chat Bot
---

### Getting Started
Here are the major areas of this app:

-   **index** - Main file which has functions to execute chat bot and catch error on failure.

Utility functions
-   **util** - Contaions functions for chat bot to parse and process reply.

#### Setup

Follow these steps to get the repo setup locally.
```
    > git clone <repo>
    Username: *your_username*
    Password: *your_token*
    > cd CHAT-BOT
    > npm install
```

### Create .env file and save below details

    BASE_URL=https://code-challenge.us1.sandbox-rivaltech.io
    USER_NAME=Jon Doe
    USER_EMAIL=jane@doe.com
    PORT=5000

You can also change the username and user email to try with another user


#### Run application
<!-- It will run prking service and maintain logs in response.txt file -->
npm start