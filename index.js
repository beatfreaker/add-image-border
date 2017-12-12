const fs = require('fs');
const path = require('path');
const sizeOf = require('image-size');
const randomInt = require('random-int');
const Canvas = require('canvas');
const objectAssign = require('object-assign');

const paintCanvasBG = (ctx, opts) => {
	ctx.fillStyle = opts.background;
	ctx.fillRect(0, 0, opts.canvasW, opts.canvasH);
};

const drawImage = (image, ctx, opts) => {
	ctx.drawImage(image, opts.bordersize, opts.bordersize);
};

const getFileName = image => {
	const fileExtn = path.extname(image);
	const fileName = path.basename(image, fileExtn);
	const destFileName = `${fileName}_${randomInt(100, 99999)}_withborder${fileExtn}`;
	return destFileName;
};

const generateFinalImage = (dataURL, image, opts) => {
	const data = dataURL.replace(/^data:image\/\w+;base64,/, ''); // https://stackoverflow.com/questions/28832429/how-do-you-save-an-image-passed-in-as-a-base64-encoded-string-with-node-js
	const buf = Buffer.from(data, 'base64');
	const finalFileDest = path.join(opts.destinationPath, getFileName(image));
	fs.writeFile(finalFileDest, buf);
	console.log(`Done process ${image}`);
};

const addBorder = (image, opts) => {
	const imgData = fs.readFileSync(image);
	const imgDimensions = sizeOf(image);
	const img = new Canvas.Image();
	img.src = imgData;
	opts.canvasW = imgDimensions.width + (opts.bordersize * 2);
	opts.canvasH = imgDimensions.height + (opts.bordersize * 2);
	const canvas = new Canvas(opts.canvasW, opts.canvasH);
	const ctx = canvas.getContext('2d');
	paintCanvasBG(ctx, opts);
	drawImage(img, ctx, opts);
	const dataURL = canvas.toDataURL();
	generateFinalImage(dataURL, image, opts);
};

module.exports = function (images, opts) {
	opts = objectAssign({background: '#FFFFFF', bordersize: '150'}, opts);

	if (!fs.existsSync(opts.destinationPath)) {
		opts.destinationPath = '';
	}

	images.forEach(image => {
		addBorder(image, opts);
	});
};
