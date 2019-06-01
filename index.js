import {/*messageInstagram,*/ getTwitterID,emailSend, messageTwitter, messageSMS} from './flood'
const credentials = require('./credentials.json')
let message = "This is a test"



// emailSend(message,credentials.recipientInfo.email);
messageTwitter(message,credentials.recipientInfo.twitter)
// messageSMS(message, credentials.recipientInfo.sms)
// getTwitterID(credentials.recipientInfo.twitter)







// messageInstagram();