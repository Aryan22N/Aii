const PDFDocument = require('pdfkit');

const generateQuestionPaperPDF = (questionPaper, res) => {
    const doc = new PDFDocument({ margin: 50 });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
        'Content-Disposition',
        'attachment; filename=question-paper.pdf'
    );

    doc.pipe(res);

    // Title
    doc.fontSize(18).text('Generated Question Paper', { align: 'center' });
    doc.moveDown();

    // Questions
    doc.fontSize(12);
    questionPaper.questions.forEach((q, index) => {
        doc.text(`${index + 1}. ${q}`);
        doc.moveDown(0.5);
    });

    doc.end();
};

module.exports = generateQuestionPaperPDF;
