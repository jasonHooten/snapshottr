var snapshottr = require("./lib/snapshottr");

console.log('\n=================');
console.log('= SnapShottr');
console.log('a simple html snap-shotting \n');
console.log('to run unit tests with.. ');
console.log('jasmine-node spec --autotest --watch \n');

require('readline')
    .createInterface(process.stdin, process.stdout)
    .question("Press [Enter] to exit...", function(){
        process.exit();
});