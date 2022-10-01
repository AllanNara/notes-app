const path = require("path");
const fs = require("fs");

const basename = path.basename(__filename);

const models = {};

fs.readdirSync(__dirname)
.filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
.forEach(file => {
		let name = file.substring(0, file.lastIndexOf('.'));
		let model = require(path.join(__dirname, file))
		models[name] = model
});

module.exports = {
	...models
};
