var snapshottr = require("./lib/SnapShottr");

console.log('===Snap Shottr===');
var snap = new snapshottr.SnapShottr();
snap.load('<h2 class="title">Hello world</h2>');
console.log(snap.view());

console.log('#1 ===add 1 css===');
snap.appendCss('h1 { font-size: 3em; }');
console.log(snap.view());

console.log('#2 ===add 2 css===');
snap.appendCss('h2 { font-size: 3em; }', 'h3 { font-size: 3em; }');
console.log(snap.view());


console.log('#3 ===replace 2 css===');
snap.replaceCss('h4 { font-size: 3em; }', 'h5 { font-size: 3em; }');
console.log(snap.view());


console.log('#4 ===replace 2 css, remove style tag===');
snap.replaceCss('<style>h4 { font-size: 3em; }', 'h5 { font-size: 3em; }</style>');
console.log(snap.view());


require('readline')
    .createInterface(process.stdin, process.stdout)
    .question("Press [Enter] to exit...", function(){
        process.exit();
});