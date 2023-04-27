const express = require("express")
const filesync = require("fs")
const app = express();
app.use(express.json())

app.get("/ingredientes-no-vendibles", (req,res)=>{
    const data = filesync.readFileSync("../src/app/components/rubros/grilla-rubro-ingredientes/RubroIngredientes.json");
    const jsonData = JSON.parse(data);
    res.send(jsonData["Ingredientes_No_Vendibles"])
})

app.get("/ingredientes-vendibles", (req,res)=>{
    const data = filesync.readFileSync("../src/app/components/rubros/grilla-rubro-ingredientes/RubroIngredientes.json");
    const jsonData = JSON.parse(data);
    res.send(jsonData["Ingredientes_Vendibles"])
})

app.get("/articulos-manufacturados", (req,res)=>{
    const data = filesync.readFileSync("../src/app/components/rubros/grilla-rubro-productos/Rubro Manufacturados.json");
    const jsonData = JSON.parse(data);
    res.send(jsonData["Articulos_Manufacturados"])
})

app.put("/modificar-ingredientes-no-vendibles", (req,res)=>{
    const data = filesync.readFileSync("../src/app/components/rubros/grilla-rubro-ingredientes/RubroIngredientes.json");
    const jsonData = JSON.parse(data);

    jsonData["Ingredientes_No_Vendibles"][req.body.id].nombre = req.body.nombre
    jsonData["Ingredientes_No_Vendibles"][req.body.id].estado = req.body.estado   

    filesync.writeFileSync("../src/app/components/rubros/grilla-rubro-ingredientes/RubroIngredientes.json", JSON.stringify(jsonData, null, 4));

    res.send('JSON file updated successfully');
})

app.put("/modificar-ingredientes-vendibles", (req,res)=>{
    const data = filesync.readFileSync("../src/app/components/rubros/grilla-rubro-ingredientes/RubroIngredientes.json");
    const jsonData = JSON.parse(data);

    jsonData["Ingredientes_Vendibles"][req.body.id].nombre = req.body.nombre
    jsonData["Ingredientes_Vendibles"][req.body.id].estado = req.body.estado   

    filesync.writeFileSync("../src/app/components/rubros/grilla-rubro-ingredientes/RubroIngredientes.json", JSON.stringify(jsonData, null, 4));

    res.send('JSON file updated successfully');
})

app.put("/modificar-articulos-manufacturados", (req,res)=>{
    const data = filesync.readFileSync("../src/app/components/rubros/grilla-rubro-ingredientes/RubroIngredientes.json");
    const jsonData = JSON.parse(data);

    jsonData["Articulos_Manufacturados"][req.body.id].nombre = req.body.nombre
    jsonData["Articulos_Manufacturados"][req.body.id].estado = req.body.estado   

    filesync.writeFileSync("../src/app/components/rubros/grilla-rubro-productos/Rubro Manufacturados.json", JSON.stringify(jsonData, null, 4));

    res.send('JSON file updated successfully');
})

/*app.delete("/borrar-articulos-manufacturados", (req,res)=>{
    const data = filesync.readFileSync("../src/app/components/rubros/grilla-rubro-ingredientes/RubroIngredientes.json");
    const jsonData = JSON.parse(data);

    jsonData["Articulos_Manufacturados"][req.body.id].nombre = req.body.nombre
    jsonData["Articulos_Manufacturados"][req.body.id].estado = req.body.estado   

    filesync.writeFileSync("../src/app/components/rubros/grilla-rubro-productos/Rubro Manufacturados.json", JSON.stringify(jsonData, null, 4));

    res.send('JSON file updated successfully');
})

app.delete("/borrar-ingredientes-no-vendibles", (req,res)=>{
    const data = filesync.readFileSync("../src/app/components/rubros/grilla-rubro-ingredientes/RubroIngredientes.json");
    const jsonData = JSON.parse(data);

    jsonData["Ingredientes_No_Vendibles"][req.body.id].nombre = req.body.nombre
    jsonData["Ingredientes_No_Vendibles"][req.body.id].estado = req.body.estado   

    filesync.writeFileSync("../src/app/components/rubros/grilla-rubro-ingredientes/RubroIngredientes.json", JSON.stringify(jsonData, null, 4));

    res.send('JSON file updated successfully');
})

app.delete("/borrar-ingredientes-vendibles", (req,res)=>{
    const data = filesync.readFileSync("../src/app/components/rubros/grilla-rubro-ingredientes/RubroIngredientes.json");
    const jsonData = JSON.parse(data);

    jsonData["Ingredientes_Vendibles"][req.body.id].nombre = req.body.nombre
    jsonData["Ingredientes_Vendibles"][req.body.id].estado = req.body.estado   

    filesync.writeFileSync("../src/app/components/rubros/grilla-rubro-ingredientes/RubroIngredientes.json", JSON.stringify(jsonData, null, 4));

    res.send('JSON file updated successfully');
})*/

app.listen(3000,()=>{
    console.log("Server corriendo en puerto", 3000)
}
)