const nodeInstagram = require('node-instagram');
const nodeMailer = require('nodemailer');
const twit = require('twit');
const credentials = require('./credentials.json');
const Nexmo = require('nexmo');
const nexmo = new Nexmo({
    apiKey: credentials.sms.apiKey,
    apiSecret: credentials.sms.apiSecret
})
const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: credentials.gmail.username,
        pass: credentials.gmail.password
    }
});
const client = new twit({
    consumer_key: credentials.twitter.consumer_key,
    consumer_secret: credentials.twitter.consumer_secret,
    access_token: credentials.twitter.access_token_key,
    access_token_secret: credentials.twitter.access_token_secret
});
// const instagram = new nodeInstagram({
//     clientId: credentials.instagram.clientId,
//     clientSecret: credentials.instagram.clientSecret,
//     accessToken: credentials.instagram.accessToken,
// });

export async function messageSMS(message, recipient){
    nexmo.message.sendSms(credentials.sms.sender,recipient, message,(err, responseData) => {
        if (err) {
            console.log(err);
        } else {
            if(responseData.messages[0]['status'] === "0") {
                console.log("Message sent successfully.");
            } else {
                console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
            }
        }
    })
}

export function messageTwitter(message, recipient){
    getTwitterID(recipient, id=> {
        client.post('direct_messages/events/new', {
            event: {
                type: "message_create",
                message_create: {
                    target: {
                        recipient_id: id
                    },
                    message_data: {
                        text: message
                    }
                }
            }
        }, (err, event) => {
            if(err){
                console.log(err)
            } else{
                console.log(`Success, Twitter direct message sent to ${recipient}`)
            }
        })
    })
}



export async function emailSend(message, recipient){
    transporter.sendMail(
        {
                from: credentials.gmail.username,
                to: recipient,
                subject: '',
                text: message
        },
        function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}



// export async function messageInstagram(){
//     instagram.post('')
//
// }

export function getTwitterID(rec,callback) {
    client.get('users/show', {
        screen_name: rec
    }, (error, response) => {
        if (error) {
            console.log(error)
        }
        callback(response.id_str)
        // console.log(response.id_str)
        // return response.id_str
    })
}

