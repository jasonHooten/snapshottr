snapshottr
==========

a simple html snap-shotting utility


### Intro
Snapshottr is a simple html capture engine to build 'window views' of webpages.

```js
var snapshottr = require('snapshottr'),
    var snap = new snapshottr.SnapShottr();

snap = snapshottr.load('<h1 class="title">Hello world</h2>');
snap.appendCss('h1 { font-size: 3em; }');

snap.view();
//=> <style>h1 { font-size: 3em; }</style><h1 class="title welcome">Hello there!</h2>
```

### Tech
Snapshottr is built on top of the following technologies

* Nodejs
* Cheerio


### Install

```
    git clone git@github.com:jasonHooten/snapshottr.git
    cd snapshottr
    npm install
    node app.js
```

