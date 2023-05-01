const express = require("express");
const router = express.Router();
const filesync = require("fs");

router.get("/listar", (req, res) => {
  const jsonData = JSON.parse(filesync.readFileSync("./jsons/UnidadesMedida.json"))["unidad-de-medida"];

  res.send(jsonData);
});

router.get("/buscar-por-id/:id", (req, res) => {
  const data = JSON.parse(filesync.readFileSync("./jsons/UnidadesMedida.json"));

  const results = jsonData["unidad-de-medida"].filter(
    (obj) => obj.id == Number(req.params.id)
  );

  if (results.length !== 0) {
    res.send(results[0]);
  } else {
    res.send({
      "results": false,
    });
  }
});

router.post("/nuevo", (req, res) => {
  const data = JSON.parse(filesync.readFileSync("./jsons/Ingredientes.json"));

  data["unidad-de-medida"].push({
    "id": data["unidad-de-medida"].length,
    "nombre": req.body.nombre,
    "unidad": req.body.unidad
  });

  filesync.writeFileSync("./jsons/Ingredientes.json", JSON.stringify(jsonData, null, 4));
  res.send({
    message: "Unidad agregada con éxito.",
  });
});

router.put("/modificar-todo/:id", (req, res) => {
  const data = filesync.readFileSync("./jsons/Ingredientes.json");

  const jsonData = JSON.parse(data);

  jsonData["unidad-de-medida"][Number(req.params.id)].nombre = req.body.nombre;
  jsonData["unidad-de-medida"][Number(req.params.id)].estado = req.body.estado;
  jsonData["unidad-de-medida"][Number(req.params.id)].unidad = req.body.unidad;

  filesync.writeFileSync("./jsons/Ingredientes.json", JSON.stringify(jsonData, null, 4)
  );

  res.send({
    message: "Unidad modificada con éxito.",
  });
});

router.put("/modificar-nombre/:id", (req, res) => {
  const data = filesync.readFileSync("./jsons/Ingredientes.json");

  const jsonData = JSON.parse(data);

  jsonData["unidad-de-medida"][Number(req.params.id)].nombre = req.body.nombre;

  filesync.writeFileSync("./jsons/Ingredientes.json", JSON.stringify(jsonData, null, 4)
  );

  res.send({
    message: "Unidad modificada con éxito.",
  });
});

router.put("/modificar-unidad/:id", (req, res) => {
  const data = filesync.readFileSync("./jsons/Ingredientes.json");

  const jsonData = JSON.parse(data);

  jsonData["unidad-de-medida"][Number(req.params.id)].unidad = req.body.unidad;

  filesync.writeFileSync("./jsons/Ingredientes.json", JSON.stringify(jsonData, null, 4)
  );

  res.send({
    message: "Unidad modificada con éxito.",
  });
});

module.exports = router;
