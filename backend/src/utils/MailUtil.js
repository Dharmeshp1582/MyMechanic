//to,from,subject,text
const mailer = require("nodemailer");

//function 

const sendingMail = async (to,subject,text) =>{

    const transporter = mailer.createTransport({
        service:"gmail",
        auth:{
            user:"alpeshpatelvirpur@gmail.com",
            pass:"xopi zvba daav aoub"
        }
    })

    const mailOptions = {
        from :'alpeshpatelvirpur@gmail.com',
        to:to,
        subject:subject,
        text:text ,
        // html: "<h1>"+text+"</h1>",
    }
    
      const mailResponse = await transporter.sendMail(mailOptions);
      console.log(mailResponse);
      return mailResponse
} 

// sendMail("dharmeshpatelvirpur123@gmail.com","Test mail","This is the test mail");

module.exports ={
    sendingMail
}


