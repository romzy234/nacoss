const { payStack } = require("../config/db");
payStack.loadDatabase();

exports.getIndex = (req,res,next) =>{    
    res.render('index')
};
exports.getPay = (req,res,next) =>{    
    res.render('payment')
}
exports.postPay = function(req, res) {
    // Retrieve the request's body
    var event = req.body;
    // Do something with event
    // console.log(event.data.customer);
    // console.log(event.data.metadata);
    // console.log(event.data.amount);
    var customer = event.data.customer;
    var meta = event.data.metadata;
    var amount = Number(event.data.amount);
    res.sendStatus(200);
    var Student = {
       id :  customer.id,
       firstName :  customer.first_name,
       lastName :  customer.last_name,
       email :  customer.email,
       phone :  customer.phone,
       matric : meta.matric,
       level:  meta.level,
       amount:  amount/100,
      collector: 'Paystack',
      type: 'paystack',
      time: new Date().getTime()
    }
  if(event.event == "charge.success"){
    payStack.insert(Student);
    console.log('done')
}};

exports.getAdmin = (req, res, next)=>{
    res.render('admin/index')
};
exports.getAll = (req, res, next)=>{
    { payStack.find({}).sort({ time: -1 }).exec(function(err, data){
        if(err){
            res.status(500);
        }
        payStack.count({}, function (err, count) {
            res.render('admin/all',{
                data :data,
                count : count
            })
          });
    })};
};
exports.getlevel = (req, res, next)=>{
    if(req.params.id == 100 || req.params.id == 200 || req.params.id == 300 || req.params.id == 400 ){
    var level = Number(req.params.id);
    console.log(level)
    { payStack.find({ level: level, type: 'paystack' }, (err, data) =>{
        if(err){
            res.status(500);
        }
        payStack.count({ level : level, type: 'paystack'}, function (err, count) {
            res.render('admin/level',{
                data :data,
                level: level,
                count : count
            })
          });
    })};
}else{
    res.send(`What the hell are you checking for ?? who's in this level ${req.params.id}`)
}
};
exports.getCash = (req, res, next)=>{
    if(req.params.id == 100 || req.params.id == 200 || req.params.id == 300 || req.params.id == 400 ){
    var level = Number(req.params.id);
    console.log(level)
    { payStack.find({ level: level, type: 'cash'}, (err, data) =>{
        if(err){
            res.status(500);
        }
        payStack.count({ level : level, type: 'cash'}, function (err, count) {
            res.render('admin/level',{
                data :data,
                level: level,
                count : count
            })
          });
    })};
}else{
    res.send(`What the hell are you checking for ?? who's in this level ${req.params.id}`)
}
};

exports.getBackup = (req, res, next)=>{
    res.set('content-type', 'application/json')
    var level = Number(req.params.id);
    console.log(level)
    { payStack.find({}, (err, data) =>{
        if(err){
            res.status(500);
        }
        res.json(data)
    })};
};

exports.postSearch = (req, res, next)=>{
    var search = req.body.name;
    console.log(search);
    { payStack.find({$or: [{ matric: search }, { firstName: search },{ lastName: search },{ _id : search},{ email : search}]}, (err, data) =>{
        if(err){
            res.status(500);
        }
        res.render('admin/results',{
            data :data
        })
    })};
};
exports.getSearch = (req,res,next) =>{    
    res.render('admin/search')
}

exports.getparam = (req,res,next)=>{
    id = req.params.id
    console.log(id)
     payStack.findOne({ _id : id }, (err, data) =>{
        if(err){
            res.status(500);
        }
        res.render('admin/result',{
            data :data
        })
    });
}