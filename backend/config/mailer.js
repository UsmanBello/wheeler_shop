const mailgunLoader= require('mailgun-js');

var mailgun= mailgunLoader({apiKey: process.env.MAILGUN_API_KEY,
							domain: process.env.MAILGUN_DOMAIN})
// var  attachmentA = new mailgun.Attachment({ filename: `invoice.pdf`, contentType: "application/pdf"});
const sendEmail=(from, to, subject, content, contentHtml, filePath)=>{
	let data={
		from,
		to,
		subject,
		text: content,
		html: contentHtml,
		attachment: filePath
	}
	return mailgun.messages().send(data)
}
module.exports= sendEmail 
