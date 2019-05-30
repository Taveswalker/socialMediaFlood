import {messageInstagram, emailSend, messageTwitter} from './flood'
const credentials = require('./credentials.json')

//emailSend('hello!','walker.taves@gmail.com');
messageTwitter('hello!',credentials.recipientInfo.twitter)








// messageInstagram();