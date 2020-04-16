const amqp = require('amqplib/callback_api');

amqp.connect('amqp://192.168.56.102:5672', (err , conn) => {
  conn.createChannel((err , ch)=>{
        if(err){
            console.log(err)
        }
        let q = 'fila02';
        

        ch.assertQueue(q ,{ durable : false });
        
        setInterval((e)=> {
        var nomes = ['Supermercado Gonçalves', 'Gameleira Lanches', 'Desfile Moda', 'Supermecado veredas','Cras Bela Vista', 'EletroDiesil','Power Central De Monitoramento'];
        var name = nomes[Math.ceil(Math.random() * (nomes.length - 1))];

            let  obj = `[{ dh_cadastro : ${new Date()} , Situacao:  Empresas de trabalho ,  nome : ${name }}]`;
            var msg  = JSON.stringify(obj);
            ch.sendToQueue(q , new Buffer.from(msg));
            console.log('enviou '+ new Date());
            console.log("[x] Sent %s" ,msg);
        },100)
        
    }) 
})