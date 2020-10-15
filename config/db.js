const Datastore = require('nedb');
exports.payStack = new Datastore('./database/payStack.db');
exports.exco = new Datastore('./database/exco.db');