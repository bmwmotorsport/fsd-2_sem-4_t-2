var http = require("http");
http.createServer(function(req,res){
    if(req.url=='/'){
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write("Hello");
        res.end();
    }
}).listen(7001);
