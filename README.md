# add-image-border
Add border to image



| Before        | After          
| ------------- |:-------------:
| <img src="./resources/image.png" width="300" />     | <img src="./resources/final_image.png" width="300" />

## Install

```
$ npm install add-image-border --save
```

## Usage

```js
const addBorder = require('add-image-border');

addBorder(['image.png', 'image2.jpg'], {background: '#8c989f', bordersize: '150'});

```

## API

### addBorder([images], {options})

#### input

Type: `array`

List of file to be processed.

#### options

##### background

Type: `string`  
Default: #FFFFFF

Color of border.

##### borderSize

Type: `string`  
Default: 150

Border width in px.

#### Note

This module uses [canvas](https://www.npmjs.com/package/canvas) module as dependency which requires `Cairo` check [here](https://www.npmjs.com/package/canvas#installation) how to install it.


## License

MIT © [beatfreaker](https://beatfreaker.github.io)
