const cheerio = require('cheerio');
const nodeMailer = require('nodemailer');
const twit = require('twit');
const credentials = require('./credentials.json')
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



export async function messageTwitter(message, recipient){
    client.post('direct_messages/events/new', {
        event: {
            type: "message_create",
            message_create: {
                target: {
                    recipient_id: recipient
                },
                message_data: {
                    text: message
                }
            }
        }
    }, (event, error)=>{
            console.log(event);
            console.log(error)
    })
}


export async function emailSend(message, recipient){
    transporter.sendMail(
        {
                from: credentials.gmail.username,
                to: recipient,
                subject: 'Sending Email using Node.js',
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



export async function messageInstagram(){
    const $ = cheerio.load('https://www.instagram.com/accounts/login/?source=auth_switcher');
    console.log($('._2hvTZ pexuQ zyHYP').html());

}

function getTwitterID(rec) {
    client.get('users/show', {
        screen_name: rec
    }, (error, response) => {
        if (error) {
            console.log(error)
        }
        console.log(response.id_str)
        return response.id_str
    })
}

