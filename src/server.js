
const express = require('express');
const bodyParser = require('body-parser');
const properties = require('./config/properties-config');
const routes = require('./api/routes/index');
const { errorHandler } = require('./api/middlewares/errorHandler');

class Server {
  constructor() {
    this.app = null;
  }
  start() {
    this.app = express();
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.listen(properties.PORT, (req, res) => {
      console.log(`Server is running on ${properties.PORT} port.`);
    });

    this.app.use('/api/v1/', routes);
    this.app.use(errorHandler);
  }
}

let server = new Server();
server.start();
