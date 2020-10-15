const nodemailer = require('nodemailer');
const keys = require('./keys');


const newAdmin =  (email, subject,header,name,ms1) =>{
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
            subject: subject,
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