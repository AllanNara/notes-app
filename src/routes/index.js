const path = require("path");
const fs = require("fs");
const { Router } = require("express");

const router = Router();

fs.readdirSync(__dirname).forEach((file) => {
  if (file.slice(-10) !== ".routes.js") return;

  let name = file.substring(0, file.indexOf(".routes.js"));
  if(name === 'index') name = '';
  const cb = require(path.join(__dirname, file));

  router.use(`/${name}`, cb);
});

module.exports = router;
