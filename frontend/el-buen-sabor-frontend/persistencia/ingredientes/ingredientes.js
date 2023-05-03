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

router.get("/buscar-por-id/:id", (req, res) => {
    const ingredientes = JSON.parse(filesync.readFileSync("./jsons/Ingredientes.json"))["ingredientes"];
    const ingrediente = ingredientes.find(ingrediente => ingrediente.id === Number(req.params.id));

    res.send(ingrediente)

    if (ingrediente) {
        res.send(ingrediente)
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
        "unidadMedida": req.body.unidadMedida,
        "cantidadActual": req.body.cantidadActual,
        "rubroIngrediente": req.body.rubroIngrediente,
        "estado": req.body.estado,
        "costoPorUnidad": req.body.costoPorUnidad
    })

    filesync.writeFileSync("./jsons/Ingredientes.json", JSON.stringify(ingredientes, null, 4))

    res.send({
        "message": "Ingrediente añadido con éxito."
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
    ingredientes["ingredientes"][Number(req.params.id)].unidadMedida = req.body.unidadMedida;
    ingredientes["ingredientes"][Number(req.params.id)].cantidadActual = Number(req.body.cantidadActual);
    ingredientes["ingredientes"][Number(req.params.id)].rubroIngrediente = req.body.rubroIngrediente;
    ingredientes["ingredientes"][Number(req.params.id)].estado = req.body.estado;
    ingredientes["ingredientes"][Number(req.params.id)].costoPorUnidad = Number(req.body.costoPorUnidad);

    filesync.writeFileSync("./jsons/Ingredientes.json", JSON.stringify(ingredientes, null, 4))

    res.send({
        "message": "Ingrediente modificado con éxito."
    })

})

router.put("/registrar-compra/:id", (req, res) => {

    const ingredientes = JSON.parse(filesync.readFileSync("./jsons/Ingredientes.json"));

    ingredientes["ingredientes"][Number(req.params.id)].cantidadActual = Number(req.body.cantidadActual);
    ingredientes["ingredientes"][Number(req.params.id)].costoPorUnidad = Number(req.body.costoPorUnidad);

    filesync.writeFileSync("./jsons/Ingredientes.json", JSON.stringify(ingredientes, null, 4))

    res.send({
        "message": "Compra de ingrediente registrada con éxito."
    })
})
/*router.put("/modificar-nombre/:id", (req, res) => {
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

    ingredientes["ingredientes"][Number(req.params.id)].unidadMedida = req.body.unidadMedida;

    filesync.writeFileSync("./jsons/Ingredientes.json", JSON.stringify(ingredientes, null, 4))

    res.send({
        "message": "Ingrediente modificado con éxito."
    })
})

router.put("/modificar-rubro/:id", (req, res) => {
    const ingredientes = JSON.parse(filesync.readFileSync("./jsons/Ingredientes.json"));

    ingredientes["ingredientes"][Number(req.params.id)].rubroIngrediente = req.body.rubroIngrediente;

    filesync.writeFileSync("./jsons/Ingredientes.json", JSON.stringify(ingredientes, null, 4))

    res.send({
        "message": "Ingrediente modificado con éxito."
    })
})

*/



module.exports = router
