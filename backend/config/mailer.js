require('dotenv').config({path: '../'});
// const formData= require('form-data');
console.log(process.env.MAILGUN_API_KEY)
const mailgun= require('mailgun-js')({apiKey: process.env.MAILGUN_API_KEY,
	domain: process.env.MAILGUN_DOMAIN});
// const Mailgun= require('mailgun.js');
// const mailgun=  new Mailgun(formData)
// const mg= mailgun.client({username: process.env.MAILGUN_USERNAME,
// 						 key: process.env.MAILGUN_API_KEY})
// const mailgun= mailgunLoader
// var  attachmentA = new mailgun.Attachment({ filename: `invoice.pdf`, contentType: "application/pdf"});
const sendEmail=  (from, to, subject, content, contentHtml/*, filePath*/)=>{
	// try{
	let data={
		from,
		to,
		subject,
		text: content,
		html: contentHtml,
		// attachment: filePath
	}
	return mailgun.messages().send(data)
// 	message= await mg.messages().create(process.env.MAILGUN_DOMAIN, data)
// 	console.log(message)
// 	return message
// }catch(err){
//     console.log(err)
// }
}
module.exports= sendEmail 
