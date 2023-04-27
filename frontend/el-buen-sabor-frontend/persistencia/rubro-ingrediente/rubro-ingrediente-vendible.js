const express = require('express')
const router = express.Router()
const filesync = require("fs")


router.get("/listar", (req, res) => {
    const data = filesync.readFileSync("../src/app/components/rubros/grilla-rubro-ingredientes/RubroIngredientes.json");
    const jsonData = JSON.parse(data);
    res.send(jsonData["Ingredientes_Vendibles"])
})

router.get("/buscar-por-nombre/:nombre", (req, res) => {
    const data = filesync.readFileSync("../src/app/components/rubros/grilla-rubro-ingredientes/RubroIngredientes.json");
    const jsonData = JSON.parse(data);
    const { nombre } = req.params

    const results = jsonData["Ingredientes_Vendibles"].filter(obj => obj.nombre.toLowerCase().includes(nombre));

    if (results.length !== 0){
        res.send(results)
    }else{
        res.send({
            "results": false
        })
    }
})

router.post("/nuevo-rubro", (req, res) => {
    const data = filesync.readFileSync("../src/app/components/rubros/grilla-rubro-ingredientes/RubroIngredientes.json");
    const jsonData = JSON.parse(data);

    jsonData["Ingredientes_Vendibles"].push(
        {
            "id": jsonData["Ingredientes_Vendibles"].length,
            "nombre": req.body.nombre,
            "estado": req.body.estado
        }
    )

    filesync.writeFileSync("../src/app/components/rubros/grilla-rubro-ingredientes/RubroIngredientes.json", JSON.stringify(jsonData, null, 4));
    res.send({
        "message": "Rubro agregado con éxito."
    })
})

router.put("/modificar-rubro", (req, res) => {
    const data = filesync.readFileSync("../src/app/components/rubros/grilla-rubro-ingredientes/RubroIngredientes.json");
    const jsonData = JSON.parse(data);

    jsonData["Ingredientes_Vendibles"][req.body.id].nombre = req.body.nombre
    jsonData["Ingredientes_Vendibles"][req.body.id].estado = req.body.estado

    filesync.writeFileSync("../src/app/components/rubros/grilla-rubro-ingredientes/RubroIngredientes.json", JSON.stringify(jsonData, null, 4));

    res.send({
        "message": "Rubro modificado con éxito."
    });
})

router.delete("/borrar-rubro/:id", (req, res) => {
    const data = filesync.readFileSync("../src/app/components/rubros/grilla-rubro-ingredientes/RubroIngredientes.json");
    const jsonData = JSON.parse(data);
    const { id } = req.params

    const index = jsonData["Ingredientes_Vendibles"].findIndex(obj => obj.id === Number(id));

    if (index !== -1) {
        jsonData["Ingredientes_Vendibles"].splice(index, 1)
    }

    filesync.writeFileSync("../src/app/components/rubros/grilla-rubro-ingredientes/RubroIngredientes.json", JSON.stringify(jsonData, null, 4));

    res.send({
        "message": "Rubro eliminado con éxito."
    });
})

module.exports = router;