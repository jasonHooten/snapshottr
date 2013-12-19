snapshottr
==========

a simple html snap-shotting utility


### Intro
Snapshottr is a simple html capture engine to build 'window views' of webpages.

```js
var snapshottr = require('snapshottr'),
    snap = new snapshottr;

snap.load('<h1 class="title">Hello world</h1>');
snap.appendCss('h1 { font-size: 3em; }');

snap.view();
//=> <style>h1 { font-size: 3em; }</style><h1 class="title welcome">Hello there!</h1>
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

