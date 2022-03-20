var session = require('express-session')
require("dotenv").config();

module.exports = function(app){ 
    app.use(
    session({
        secret : process.env.SESSION_SECRET,
        resave : true,
        saveUninitialized : true
    })
    
);
}
