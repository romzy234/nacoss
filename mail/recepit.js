const nodemailer = require('nodemailer');
const keys = require('./keys');


const newAdmin =  (email, username, password) =>{
    var transporter = nodemailer.createTransport({
        host: keys.mail.host,
        port: 465,
        secure: true,
        auth: {
            user: keys.mail.user,
            pass: keys.mail.pass
        }
    });
    
    { 
        console.log('from nodemailer');
        const mailOptions = {
            from: keys.mail.user,
            to:  email,
            subject: `Welcome to the team ${username}`,
            html:``
        };
return transporter.sendMail(mailOptions, (error, data) => {
    if (error) {
        console.log(error + email + 'from signup')
        return
    }
});
};
};
exports.newAdmin = newAdmin;