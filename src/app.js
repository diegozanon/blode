var initializer = require("./lib/initializer");

function main() {

    var config = initializer.getConfig();
    initializer.validate(config); // throws an error if invalid
}

main();