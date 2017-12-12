import path from 'path';
import fs from 'fs';
import test from 'ava';
import fn from './';

test(t => {
	fn(['./resources/image.jpg'], {destinationPath: './resources'});
	let items = fs.readdirSync('./resources');
	items = items.filter(item => {
		const isGenerated = item.indexOf('withborder') > 0;
		if (isGenerated) {
			fs.unlinkSync(path.join('resources', item));
		}
		return isGenerated;
	});
	t.true(items.length > 0);
});
