const mysql = require('mysql2');
const msq = mysql.createConnection({
    host:'localhost',
    database:'dbfilas',
    user:'root',
    password:'',
    multipleStatements: true
})
msq.connect((err) => {
    if(!err){
        console.log("connected")
    }else{
        console.log("error ao conectar ao db")
    }
})

module.exports = msq;
