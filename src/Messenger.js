import JsonRequest from './JsonRequest';

class Messenger {
    constructor(messagesBox, conversation, userImageLoctaion, form) {
        this.messageBox = messagesBox;
        this.conversation = conversation;
        this.userImageLocation = userImageLoctaion;
        this.jsonAction = new JsonRequest(conversation, "http://localhost:3000/");
        this.inputField = form;
        // this.button = document.getElementsByClassName('button')[0];
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
        // this.button.addEventListener('click', this.botMessage.bind(this));
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
        let imgObject = (messageObj["isUser"]) ? "" : `<img class="user-messages-block__friend-picture"` +
            `src="${this.userImageLocation}">`;
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
        let  subMessage= `<li class="${classes}"><p>${this.escapeHtml(jsonMessageObj['messageText'])}</p></li>`;
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



    escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }



}


let messageBox = document.querySelector(".messages-section");
let form = document.getElementsByClassName('form')[0];
let m = new Messenger(messageBox, 'dialog_1',
    "https://res.cloudinary.com/demo/image/facebook/w_28,h_28,r_100/100009184192644.png",
    form);
m.render();

let messageBox1 = document.querySelector(".messages-section_1");
let form1 = document.getElementsByClassName('form')[1];
let m1 = new Messenger(messageBox1, 'dialog_2',
    'https://res.cloudinary.com/demo/image/facebook/w_28,h_28,r_100/100009184192644.png',
    form1);
m1.render();

let messageBox2 = document.querySelector(".messages-section_2");
let form2 = document.getElementsByClassName('form')[2];
let m2 = new Messenger(messageBox2, 'dialog_3',
    'https://res.cloudinary.com/demo/image/facebook/w_28,h_28,r_100/100009184192644.png',
    form2);
m2.render();
// // console.log(messageBox1);