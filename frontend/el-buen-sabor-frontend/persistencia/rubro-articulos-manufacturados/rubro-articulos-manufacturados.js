const express = require('express')
const router = express.Router()
const filesync = require("fs")

router.get("/listar", (req, res) => {
    const data = filesync.readFileSync("./jsons/RubroManufacturados.json");
    const jsonData = JSON.parse(data);
    res.send(jsonData["articulos-manufacturados"])
})

router.get("/buscar-por-id/:id", (req, res) => {
    const data = filesync.readFileSync("./jsons/RubroManufacturados.json");
    const { id } = req.params

    const jsonData = JSON.parse(data);
    const results = jsonData["articulos-manufacturados"].filter(obj => obj.id == Number(id));

    if (results.length !== 0) {
        res.send(results[0])
    } else {
        res.send({
            "results": false
        })
    }
})

router.post("/nuevo-rubro", (req, res) => {
    const data = filesync.readFileSync("./jsons/RubroManufacturados.json");
    //../src/app/components/grilla-rubro-productos/
    const jsonData = JSON.parse(data);

    jsonData["articulos-manufacturados"].push(
        {
            "id": jsonData["articulos-manufacturados"].length,
            "nombre": req.body.nombre,
            "estado": req.body.estado
        }
    )

    filesync.writeFileSync("./jsons/RubroManufacturados.json", JSON.stringify(jsonData, null, 4));
    res.send({
        "message": "Rubro agregado con éxito."
    })
})

router.put("/modificar-rubro/:id", (req, res) => {
    const data = filesync.readFileSync("./jsons/RubroManufacturados.json");
    const jsonData = JSON.parse(data);
    const { id } = req.params

    jsonData["articulos-manufacturados"][Number(id)].nombre = req.body.nombre
    jsonData["articulos-manufacturados"][Number(id)].estado = req.body.estado

    filesync.writeFileSync("./jsons/RubroManufacturados.json", JSON.stringify(jsonData, null, 4));

    res.send({
        "message": "Rubro modificado con éxito."
    });
})

router.put("/modificar-nombre-rubro/:id", (req, res) => {
    const data = filesync.readFileSync("./jsons/RubroManufacturados.json");
    const jsonData = JSON.parse(data);
    const { id } = req.params

    jsonData["articulos-manufacturados"][Number(id)].nombre = req.body.nombre    

    filesync.writeFileSync("./jsons/RubroManufacturados.json", JSON.stringify(jsonData, null, 4));

    res.send({
        "message": "Rubro modificado con éxito."
    });
})

router.put("/modificar-estado-rubro/:id", (req, res) => {
    const data = filesync.readFileSync("./jsons/RubroManufacturados.json");
    const jsonData = JSON.parse(data);
    const { id } = req.params

    jsonData["articulos-manufacturados"][Number(id)].estado = req.body.estado 

    filesync.writeFileSync("./jsons/RubroManufacturados.json", JSON.stringify(jsonData, null, 4));

    res.send({
        "message": "Rubro modificado con éxito."
    });
})
/*
router.get("/rubros-en-vigencia", (req, res) => {
    const data = filesync.readFileSync("./jsons/RubroManufacturados.json");
    const jsonData = JSON.parse(data);

    const results = jsonData["articulos-manufacturados"].filter(obj => obj.estado == true);

    res.send(results)
})

router.get("/rubros-en-baja", (req, res) => {
    const data = filesync.readFileSync("./jsons/RubroManufacturados.json");
    const jsonData = JSON.parse(data);

    const results = jsonData["articulos-manufacturados"].filter(obj => obj.estado == false);

    res.send(results)
})

router.get("/buscar-por-nombre/:nombre", (req, res) => {
    const data = filesync.readFileSync("./jsons/RubroManufacturados.json");
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
router.delete("/borrar-rubro/:id", (req, res) => {
    const data = filesync.readFileSync("./jsons/RubroManufacturados.json");
    const jsonData = JSON.parse(data);

    const { id } = req.params

    const index = jsonData["articulos-manufacturados"].findIndex(obj => obj.id === Number(id));

    if (index !== -1) {
        jsonData["articulos-manufacturados"].splice(index, 1)

        filesync.writeFileSync("./jsons/RubroManufacturados.json", JSON.stringify(jsonData, null, 4));

        res.send({
            "message": "Rubro eliminado con éxito."
        });
    } else {
        res.send({
            "results": false
        });
    }
})*/

module.exports = router