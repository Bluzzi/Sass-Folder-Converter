# Sass Folder Converter

Allows you to simply convert folders containing Sass files to CSS to another folder.

## Installation 
This is a [Node.js](https://nodejs.org) module available through the [NPM registry](https://www.npmjs.com/).

Use the following NPM command to install the package:
```markdown
npm install sass-folder-converter
```

## Exemple
```js
const convertSass = require("sass-folder-converter");
```

Simply:
```js
convertSass(__dirname + "/sass/", __dirname + "/css/");
```

Or custom...
```js
convertSass(
    __dirname + "/sass/", // your Sass folder
    __dirname + "/css/", // the CSS destination folder
    "expanded", // optional, output style "compressed" or "expanded"
    true // optional, if true, this create the destination folder if it doesn't exist
);
```