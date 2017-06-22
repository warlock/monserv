MONSERV : STATUS SERVER
===
>This project still in development

## INSTALL
```sh
git clone https://github.com/warlock/monserv.git
cd monserv
npm i
```

## STATS SERVER:
```sh
node monserve.js
```

## CLIENT/NODE:
```sh
node monode.js
```

## Web stats accesible with: http://localhost:3000

Change configuration in 'conf.js'

```js
module.exports = {
  key : "qtYwYVde5Cfjk",
  socket_port : 4568,
  http_port : 3000,
  server : "http://localhost"
}
```

## License
The MIT License (MIT)
Copyright (c) 2015 Josep Subils Rigau (josep@spellbook.io)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.