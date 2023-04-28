const express = require('express')
const router = express.Router()
const filesync = require("fs")

router.get("/listar", (req, res) => {
    const data = filesync.readFileSync("../src/app/components/rubros/grilla-rubro-productos/Rubro Manufacturados.json");
    const jsonData = JSON.parse(data);
    res.send(jsonData["Articulos_Manufacturados"])
})

router.get("/buscar-por-nombre/:nombre", (req, res) => {
    const data = filesync.readFileSync("../src/app/components/rubros/grilla-rubro-productos/Rubro Manufacturados.json");
    const jsonData = JSON.parse(data);
    const { nombre } = req.params

    const results = jsonData["Articulos_Manufacturados"].filter(obj => obj.nombre.toLowerCase().includes(nombre));

    if (results.length !== 0) {
        res.send(results)
    } else {
        res.send({
            "results": false
        })
    }
})

router.post("/nuevo-rubro", (req, res) => {
    const data = filesync.readFileSync("../src/app/components/rubros/grilla-rubro-productos/Rubro Manufacturados.json");
    const jsonData = JSON.parse(data);

    jsonData["Articulos_Manufacturados"].push(
        {
            "id": jsonData["Articulos_Manufacturados"].length,
            "nombre": req.body.nombre,
            "estado": req.body.estado
        }
    )

    filesync.writeFileSync("../src/app/components/rubros/grilla-rubro-productos/Rubro Manufacturados.json", JSON.stringify(jsonData, null, 4));
    res.send({
        "message": "Rubro agregado con éxito."
    })
})

router.put("/modificar-rubro", (req, res) => {
    const data = filesync.readFileSync("../src/app/components/rubros/grilla-rubro-productos/Rubro Manufacturados.json");
    const jsonData = JSON.parse(data);

    jsonData["Articulos_Manufacturados"][req.body.id].nombre = req.body.nombre
    jsonData["Articulos_Manufacturados"][req.body.id].estado = req.body.estado

    filesync.writeFileSync("../src/app/components/rubros/grilla-rubro-productos/Rubro Manufacturados.json", JSON.stringify(jsonData, null, 4));

    res.send({
        "message": "Rubro modificado con éxito."
    });
})

router.delete("/borrar-rubro/:id", (req, res) => {
    const data = filesync.readFileSync("../src/app/components/rubros/grilla-rubro-productos/Rubro Manufacturados.json");
    const jsonData = JSON.parse(data);

    const { id } = req.params

    const index = jsonData["Articulos_Manufacturados"].findIndex(obj => obj.id === Number(id));

    if (index !== -1) {
        jsonData["Articulos_Manufacturados"].splice(index, 1)

        filesync.writeFileSync("../src/app/components/rubros/grilla-rubro-productos/Rubro Manufacturados.json", JSON.stringify(jsonData, null, 4));

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