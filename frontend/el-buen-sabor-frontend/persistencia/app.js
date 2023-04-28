const express = require("express")
const app = express();

app.use(express.json())

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    res.header("Access-Control-Allow-Origin", "*");  
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');       
    res.header('Content-Type', 'application/json');       
    next();
  });

app.use("/api/rubro-articulos-manufacturados", require('./rubro-articulos-manufacturados/rubro-articulos-manufacturados'))

app.use("/api/rubro-ingredientes", require("./rubro-ingrediente/rubro-ingrediente"))

app.listen(3000, () => {
    console.log("Server corriendo en puerto", 3000)
}
)