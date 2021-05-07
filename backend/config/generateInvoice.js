const PDFDocument = require('pdfkit')
const fs = require('fs')//.promises;
const path= require('path');
const { Base64Encode }= require('base64-stream');
logo= path.join(__dirname, '../public/',"logoS.jpeg" )

const sendEmail= require('../config/mailer');
const mailgun = require('mailgun-js')({apiKey: process.env.MAILGUN_API_KEY,
	domain: process.env.MAILGUN_DOMAIN});
// const path = "../invoice.pdf"

//  const  createInvoice= async (invoice, path) =>
  
//  new Promise(( resolve, reject ) => 
// {
//   let finalString = '';
// let doc = new PDFDocument({ size: "A4", margin: 50 });

// generateHeader(doc);
// generateCustomerInformation(doc, invoice);
// generateInvoiceTable(doc, invoice);
// generateFooter(doc);
// // const stream = doc.pipe(new Base64Encode());
// doc.end();
// stream.on('data', chunk => finalString +=chunk);
// stream.on('end', ()=> resolve(finalString))
// doc.pipe(fs.createWriteStream(path));
// return doc
// })
 
const  createInvoice= (invoice/*, path*/, email, fullName) =>{
  
   
      let doc = new PDFDocument({ size: "A4", margin: 50 });
      let buffers = [];
      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', async () => { 
        try{
        var file= Buffer.concat(buffers)
        // console.log(typeof file)
        var attch = new mailgun.Attachment({data: file, filename: "invoice.pdf",  contentType: "application/pdf"});
        await sendEmail('noreply@the-aleph.com', 
                email,
                'Invoice Payment Confirmation',
                'Dear '+fullName+',\n\n' + ' Thank you for your purchase. Please find attached your invoice for the purchase made.\n', 
  "<div style='padding:20px auto;'>"+
    "<div style='padding:30px; background-color:#ededed;color:black;'>"+
    "<img src='cid:logo.png' width='40px'>"+
      "<h3 style='font-size:1.25rem; margin-top:0px;'>Dear "+fullName+",</h3>"+
          "<p style='font-size:1.25rem; margin:0px auto;'>Thank you for your purchase</p>"+
      "<p style='font-size:1.25rem; margin:0px auto;'>Please find attached the invoice for the purchase.</p>"+
      "</div></div></div>", attch);
        }catch(err){
            console.log(err)
        }
      })
      generateHeader(doc);
      generateCustomerInformation(doc, invoice);
      generateInvoiceTable(doc, invoice);
      generateFooter(doc);
      // doc.pipe(res)
      doc.end();
   
    //  var result= await fs.createWriteStream(path)
      // doc.pipe(fs.createWriteStream(path))//.on('finish', ()=>resolve());
// var file = fs.readFileSync(doc);
// var attch = new mailgun.Attachment({data: file, filename: "invoice.pdf",  contentType: "application/pdf"});
//       await sendEmail('noreply@the-aleph.com', 
// 							email,
// 							'Invoice Payment Confirmation',
// 							'Dear '+fullName+',\n\n' + ' Thank you for your purchase. Please find attached your invoice for the purchase made.\n', 
// "<div style='padding:20px auto;'>"+
//   "<div style='padding:30px; background-color:#ededed;color:black;'>"+
// 	"<img src='cid:logo.png' width='40px'>"+
// 		"<h3 style='font-size:1.25rem; margin-top:0px;'>Dear "+fullName+",</h3>"+
//         "<p style='font-size:1.25rem; margin:0px auto;'>Thank you for your purchase</p>"+
// 		"<p style='font-size:1.25rem; margin:0px auto;'>Please find attached the invoice for the purchase.</p>"+
// 		"</div></div></div>", attch);
  
    
  
}

  function generateHeader(doc) {
    doc
      .image(logo)//, 50, 45, { width: 50 })
      .fillColor("#000000")
      .fontSize(10)
      .text("Al QuozAl Quoz Industrial Area 3", 200, 65, { align: "right" })
      .text("Dubai, UAE, 00000", 200, 80, { align: "right" })
      .moveDown();
  }
  
  // function generateFooter(doc) {
  //   doc
  //     .fontSize(10)
  //     .text(
  //       "Payment is due within 15 days. Thank you for your business.",
  //       50,
  //       780,
  //       { align: "center", width: 500 }
  //     );
  // }
