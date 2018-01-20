/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__JsonRequest__ = __webpack_require__(1);


class Messenger {
    constructor(messagesBox, conversation) {
        this.messageBox = messagesBox;
        this.conversation = conversation;
        this.jsonAction = new __WEBPACK_IMPORTED_MODULE_0__JsonRequest__["a" /* default */]("dialog_1", "http://localhost:3000/");
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


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class JsonRequest {

    constructor(data_name, host_name = "http://localhost:3000/") {
        this.data_name = data_name;
        this.host_name = host_name;
    }

    async getData() {
        let response = await fetch(this.host_name + this.data_name);
        return await response.json();
    }

    async addData(data) {
        console.log(this.host_name +this.data_name);
        await fetch(this.host_name + this.data_name, {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        });
    }

    async editData(data, id) {
        await fetch(this.host_name + this.data_name + "/" + id, {
            method: 'PATCH',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        });
    }

    async deleteData(id) {
        await fetch(this.host_name + this.data_name + "/" + id,
            {method: "DELETE"}
        );
    }
}

/* harmony default export */ __webpack_exports__["a"] = (JsonRequest);

/***/ })
/******/ ]);