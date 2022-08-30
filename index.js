const express = require("express");
const logger = require("./startup/logging");
const config = require("config");
const app = express();

require("./startup/cors")(app);
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config");


const port = process.env.PORT || config.get("port");
app.listen(port, () => {
  logger.info(`Listening on port ${port}....`);
});
