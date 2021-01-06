import { PDFDocument } from 'pdf-lib';
import * as fs from 'fs';

const merge = async (name: string, ...pdfs: string[]) => {
	if (pdfs.length < 2) throw new Error('Invalid numnber of arguments');

	const doc = await PDFDocument.create();

	for (const pdfName of pdfs) {
		const pdf = await PDFDocument.load(fs.readFileSync(pdfName));
		const content = await doc.copyPages(pdf, pdf.getPageIndices());
		content.forEach(doc.addPage);
	}

	fs.writeFileSync(`./${name}`, await doc.save());
};

try {
	const name = process.argv[2];
	const pdfs = process.argv.slice(3);
	merge(name, ...pdfs);
} catch (err) {
	console.error(err);
}
