const fs = require('fs');
const path = require('path');
const makeHtml = require('./makeHtml');

const agendaSourcePath = path.join(__dirname, '../markdowns/agenda');
const agendaDistPath = path.join(__dirname, '../dist/agenda');

const templateHtml = fs.readFileSync(path.join(__dirname, '../template.html'), 'utf8');

// Read all markdown files in the source directory
let files = fs.readdirSync(agendaSourcePath);
files = files.filter(file => file.endsWith('.md'));

// Sort the files according to their last modification date
files = files.sort((a, b) => {
   return fs.statSync(path.join(agendaSourcePath, b)).mtime.getTime() - fs.statSync(path.join(agendaSourcePath, a)).mtime.getTime();
});

// Loop through the files in batches of 10
for (let i = 0; i < files.length; i += 10) {
    const filesBatch = files.slice(i, i + 10);

    // Create a list of the files and get their properties.
    const filesList = filesBatch.map(file => {
        const fileSourcePath = path.join(agendaSourcePath, file);
        const fileContent = fs.readFileSync(fileSourcePath, 'utf8');
        const fileDate = fs.statSync(fileSourcePath).mtime;
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

        return { file, fileDate, filePreview };
    });

    // Create a directory for each batch of files and output the HTML correspondingly
    const pageLink = path.join(agendaDistPath, (i / 10 + 1).toString());

    // Create the HTML content for the page
    const pageHtml = templateHtml.replace('<!--ROOT-->', filesList.map(file => {
        const fileName = file.file.replace('.md', '');
        return `<div>
            <a href="/agenda/${fileName}"><h2>Agenda for ${file.fileDate.toLocaleDateString('en-HK', { timeZone: "Asia/Shanghai" })}</h2></a>
            <p>${file.filePreview}</p>
            <a href="/agenda/${fileName}">Read more</a>
        </div>`;
    }).join('\n<hr>\n'));

    if (!fs.existsSync(pageLink)) {
        fs.mkdirSync(pageLink, { recursive: true });
    }

    fs.writeFileSync(path.join(pageLink, 'index.html'), pageHtml);
}