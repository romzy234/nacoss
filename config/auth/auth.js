const { exco } = require("../db");
exco.loadDatabase();
// get Sign up 
exports.getSignup = (req,res,next) =>{    
    res.render('admin/signup')
};

// post sign up
exports.postSignup = (req, res) => {
    if(!req.body.id || !req.body.password){
       res.status("400");
       res.send("Invalid details!");
    } else {
        var newUser = {id: req.body.id, password: req.body.password};
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
   console.log(req.body)
    if(!req.body.id || !req.body.password){
       console.log('didnt read this')
       res.render('admin/login', {message: "Please enter both id and password"});
    } else {
      exco.findOne({ id: req.body.id, password: req.body.password}, (err, user)=>{
         if(user.id == req.body.id && user.password == req.body.password){
             req.session.user = user;
             console.log("user logged in.")
             res.redirect('/admin/home');
       }else{
         console.log('invaild cred')
         res.render('admin/login', {message: "Invalid credentials!"});
       }
      });
    }
 };

//  // logout
exports.getLogout =  function(req, res){
    req.session.destroy(function(){
       console.log("user logged out.")
    });
    res.redirect('/admin');
 };
 
//  app.get('/protected_page', checkSignIn, function(req, res){
//     res.render('protected_page', {id: req.session.user.id})
//  });

//  app.use('/protected_page', function(err, req, res, next){
//     console.log(err);
//        //User should be authenticated! Redirect him to log in.
//        res.redirect('/login');
//     });