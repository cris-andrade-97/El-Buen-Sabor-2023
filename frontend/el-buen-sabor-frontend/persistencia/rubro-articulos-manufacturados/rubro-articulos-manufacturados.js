const express = require('express')
const router = express.Router()
const filesync = require("fs")

router.get("/listar", (req, res) => {
    const data = filesync.readFileSync("../persistencia/rubro-articulos-manufacturados/RubroManufacturados.json");
    const jsonData = JSON.parse(data);
    res.send(jsonData["articulos-manufacturados"])
})

router.get("/buscar-por-nombre/:nombre", (req, res) => {
    const data = filesync.readFileSync("../persistencia/rubro-articulos-manufacturados/RubroManufacturados.json");
    const jsonData = JSON.parse(data);
    const { nombre } = req.params

    const results = jsonData["articulos-manufacturados"].filter(obj => obj.nombre.toLowerCase().includes(nombre));

    if (results.length !== 0) {
        res.send(results)
    } else {
        res.send({
            "results": false
        })
    }
})

router.post("/nuevo-rubro", (req, res) => {
    const data = filesync.readFileSync("../persistencia/rubro-articulos-manufacturados/RubroManufacturados.json");
    const jsonData = JSON.parse(data);

    jsonData["articulos-manufacturados"].push(
        {
            "id": jsonData["articulos-manufacturados"].length,
            "nombre": req.body.nombre,
            "estado": req.body.estado
        }
    )

    filesync.writeFileSync("../persistencia/rubro-articulos-manufacturados/RubroManufacturados.json", JSON.stringify(jsonData, null, 4));
    res.send({
        "message": "Rubro agregado con éxito."
    })
})

router.put("/modificar-rubro", (req, res) => {
    const data = filesync.readFileSync("../persistencia/rubro-articulos-manufacturados/RubroManufacturados.json");
    const jsonData = JSON.parse(data);

    jsonData["articulos-manufacturados"][req.body.id].nombre = req.body.nombre
    jsonData["articulos-manufacturados"][req.body.id].estado = req.body.estado

    filesync.writeFileSync("../persistencia/rubro-articulos-manufacturados/RubroManufacturados.json", JSON.stringify(jsonData, null, 4));

    res.send({
        "message": "Rubro modificado con éxito."
    });
})

router.delete("/borrar-rubro/:id", (req, res) => {
    const data = filesync.readFileSync("../persistencia/rubro-articulos-manufacturados/RubroManufacturados.json");
    const jsonData = JSON.parse(data);

    const { id } = req.params

    const index = jsonData["articulos-manufacturados"].findIndex(obj => obj.id === Number(id));

    if (index !== -1) {
        jsonData["articulos-manufacturados"].splice(index, 1)

        filesync.writeFileSync("../persistencia/rubro-articulos-manufacturados/RubroManufacturados.json", JSON.stringify(jsonData, null, 4));

        res.send({
            "message": "Rubro eliminado con éxito."
        });
    } else {
        res.send({
            "results": false
        });
    }
})

module.exports = router