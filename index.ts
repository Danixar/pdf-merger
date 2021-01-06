import { PDFDocument } from 'pdf-lib';
import * as fs from 'fs';

const merge = async (name: string, ...pdfs: string[]) => {
	console.log('starting');
	if (pdfs.length < 2) throw new Error('Invalid numnber of arguments');

	console.log('creating pdf');
	const doc = await PDFDocument.create();

	console.log('looping');
	for (const pdfName of pdfs) {
		console.log(`looping: ${pdfName}`);
		const pdf = await PDFDocument.load(fs.readFileSync(pdfName));
		const content = await doc.copyPages(pdf, pdf.getPageIndices());
		content.forEach(doc.addPage);
	}

	console.log('writing file');
	fs.writeFileSync(`./${name}`, await doc.save());
};

try {
	const name = process.argv[2];
	const pdfs = process.argv.slice(3);
	merge(name, ...pdfs);
} catch (err) {
	console.error(err);
}
