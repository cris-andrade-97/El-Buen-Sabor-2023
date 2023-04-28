const express = require('express')
const router = express.Router()
const filesync = require("fs")

router.get("/listar", (req, res) => {
    const data = filesync.readFileSync("../src/app/components/rubros/grilla-rubro-ingredientes/RubroIngredientes.json");
    const jsonData = JSON.parse(data);
    res.send(jsonData["rubro-ingredientes"])
})

router.get("/buscar-por-id/:id", (req, res) => {
    const data = filesync.readFileSync("../src/app/components/rubros/grilla-rubro-ingredientes/RubroIngredientes.json");
    const { id } = req.params

    const jsonData = JSON.parse(data);
    const results = jsonData["rubro-ingredientes"].filter(obj => obj.id == Number(id));

    if (results.length !== 0) {
        res.send(results[0])
    } else {
        res.send({
            "results": false
        })
    }
})

/*
router.get("/buscar-por-nombre/:nombre", (req, res) => {
    const data = filesync.readFileSync("../src/app/components/rubros/grilla-rubro-ingredientes/RubroIngredientes.json");
    const jsonData = JSON.parse(data);
    const { nombre } = req.params

    const results = jsonData["rubro-ingredientes"].filter(obj => obj.nombre.toLowerCase().includes(nombre));

    if (results.length !== 0) {
        res.send(results)
    } else {
        res.send({
            "results": false
        })
    }
})

router.get("/rubros-a-la-venta", (req, res) => {
    const data = filesync.readFileSync("../src/app/components/rubros/grilla-rubro-ingredientes/RubroIngredientes.json");
    const jsonData = JSON.parse(data);

    const results = jsonData["rubro-ingredientes"].filter(obj => obj.aLaVenta == true);

    if (results.length !== 0) {
        res.send(results)
    } else {
        res.send({
            "results": false
        })
    }
})

router.get("/rubros-no-a-la-venta", (req, res) => {
    const data = filesync.readFileSync("../src/app/components/rubros/grilla-rubro-ingredientes/RubroIngredientes.json");
    const jsonData = JSON.parse(data);

    const results = jsonData["rubro-ingredientes"].filter(obj => obj.aLaVenta == false);

    if (results.length !== 0) {
        res.send(results)
    } else {
        res.send({
            "results": false
        })
    }
})

router.get("/rubros-en-vigencia", (req, res) => {
    const data = filesync.readFileSync("../src/app/components/rubros/grilla-rubro-ingredientes/RubroIngredientes.json");
    const jsonData = JSON.parse(data);

    const results = jsonData["rubro-ingredientes"].filter(obj => obj.estado == true);

    if (results.length !== 0) {
        res.send(results)
    } else {
        res.send({
            "results": false
        })
    }
})

router.get("/rubros-en-baja", (req, res) => {
    const data = filesync.readFileSync("../src/app/components/rubros/grilla-rubro-ingredientes/RubroIngredientes.json");
    const jsonData = JSON.parse(data);

    const results = jsonData["rubro-ingredientes"].filter(obj => obj.estado == false);

    if (results.length !== 0) {
        res.send(results)
    } else {
        res.send({
            "results": false
        })
    }
})
*/
router.post("/nuevo-rubro", (req, res) => {
    const data = filesync.readFileSync("../src/app/components/rubros/grilla-rubro-ingredientes/RubroIngredientes.json");
    const jsonData = JSON.parse(data);

    jsonData["rubro-ingredientes"].push(
        {
            "id": jsonData["rubro-ingredientes"].length,
            "nombre": req.body.nombre,
            "estado": req.body.estado,
            "aLaVenta": req.body.aLaVenta
        }
    )

    filesync.writeFileSync("../src/app/components/rubros/grilla-rubro-ingredientes/RubroIngredientes.json", JSON.stringify(jsonData, null, 4));
    res.send({
        "message": "Rubro agregado con éxito."
    })
})

router.put("/modificar-rubro/:id", (req, res) => {
    const data = filesync.readFileSync("../src/app/components/rubros/grilla-rubro-ingredientes/RubroIngredientes.json");
    const jsonData = JSON.parse(data);
    const { id } = req.params

    jsonData["rubro-ingredientes"][Number(id)].nombre = req.body.nombre
    jsonData["rubro-ingredientes"][Number(id)].estado = req.body.estado
    jsonData["rubro-ingredientes"][Number(id)].aLaVenta = req.body.aLaVenta

    filesync.writeFileSync("../src/app/components/rubros/grilla-rubro-ingredientes/RubroIngredientes.json", JSON.stringify(jsonData, null, 4));

    res.send({
        "message": "Rubro modificado con éxito."
    });
})

router.put("/modificar-nombre-rubro/:id", (req, res) => {
    const data = filesync.readFileSync("../src/app/components/rubros/grilla-rubro-ingredientes/RubroIngredientes.json");
    const jsonData = JSON.parse(data);
    const { id } = req.params

    jsonData["rubro-ingredientes"][Number(id)].nombre = req.body.nombre

    filesync.writeFileSync("../src/app/components/rubros/grilla-rubro-ingredientes/RubroIngredientes.json", JSON.stringify(jsonData, null, 4));

    res.send({
        "message": "Rubro modificado con éxito."
    });
})

router.put("/modificar-estado-rubro/:id", (req, res) => {
    const data = filesync.readFileSync("../src/app/components/rubros/grilla-rubro-ingredientes/RubroIngredientes.json");
    const jsonData = JSON.parse(data);
    const { id } = req.params

    jsonData["rubro-ingredientes"][Number(id)].estado = req.body.estado

    filesync.writeFileSync("../src/app/components/rubros/grilla-rubro-ingredientes/RubroIngredientes.json", JSON.stringify(jsonData, null, 4));

    res.send({
        "message": "Rubro modificado con éxito."
    });
})

router.put("/modificar-venta-rubro/:id", (req, res) => {
    const data = filesync.readFileSync("../src/app/components/rubros/grilla-rubro-ingredientes/RubroIngredientes.json");
    const jsonData = JSON.parse(data);
    const { id } = req.params

    jsonData["rubro-ingredientes"][Number(id)].aLaVenta = req.body.aLaVenta

    filesync.writeFileSync("../src/app/components/rubros/grilla-rubro-ingredientes/RubroIngredientes.json", JSON.stringify(jsonData, null, 4));

    res.send({
        "message": "Rubro modificado con éxito."
    });
})

router.delete("/borrar-rubro/:id", (req, res) => {
    const data = filesync.readFileSync("../src/app/components/rubros/grilla-rubro-ingredientes/RubroIngredientes.json");
    const jsonData = JSON.parse(data);
    const { id } = req.params

    const index = jsonData["rubro-ingredientes"].findIndex(obj => obj.id === Number(id));

    if (index !== -1) {
        jsonData["rubro-ingredientes"].splice(index, 1)
        filesync.writeFileSync("../src/app/components/rubros/grilla-rubro-ingredientes/RubroIngredientes.json", JSON.stringify(jsonData, null, 4));
        res.send({
            "message": "Rubro eliminado con éxito."
        });
    } else {
        res.send({
            "results": false
        })
    }
})

module.exports = router;