const express = require("express");
const router = express.Router();
const filesync = require("fs");

router.get("/listar", (req, res) => {
  const articulosManufacturados = JSON.parse(
    filesync.readFileSync("./jsons/ArticulosManufacturados.json")
  )["articulosManufacturados"];

  if (articulosManufacturados.length !== 0) {
    res.send(articulosManufacturados);
  } else {
    res.send({
      results: false,
    });
  }
});

router.get("/buscar-por-id/:id", (req, res) => {
  const articulosManufacturados = JSON.parse(
    filesync.readFileSync("./jsons/ArticulosManufacturados.json")
  )["articulosManufacturados"];
  const articuloManufacturado = articulosManufacturados.find(
    (articulomanufacturado) =>
      articulomanufacturado.id === Number(req.params.id)
  );

  res.send(articuloManufacturado);

  if (articuloManufacturado) {
    res.send(articuloManufacturado);
  } else {
    res.send({
      results: false,
    });
  }
});

router.post("/nuevo", (req, res) => {
  const articulosManufacturados = JSON.parse(
    filesync.readFileSync("./jsons/ArticulosManufacturados.json")
  );

  articulosManufacturados["articulosManufacturados"].push({
    id: articulosManufacturados["articulosManufacturados"].length,
    nombre: req.body.nombre,
    precioVenta: req.body.precioVenta,
    imagen: req.body.imagen,
    estado: req.body.estado,
    rubroArticulo: req.body.rubroArticulo,
    articuloManufacturadoDetalle: req.body.articuloManufacturadoDetalle,
    costoTotal: req.body.costoTotal
  });

  filesync.writeFileSync(
    "./jsons/ArticulosManufacturados.json",
    JSON.stringify(articulosManufacturados, null, 4)
  );

  res.send({
    message: "Articulo añadido con éxito.",
  });
});

router.put("/modificar-estado/:id", (req, res) => {
  const articulosManufacturados = JSON.parse(
    filesync.readFileSync("./jsons/ArticulosManufacturados.json")
  );

  articulosManufacturados["articulosManufacturados"][
    Number(req.params.id)
  ].estado = req.body.estado;

  filesync.writeFileSync(
    "./jsons/ArticulosManufacturados.json",
    JSON.stringify(articulosManufacturados, null, 4)
  );

  res.send({
    message: "Articulo modificado con éxito.",
  });
});

router.put("/modificar-todo/:id", (req, res) => {
  const articulosManufacturados = JSON.parse(
    filesync.readFileSync("./jsons/ArticulosManufacturados.json")
  );

  articulosManufacturados["articulosManufacturados"][
    Number(req.params.id)
  ].nombre = req.body.nombre;
  articulosManufacturados["articulosManufacturados"][
    Number(req.params.id)
  ].precioVenta = Number(req.body.precioVenta);
  articulosManufacturados["articulosManufacturados"][
    Number(req.params.id)
  ].imagen = req.body.imagen;
  articulosManufacturados["articulosManufacturados"][
    Number(req.params.id)
  ].estado = req.body.estado;
  articulosManufacturados["articulosManufacturados"][
    Number(req.params.id)
  ].rubroArticulo = req.body.rubroArticulo;
  articulosManufacturados["articulosManufacturados"][
    Number(req.params.id)
  ].articuloManufacturadoDetalle = req.body.articuloManufacturadoDetalle;
  articulosManufacturados["articulosManufacturados"][
    Number(req.params.id)
  ].costoTotal = req.body.costoTotal;

  filesync.writeFileSync(
    "./jsons/ArticulosManufacturados.json",
    JSON.stringify(articulosManufacturados, null, 4)
  );

  res.send({
    message: "Articulo modificado con éxito.",
  });
});

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

module.exports = router;
