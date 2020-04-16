const amqp = require('amqplib/callback_api');
const mql = require('../dbconfig')

amqp.connect('amqp://192.168.56.102:5672', (err , conn) => {
    conn.createChannel((err, ch)=>{
        let q = 'fila01';
        let fila2 = 'fila02';
        ch.assertQueue(q , {durable : false });
        ch.assertQueue(fila2 , {durable : false });
        
        ch.prefetch(1);
        
        console.log('[*] whating in %s, press CTRL+c', q);
        ch.consume(q , (msg) => {
        const sql = `INSERT INTO tbl_filas (descricao)  VALUES ( '${msg.content.toString()}')`;
        mql.query(sql ,  (errr , result) => {
            if(errr){
                console.log("not insert ")
                ch.nack(msg)
            }else{
                console.log(`registro inserido: ${new Date()}`);
                ch.ack(msg)
            }
          })
        
        })
        ch.consume( fila2 , (msg) => {
            const sql = `INSERT INTO tbl_filas (descricao)  VALUES ( '${msg.content.toString()}')`;
            mql.query(sql ,  (errr , result) => {
                if(errr){
                    console.log("not insert ")
                    ch.nack(msg)
                }else{
                    console.log(`registro inserido: ${new Date()}`);
                    ch.ack(msg)
                }
               
     
              })
        })
    })

})