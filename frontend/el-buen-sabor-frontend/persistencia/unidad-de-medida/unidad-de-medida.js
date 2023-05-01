const express = require("express");
const router = express.Router();
const filesync = require("fs");

router.get("/listar", (req, res) => {
  const jsonData = JSON.parse(filesync.readFileSync("./jsons/UnidadesMedida.json"))["unidad-de-medida"];

  res.send(jsonData);
});

router.get("/buscar-por-id/:id", (req, res) => {
  const data = JSON.parse(filesync.readFileSync("./jsons/UnidadesMedida.json"));

  const results = data["unidad-de-medida"].filter(
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
  const data = JSON.parse(filesync.readFileSync("./jsons/UnidadesMedida.json"));

  data["unidad-de-medida"].push({
    "id": data["unidad-de-medida"].length,
    "nombre": req.body.nombre,
    "unidad": req.body.unidad
  });

  filesync.writeFileSync("./jsons/UnidadesMedida.json", JSON.stringify(data, null, 4));
  res.send({
    message: "Unidad agregada con éxito.",
  });
});

router.put("/modificar-todo/:id", (req, res) => {
  const data = JSON.parse(filesync.readFileSync("./jsons/UnidadesMedida.json"));
  const { id } = req.params

  data["unidad-de-medida"][Number(id)].nombre = req.body.nombre;
  data["unidad-de-medida"][Number(id)].unidad = req.body.unidad;

  filesync.writeFileSync("./jsons/UnidadesMedida.json", JSON.stringify(data, null, 4));

  res.send({
    message: "Unidad modificada con éxito.",
  });
});

router.put("/modificar-nombre/:id", (req, res) => {
  const data = JSON.parse(filesync.readFileSync("./jsons/UnidadesMedida.json"));

  data["unidad-de-medida"][Number(req.params.id)].nombre = req.body.nombre;

  filesync.writeFileSync("./jsons/UnidadesMedida.json", JSON.stringify(data, null, 4)
  );

  res.send({
    message: "Unidad modificada con éxito.",
  });
});

router.put("/modificar-unidad/:id", (req, res) => {
  const data = JSON.parse(filesync.readFileSync("./jsons/UnidadesMedida.json"));

  data["unidad-de-medida"][Number(req.params.id)].unidad = req.body.unidad;

  filesync.writeFileSync("./jsons/UnidadesMedida.json", JSON.stringify(data, null, 4)
  );

  res.send({
    message: "Unidad modificada con éxito.",
  });
});

module.exports = router;
