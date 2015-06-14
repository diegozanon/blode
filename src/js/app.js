(function main(){
    var marked = require('marked');
    var result = marked('I am compiling **markdown**.');
    document.write(result);
}());