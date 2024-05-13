import http2  from 'http2';
import fs from 'fs';

const server = http2.createSecureServer( {key: '', cert: ''},  (request, response)=>{
    console.log(request.url);
    
    // response.writeHead(200, { 'Content-Type' : 'text/html'});
    // response.write('<h1>Hola mundo !</h1>');
    // response.end();

    // const data = { name: 'Jonhn Doe', age: 30, city: 'New York'};
    // response.writeHead(200, { 'Content-Type': 'application/json'});
    // response.end(JSON.stringify(data));

    if(request.url === '/'){
        const htmlFile = fs.readFileSync('./public/index.html', 'utf-8');
        response.writeHead(200, { 'Content-Type':'text/html'});
        response.end(htmlFile);

        return
    }
    
    if(request.url?.endsWith('.js')){
        response.writeHead(200, { 'Content-Type' : 'application/javascript'});
    }else if(request.url?.endsWith('.css')){
        response.writeHead(200, { 'Content-Type': 'text/css'});
    }

    const responseContent = fs.readFileSync(`./public${request.url}`, 'utf-8');
    
    response.end(responseContent);
});

server.listen(8080, ()=>{
    console.log('Server running on port 8080');
})