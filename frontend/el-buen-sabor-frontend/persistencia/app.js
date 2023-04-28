const express = require("express")
const app = express();

app.use(express.json())

app.use("/api/rubro-articulos-manufacturados", require('./rubro-articulos-manufacturados/rubro-articulos-manufacturados'))

app.use("/api/rubro-ingredientes",require("./rubro-ingrediente/rubro-ingrediente"))

app.listen(3000, () => {
    console.log("Server corriendo en puerto", 3000)
}
)