snapshottr
==========

a simple html snap-shotting utility


### Intro
Snapshottr is a simple html capture engine to build 'window views' of webpages.

```js
var SnapShottr = require('snapshottr');

var snap = snap('<h1 class="title">Hello world</h1>');
snap.appendCss('h1 { font-size: 3em; }');

snap.view();
//=> <style>h1 { font-size: 3em; }</style><h1 class="title">Hello there!</h1>
```

Or with jquery style selectors..
```js
var SnapShottr = require('snapshottr');

var snap = SnapShottr('<div>not this one!</div><div class="other">this one!</div>', '.other');
snap.appendCss('.other { color: #FFFFFF; }');
snap.replaceCss('.other { color: #000000; }');

snap.view();
//=> <style>.other { .other { color: #000000; }</style><div class="other">this one!</h1>
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
    mocha
```

