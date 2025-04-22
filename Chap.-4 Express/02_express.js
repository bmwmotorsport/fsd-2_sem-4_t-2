var express = require("express");
const app = express();

app.get('/',(req,res)=>{
    res.set("content-type","text/plain");
    res.send("<h1>Hello</h1>");
});

app.get('/about',(req,res)=>{
    res.set("content-type","text/plain");
    res.write("Hello Express");
    res.end();
});

app.get('/some',(req,res)=>{
    res.set("content-type","text/plain");
    res.write("Hello Express");
    res.send("<h1>Hello</h1>");
    {/* res.write('Hiiee'); */}
});
{/* Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client */}

app.listen(1111);