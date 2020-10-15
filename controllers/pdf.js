const fs = require("fs");
exports.test = (req, res, next)=>{
    res.setHeader('Content-type', 'application/pdf')
    res.send('test')
}