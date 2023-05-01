const express = require("express")
const router = express.Router()
const filesync = require("fs")

router.get("/listar", (req, res) => {
    const ingredientes = JSON.parse(filesync.readFileSync("./jsons/Ingredientes.json"))["ingredientes"];

    if (ingredientes.length !== 0) {
        res.send(ingredientes)
    } else {
        res.send({
            "results": false
        })
    }
}
)

router.post("/nuevo", (req, res) => {

    const ingredientes = JSON.parse(filesync.readFileSync("./jsons/Ingredientes.json"));

    ingredientes["ingredientes"].push({
        "id": ingredientes["ingredientes"].length,
        "nombre": req.body.nombre,
        "stockMinimoInsumo": req.body.stockMinimoInsumo,
        "idUnidadMedida": req.body.idUnidadMedida,
        "cantidadActual": req.body.cantidadActual,
        "idRubroIngrediente": req.body.idRubroIngrediente,
        "estado": req.body.estado
    })

    filesync.writeFileSync("./jsons/Ingredientes.json", JSON.stringify(ingredientes, null, 4))

    res.send({
        "message": "Ingrediente añadido con éxito."
    })

})

router.put("/modificar-nombre/:id", (req, res) => {
    const ingredientes = JSON.parse(filesync.readFileSync("./jsons/Ingredientes.json"));

    ingredientes["ingredientes"][Number(req.params.id)].nombre = req.body.nombre;

    filesync.writeFileSync("./jsons/Ingredientes.json", JSON.stringify(ingredientes, null, 4))

    res.send({
        "message": "Ingrediente modificado con éxito."
    })
})

router.put("/modificar-stock-minimo/:id", (req, res) => {
    const ingredientes = JSON.parse(filesync.readFileSync("./jsons/Ingredientes.json"));

    ingredientes["ingredientes"][Number(req.params.id)].stockMinimoInsumo = Number(req.body.stockMinimoInsumo);

    filesync.writeFileSync("./jsons/Ingredientes.json", JSON.stringify(ingredientes, null, 4))

    res.send({
        "message": "Ingrediente modificado con éxito."
    })
})

router.put("/modificar-cantidad-actual/:id", (req, res) => {
    const ingredientes = JSON.parse(filesync.readFileSync("./jsons/Ingredientes.json"));

    ingredientes["ingredientes"][Number(req.params.id)].cantidadActual = Number(req.body.cantidadActual);

    filesync.writeFileSync("./jsons/Ingredientes.json", JSON.stringify(ingredientes, null, 4))

    res.send({
        "message": "Ingrediente modificado con éxito."
    })
})

router.put("/modificar-unidad-medida/:id", (req, res) => {
    const ingredientes = JSON.parse(filesync.readFileSync("./jsons/Ingredientes.json"));

    ingredientes["ingredientes"][Number(req.params.id)].idUnidadMedida = Number(req.body.idUnidadMedida);

    filesync.writeFileSync("./jsons/Ingredientes.json", JSON.stringify(ingredientes, null, 4))

    res.send({
        "message": "Ingrediente modificado con éxito."
    })
})

router.put("/modificar-rubro/:id", (req, res) => {
    const ingredientes = JSON.parse(filesync.readFileSync("./jsons/Ingredientes.json"));

    ingredientes["ingredientes"][Number(req.params.id)].idRubroIngrediente = Number(req.body.idRubroIngrediente);

    filesync.writeFileSync("./jsons/Ingredientes.json", JSON.stringify(ingredientes, null, 4))

    res.send({
        "message": "Ingrediente modificado con éxito."
    })
})

router.put("/modificar-estado/:id", (req, res) => {
    const ingredientes = JSON.parse(filesync.readFileSync("./jsons/Ingredientes.json"));

    ingredientes["ingredientes"][Number(req.params.id)].estado = req.body.estado;

    filesync.writeFileSync("./jsons/Ingredientes.json", JSON.stringify(ingredientes, null, 4))

    res.send({
        "message": "Ingrediente modificado con éxito."
    })
})

router.put("/modificar-todo/:id", (req, res) => {

    const ingredientes = JSON.parse(filesync.readFileSync("./jsons/Ingredientes.json"));

    ingredientes["ingredientes"][Number(req.params.id)].nombre = req.body.nombre;
    ingredientes["ingredientes"][Number(req.params.id)].stockMinimoInsumo = Number(req.body.stockMinimoInsumo);
    ingredientes["ingredientes"][Number(req.params.id)].idUnidadMedida = Number(req.body.idUnidadMedida);
    ingredientes["ingredientes"][Number(req.params.id)].cantidadActual = Number(req.body.cantidadActual);
    ingredientes["ingredientes"][Number(req.params.id)].idRubroIngrediente = Number(req.body.idRubroIngrediente);
    ingredientes["ingredientes"][Number(req.params.id)].estado = req.body.estado;

    filesync.writeFileSync("./jsons/Ingredientes.json", JSON.stringify(ingredientes, null, 4))

    res.send({
        "message": "Ingrediente modificado con éxito."
    })

})

module.exports = router
