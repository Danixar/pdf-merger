import { PDFDocument } from 'pdf-lib';
import * as fs from 'fs';

const merge = async (name: string, ...pdfs: string[]) => {
	if (pdfs.length < 2) throw new Error('Invalid number of arguments');

	const doc = await PDFDocument.create();

	console.log('looping');
	for (const pdfName of pdfs) {
		const pdf = await PDFDocument.load(fs.readFileSync(pdfName));
		const content = await doc.copyPages(pdf, pdf.getPageIndices());
		for (const page of content) {
			doc.addPage(page);
		}
	}

	fs.writeFileSync(`./${name}`, await doc.save());
	console.log(`${name} created`);
};

try {
	const name = process.argv[2];
	const pdfs = process.argv.slice(3);
	merge(name, ...pdfs);
} catch (err) {
	console.error(err);
}
