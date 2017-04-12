var nodemailer = require('nodemailer');

//建立郵件客戶端
var transporter = nodemailer.createTransport({
  //使用Gmail郵件伺服器
  service:'Gmail',
  auth:{
    user : 'example@gmail.com',
    pass : 'password'
  }
});

var mailOptions = {
  //寄件者
  from : 'example@gmail.com',
  //收件者
  to : 'Lisheng0706@gmail.com',
  //主旨
  subject : 'apple',
  //內文
  text : 'Titan',
  //Html內文
  html : '<b>Send message from nodemailer!</br>'
};

//傳送郵件
transporter.sendMail(mailOptions,function(error,info){
  if(error){
    console.log(error);
  }else{
    console.log('Message sent : ' + info.response);
  }
});
