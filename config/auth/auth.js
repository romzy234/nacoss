const { exco } = require("../db");
exco.loadDatabase();
// get Sign up 
exports.getSignup = (req,res,next) =>{    
    res.render('admin/signup')
};

// post sign up
exports.postSignup = (req, res) => {
    if(!req.body.name || !req.body.password){
       res.status("400");
       res.send("Invalid details!");
    } else {
        var newUser = {name: req.body.name, password: req.body.password};
        exco.insert(newUser);
        req.session.user = newUser;
        res.redirect('/admin/home');
    }
 };

 //get login 
 exports.getLogin = (req,res,next) =>{    
    res.render('admin/login')
};
// post sign in 
exports.postLogin = (req, res)=>{
    if(!req.body.name || !req.body.password){
       res.render('admin/login', {message: "Please enter both id and password"});
    } else {
      exco.findOne({ name: req.body.name, password: req.body.password}, (err, user)=>{
         if(user.name == req.body.name && user.password == req.body.password){
             req.session.user = user;
             res.redirect('/admin/home');
       }else{
         res.render('admin/login', {message: "Invalid credentials!"});
       }
      });//.catch(console.log('catch'));
    }
 };

//  // logout
exports.getLogout =  function(req, res){
    req.session.destroy(function(){
       console.log("user logged out.")
    });
    res.redirect('/admin');
 };
 
