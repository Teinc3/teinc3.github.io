const fs = require('fs');
const path = require('path');
const { makeHtml, getDate, injectPagination } = require('./utils');

const ARTICLES_PER_PAGE = 10;

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

// Loop through the files in batches of ARTICLES_PER_PAGE
for (let i = 0; i < files.length; i += ARTICLES_PER_PAGE) {
    const filesBatch = files.slice(i, i + ARTICLES_PER_PAGE);

    const filesList = filesBatch.map(file => {
        const fileSourcePath = path.join(agendaSourcePath, file);
        const fileContent = fs.readFileSync(fileSourcePath, 'utf8');
        // Remove title and date lines for cleaner preview
        const previewText = fileContent.replace(/^#.*$|^[\*_]*Date:.*$/gm, '');
        const filePreview = makeHtml(previewText, {
            removeHtmlTags: true,
            trimCharCount: 170,
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
    const pageLink = path.join(agendaDistPath, (i / ARTICLES_PER_PAGE + 1).toString());

    // Create the HTML content for the page
    let pageHtml = templateHtml.replace('<!--ROOT-->', filesList.map(file => {
        const fileName = file.file.replace('.md', '');
        const fileDate = getDate(fileName);
        return `<div>
            <a href="/agenda/${fileName}"><h2>Agenda for ${fileDate.toLocaleDateString('en-GB')}</h2></a>
            <p>${file.filePreview} <a href="/agenda/${fileName}">Read more</a></p>
        </div>`;
    }).join('\n<hr>\n'));

    // Inject pagination into sidebar
    const currentPage = i / ARTICLES_PER_PAGE + 1;
    const totalPages = Math.ceil(files.length / ARTICLES_PER_PAGE);
    
    pageHtml = injectPagination(pageHtml, currentPage, totalPages, 'agenda', 'Agendas');

    if (!fs.existsSync(pageLink)) {
        fs.mkdirSync(pageLink, { recursive: true });
    }

    fs.writeFileSync(path.join(pageLink, 'index.html'), pageHtml);
}