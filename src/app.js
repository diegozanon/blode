var initializer = require("./lib/initializer");

function main() {

    initializer.validateInput();
    var directory = initializer.getDirectory();
}

main();