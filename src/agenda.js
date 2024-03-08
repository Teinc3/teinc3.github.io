const fs = require('fs');
const path = require('path');
const { makeHtml, getDate } = require('./utils');

const agendaSourcePath = path.join(__dirname, '../markdowns/agenda');
const agendaDistPath = path.join(__dirname, '../dist/agenda');

const templateHtml = fs.readFileSync(path.join(__dirname, '../template.html'), 'utf8');

// Read all markdown files in the source directory
let files = fs.readdirSync(agendaSourcePath);
files = files.filter(file => file.endsWith('.md'));

// Sort the files according to their creation date (newest first)
files = files.sort((a, b) => {
    // Get the date from the file name
    const dateA = getDate(a.replace('.md', ''));
    const dateB = getDate(b.replace('.md', ''));
    return dateB.getTime() - dateA.getTime();
});

// Loop through the files in batches of 10
for (let i = 0; i < files.length; i += 10) {
    const filesBatch = files.slice(i, i + 10);

    // Create a list of the files and get their properties.
    const filesList = filesBatch.map(file => {
        const fileSourcePath = path.join(agendaSourcePath, file);
        const fileContent = fs.readFileSync(fileSourcePath, 'utf8');
        const filePreview = makeHtml(fileContent, {
            removeHtmlTags: true,
            trimCharCount: 100,
        });
        
        // Create the HTML file for each markdown file
        const htmlContent = templateHtml.replace('<!--ROOT-->', makeHtml(fileContent));
        const htmlDistPath = path.join(agendaDistPath, file.replace('.md', ''));
        if (!fs.existsSync(htmlDistPath)) {
            fs.mkdirSync(htmlDistPath, { recursive: true });
        }
        fs.writeFileSync(path.join(htmlDistPath, 'index.html'), htmlContent);

        return { file, filePreview };
    });

    // Create a directory for each batch of files and output the HTML correspondingly
    const pageLink = path.join(agendaDistPath, (i / 10 + 1).toString());

    // Create the HTML content for the page
    const pageHtml = templateHtml.replace('<!--ROOT-->', filesList.map(file => {
        const fileName = file.file.replace('.md', '');
        const fileDate = getDate(fileName);
        return `<div>
            <a href="/agenda/${fileName}"><h2>Agenda for ${fileDate.toLocaleDateString('en-HK')}</h2></a>
            <p>${file.filePreview} <a href="/agenda/${fileName}">Read more</a></p>
        </div>`;
    }).join('\n<hr>\n'));

    if (!fs.existsSync(pageLink)) {
        fs.mkdirSync(pageLink, { recursive: true });
    }

    fs.writeFileSync(path.join(pageLink, 'index.html'), pageHtml);
}