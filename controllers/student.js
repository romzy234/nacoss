const { payStack } = require("../config/db");
const { render } = require("ejs");
payStack.loadDatabase();

exports.Pays = (req,res,next) =>{ 
   var customer = req.body;
   var amount = Number( req.body.amount);

   var detail = {
      // id :  customer.id,
      firstName :  customer.first_name,
      lastName :  customer.last_name,
      email :  customer.email,
      phone :  customer.phone,
      matric : customer.matric,
      key : customer.key,
      level: Number(customer.level),
      amount: amount,
      collector:  customer.recevier,
      type: 'cash',
      time: new Date().getTime()
    };
 if( detail.collector == '123456' && detail.key == '123456'){
   payStack.insert(detail);
   console.log('done in db')
   res.status(301).redirect('/admin/home');
}else{
   
   res.send('Wrong password');
}
res.status(403);
};
exports.getUpload = (req,res)=>{
   res.render('admin/addPay')
};

// exports.Pay = (req)