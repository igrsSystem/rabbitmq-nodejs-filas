const amqp = require('amqplib/callback_api');

amqp.connect('amqp://192.168.56.102:5672', (err , conn) => {
  conn.createChannel((err , ch)=>{
        if(err){
            console.log(err)
        }
        let q = 'fila01';
        

        ch.assertQueue(q ,{ durable : false });
        
        setInterval((e)=> {
        var nomes = ['João', 'Maria', 'Antonio', 'Joana','Igor', 'Saulo','Petersom','Guilherme'];
        var name = nomes[Math.ceil(Math.random() * (nomes.length - 1))];

            let  obj = `[{ dh_cadastro : ${new Date()} , Situacao:  Usuario Login Autenticação ,  nome : ${name }}]`;
            var msg  = JSON.stringify(obj);
            ch.sendToQueue(q , new Buffer.from(msg));
            console.log('enviou '+ new Date());
            console.log("[x] Sent %s" ,msg);
        },100)
        
    }) 
})