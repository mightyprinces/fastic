const http = require("http");
const Mustache = require("mustache");


const host = 'localhost';
const port = 8080; // it will be available on 80 port on localhost because of port forwarding settings

const server = http.createServer((request, response) => {
  console.log('incoming request');
  console.log(request.url);

  let message = '';

  switch (request.url) {
    case '/test':
      response.writeHead(200);
      message = "test";
    break;

    case '/':
      response.writeHead(200);
      message = "main";
    break;

    default:
      response.writeHead(404);
      message = "404";
    break;
  }

  const html = Mustache.render("This is {{message}}!", {
    message: message,
  });

  response.end(html);
});

server.listen(port, host);

console.log('server created');