//////////////////////////////////////////////////////////
  // function generateHeader(doc) {
  //   doc
  //     // .image("logo.png", 50, 45, { width: 50 })
  //     .fillColor("#444444")
  //     .fontSize(20)
  //     .text("ACME Inc.", 110, 57)
  //     .fontSize(10)
  //     .text("123 Main Street", 200, 65, { align: "right" })
  //     .text("New York, NY, 10025", 200, 80, { align: "right" })
  //     .moveDown();
  // }
  function generateCustomerInformation(doc, invoice) {
    doc
      .fillColor("#000000")
      .fontSize(20)
      .text("Invoice", 50, 160);
  
    generateHr(doc, 185);
  
    const customerInformationTop = 200;
  
    doc
      .fontSize(10)
      .text("Invoice Number:", 50, customerInformationTop)
      .font("Helvetica-Bold")
      .text(invoice.invoice_nr, 150, customerInformationTop)
      .font("Helvetica")
      .text("Invoice Date:", 50, customerInformationTop + 15)
      .text(formatDate(new Date()), 150, customerInformationTop + 15)
      .text("Balance Due:", 50, customerInformationTop + 30)
      .text(
        formatCurrency(invoice.subtotal - invoice.paid),
        150,
        customerInformationTop + 30
      )
  
      .font("Helvetica-Bold")
      .text(invoice.shipping.name, 300, customerInformationTop)
      .font("Helvetica")
      .text(invoice.shipping.street, 300, customerInformationTop + 15)
      .text(
        invoice.shipping.city +
          ", " +
          invoice.shipping.country,
        300,
        customerInformationTop + 30
      )
      .moveDown();
  
    generateHr(doc, 252);
  }
  
  function generateInvoiceTable(doc, invoice) {
    let i;
    const invoiceTableTop = 330;
  
    doc.font("Helvetica-Bold");
    generateTableRow(
      doc,
      invoiceTableTop,
      "Item",
      "Unit Cost",
      "Quantity",
      "Line Total"
    );
    generateHr(doc, invoiceTableTop + 20);
    doc.font("Helvetica");
  
    for (i = 0; i < invoice.items.length; i++) {
      const item = invoice.items[i];
      const position = invoiceTableTop + (i + 1) * 30;
      generateTableRow(
        doc,
        position,
        item.product,
        formatCurrency(item.price),
        item.qty,
        formatCurrency(item.price * item.qty)
      );
      generateHr(doc, position + 20);
    }
  
    const subtotalPosition = invoiceTableTop + (i + 1) * 30;
    generateTableRow(
      doc,
      subtotalPosition,
      "",
      "",
      "Subtotal",
      "",
      formatCurrency(invoice.subtotal)
    );
  
    const paidToDatePosition = subtotalPosition + 20;
    generateTableRow(
      doc,
      paidToDatePosition,
      "",
      "",
      "Paid To Date",
      "",
      formatCurrency(invoice.paid)
    );
  
    const duePosition = paidToDatePosition + 25;
    doc.font("Helvetica-Bold");
    generateTableRow(
      doc,
      duePosition,
      "",
      "",
      "Balance Due",
      "",
      formatCurrency(invoice.subtotal - invoice.paid)
    );
    doc.font("Helvetica");
  }
  function generateFooter(doc) {
    doc
      .fontSize(10)
      .text(
        "Thank you for your business. Hope to see you again",
        50,
        780,
        { align: "center", width: 500 }
      );
  }
  function generateTableRow(
    doc,
    y,
    item,
    unitCost,
    quantity,
    lineTotal
  ) {
    doc
      .fontSize(10)
      .text(item, 50, y)
      .text(unitCost, 280, y, { width: 90, align: "right" })
      .text(quantity, 370, y, { width: 90, align: "right" })
      .text(lineTotal, 0, y, { align: "right" });
  }
  
  function generateHr(doc, y) {
    doc
      .strokeColor("#aaaaaa")
      .lineWidth(1)
      .moveTo(50, y)
      .lineTo(550, y)
      .stroke();
  }
  
  function formatCurrency(dirhams) {
    return "AED" + (dirhams).toFixed(2);
  }
  
  function formatDate(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
  
    return year + "/" + month + "/" + day;
  }

  module.exports = {createInvoice}