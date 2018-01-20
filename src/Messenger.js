import JsonRequest from './JsonRequest';

class Messenger {
    constructor(messagesBox, conversation) {
        this.messageBox = messagesBox;
        this.conversation = conversation;
        this.jsonAction = new JsonRequest("dialog_1", "http://localhost:3000/");
        this.inputField = document.getElementById('form');
        this.button = document.getElementsByClassName('button')[0];
        this.phrases = ["Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur excepturi in itaque nam nisi nulla odit perspiciatis",
                        "yoW!", "hey", "My name is Lew", "Really?O_O", "That`s amazing", "Ok", "Of course"];
    }

    async render() {
        let messagesHistory = await this.jsonAction.getData();
        this.createUserMessageSection(messagesHistory[0]);
        this.addMessageToMessageBlock(messagesHistory[0]);
        messagesHistory.shift();
        messagesHistory.map(message => {
            let userClass = (message["isUser"]) ? "user-messages-block_user" : "user-messages-block_friend";
            if (this.messageBox.lastElementChild.getAttribute('class').includes(userClass)) {
                this.addMessageToMessageBlock(message);
            }
            else {
                this.createUserMessageSection(message);
                this.addMessageToMessageBlock(message);
            }
        });
        this.inputField.addEventListener('submit', this.saveUserMessage.bind(this));
        this.button.addEventListener('click', this.botMessage.bind(this));
        this.messageBox.scrollTo(0,this.messageBox.scrollHeight);


    }
    saveUserMessage(ev) {
            ev.preventDefault();
            let form = ev.target;
            let message = {
                "isUser": true,
                "messageText": form['message'].value
            };
            if(message['messageText'].replace(/\s/g, '').length === 0) {
                form['message'].value = "";
                return;
            }
            this.jsonAction.addData(message);
            if (this.messageBox.lastElementChild.getAttribute('class').includes("user-messages-block_user")) {
                this.addMessageToMessageBlock(message);
            } else {
                this.createUserMessageSection(message);
                this.addMessageToMessageBlock(message);
            }
            this.messageBox.scrollTo(0,this.messageBox.scrollHeight);
            form['message'].value = "";
        }

    createUserMessageSection(messageObj) {
        let userMessagesBlockClass = (messageObj["isUser"]) ? "user-messages-block_user" : "user-messages-block_friend";
        let imgObject = (messageObj["isUser"]) ? "" : '<object class="user-messages-block__friend-picture"' +
            'type="image/png" data="img/friendImage.png"></object>';
        let messageSection = `<div class="user-messages-block ${userMessagesBlockClass}"> ${imgObject}<ul></ul></div>`;
        let previousMessageSection = this.messageBox.lastElementChild;
        if(previousMessageSection) {
            this.messageBox.insertAdjacentHTML('beforeend', messageSection);
        } else {
            this.messageBox.innerHTML = messageSection;
        }
    };

    addMessageToMessageBlock(jsonMessageObj) {
        let classes = (jsonMessageObj['isUser']) ? "user-messages-block__message user-messages-block__message_user" :
            "user-messages-block__message user-messages-block__message_friend";
        let  subMessage= `<li class="${classes}"><p>${jsonMessageObj['messageText']}</p></li>`;
        let previousSubMessage = this.messageBox.lastElementChild;
        if(previousSubMessage) {
            previousSubMessage.insertAdjacentHTML('beforeend', subMessage);
        } else {
            previousSubMessage.innerHTML = previousSubMessage;
        }
    };

    botMessage(ev) {
        ev.preventDefault();
        let form = ev.target;
        let message = {
            "isUser": false,
            "messageText": this.phrases[Math.floor(Math.random()*this.phrases.length)]
        };

        this.jsonAction.addData(message);
        if (this.messageBox.lastElementChild.getAttribute('class').includes("user-messages-block_friend")) {
            this.addMessageToMessageBlock(message);
        } else {
            this.createUserMessageSection(message);
            this.addMessageToMessageBlock(message);
        }
        this.messageBox.scrollTo(0,this.messageBox.scrollHeight);
        form['message'].value = "";
    }

}


let messageBox = document.querySelector(".messages-section");
let m = new Messenger(messageBox, 'dialog_1');
m.render();
