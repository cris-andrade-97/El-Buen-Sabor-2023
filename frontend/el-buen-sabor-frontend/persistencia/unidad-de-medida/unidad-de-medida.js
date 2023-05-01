const express = require("express");
const router = express.Router();
const filesync = require("fs");

router.get("/listar", (req, res) => {
  const data = filesync.readFileSync(
    "../src/app/components/unidad-de-medida/grilla-unidad-de-medida/Unidad-de-medida.json"
  );
  const jsonData = JSON.parse(data);
  res.send(jsonData["unidad-de-medida"]);
});

router.get("/buscar-por-id/:id", (req, res) => {
  const data = filesync.readFileSync(
    "../src/app/components/unidad-de-medida/grilla-unidad-de-medida/Unidad-de-medida.json"
  );
  const { id } = req.params;

  const jsonData = JSON.parse(data);
  const results = jsonData["unidad-de-medida"].filter(
    (obj) => obj.id == Number(id)
  );

  if (results.length !== 0) {
    res.send(results[0]);
  } else {
    res.send({
      results: false,
    });
  }
});

router.post("/nueva-unidad", (req, res) => {
  const data = filesync.readFileSync(
    "../src/app/components/unidad-de-medida/grilla-unidad-de-medida/Unidad-de-medida.json"
  );
  const jsonData = JSON.parse(data);

  jsonData["unidad-de-medida"].push({
    id: jsonData["unidad-de-medida"].length,
    nombreUMedida: req.body.nombreUMedida,
    estado: req.body.estado,
  });

  filesync.writeFileSync(
    "../src/app/components/unidad-de-medida/grilla-unidad-de-medida/Unidad-de-medida.json",
    JSON.stringify(jsonData, null, 4)
  );
  res.send({
    message: "Unidad agregada con éxito.",
  });
});

router.put("/modificar-unidad/:id", (req, res) => {
  const data = filesync.readFileSync(
    "../src/app/components/unidad-de-medida/grilla-unidad-de-medida/Unidad-de-medida.json"
  );
  const jsonData = JSON.parse(data);
  const { id } = req.params;

  jsonData["unidad-de-medida"][Number(id)].nombreUMedida =
    req.body.nombreUMedida;
  jsonData["unidad-de-medida"][Number(id)].estado = req.body.estado;

  filesync.writeFileSync(
    "../src/app/components/unidad-de-medida/grilla-unidad-de-medida/Unidad-de-medida.json",
    JSON.stringify(jsonData, null, 4)
  );

  res.send({
    message: "Unidad agregada con éxito.",
  });
});

router.put("/modificar-estado-unidad/:id", (req, res) => {
  const data = filesync.readFileSync(
    "../src/app/components/unidad-de-medida/grilla-unidad-de-medida/Unidad-de-medida.json"
  );
  const jsonData = JSON.parse(data);
  const { id } = req.params;

  jsonData["unidad-de-medida"][Number(id)].estado = req.body.estado;

  filesync.writeFileSync(
    "../src/app/components/unidad-de-medida/grilla-unidad-de-medida/Unidad-de-medida.json",
    JSON.stringify(jsonData, null, 4)
  );

  res.send({
    message: "Unidad agregada con éxito.",
  });
});

module.exports = router;
