const fs = require('fs');


const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    // 根據不同 path 做不同事情
    if(url === '/'){
        // return HTML page
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        // 表單送出後會導向 localhost:3000/message
        // 點擊連結或輸入網址時，自動發送 GET request
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></input></form></body>');
        res.write('</html>');
        return res.end();
    }

    if(url === '/message' && method === 'POST'){
        // redirect to '/'
        const body = [];
        // listen 'ready to read data' event
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        // create event listener in node.js, register callback()
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);    // 'message=xxxx'
            const message = parsedBody.split('=')[1];
            // writeFileSync: block the execution until the file is written -> bad
            // writeFile can use error handler -> good
            // trigger callback after file handling
            fs.writeFile('message.txt', message, (err) => {
                fs.statucCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    }
    // set HTTP Response
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><h1>Hello First Node.js Server</h1></body>');
    res.write('</html>');
    res.end();  
}

module.exports = requestHandler;
