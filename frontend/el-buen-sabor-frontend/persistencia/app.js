const express = require("express")
const app = express();

app.use(express.json())

app.use("/api/rubro-ingrediente-vendible", require("./rubro-ingrediente/rubro-ingrediente-vendible"))
app.use("/api/rubro-ingrediente-no-vendible", require("./rubro-ingrediente/rubro-ingrediente-no-vendible"))
app.use("/api/rubro-articulos-manufacturados", require('./rubro-articulos-manufacturados/rubro-articulos-manufacturados'))

app.listen(3000,()=>{
    console.log("Server corriendo en puerto", 3000)
}
)