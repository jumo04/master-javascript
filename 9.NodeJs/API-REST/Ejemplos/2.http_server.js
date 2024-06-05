// esta es la forma nativa de hacerlo sin ningun framework
const http = require ("http");

const server = http.createServer((req, res) => {
    res.write(200, {
        "Content-Type": "application/json"});
    
    let salida = {
        nombre: "JUAN FERNANDO MORENO",
        url: req.url
    }
    res.write(JSON.stringify(salida));
    res.end();
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});