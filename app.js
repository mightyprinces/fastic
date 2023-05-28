const http = require("http");
const Mustache = require("mustache");
const fs = require('fs');

const host = 'localhost';
const port = 8080; // it will be available on 80 port on localhost because of port forwarding settings

function renderHTML(request, path) {
  const template = fs.readFileSync(path, 'utf8');
  return Mustache.render(template, {
    url: request.url,
    meta: fs.readFileSync('templates/components/meta.mustache', 'utf8'),
  });
}

function renderStatic(request) {
  if (
    request.url.substring(0, 5) === '/src/' &&
    !request.url.includes('..')
  ) {
    const path = request.url.substring(1);
    if (fs.existsSync(path)) {
      return fs.readFileSync(path, 'utf8');
    }
  }
}

const server = http.createServer((request, response) => {
  let content = '';
  let code = 200;

  console.log('Request to ', request.url);

  // prepare page html and code
  switch (request.url) {
    case '/':
      content = renderHTML(request, 'templates/main.mustache');
    break;

    case '/your-fast-plan':
      content = renderHTML(request, 'templates/your-fast-plan.mustache');
    break;

    case '/fasting-times':
      content = renderHTML(request, 'templates/fasting-times.mustache');
    break;

    case '/sign-in':
      content = renderHTML(request, 'templates/sign-in.mustache');
    break;

    default:
      content = renderStatic(request);
      if (content === undefined) {
        content = renderHTML(request, 'templates/error.mustache');
        code = 404;
      }
    break;
  }

  // return rendered page to browser
  response.writeHead(code);
  response.end(content);
});

server.listen(port, host);

console.log('server created');
