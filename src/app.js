var initializer = require("./lib/initializer");

function main() {

    initializer.validateArguments();
    var directory = initializer.getDirectory();
    var config = initializer.getConfig();

}

main();