const fs = require('fs');
const path = require('path');
const { makeHtml, getDate, injectPagination } = require('./utils');

const ARTICLES_PER_PAGE = 8;

const REGEX_GENRE = /(?:^|\n)\s*[\*_]*Genre[\*_]*:\s*([^\n\*_<]+)/i;
const REGEX_GENRE_FALLBACK = /^genre:\s*(.+)$/mi;
const REGEX_FIRST_PUBLISHED = /(?:^|\n)\s*[\*_]*First [pP]ublished[\*_]*:\s*(\d{1,2}\/\d{1,2}\/\d{4})/i;
const REGEX_PREVIEW_CLEAN = /^\s*#.*$|^\s*[\*_]*(?:Last [uU]pdated|Date|First [pP]ublished|Genre)\s*[:\-].*$/gm;
const REGEX_FRONTMATTER = /^---\r?\n[\s\S]*?\r?\n---\r?\n?/;

const blogsSourcePath = path.join(__dirname, '../markdowns/blogs');
const blogsDistPath = path.join(__dirname, '../dist/blogs');
if (!fs.existsSync(blogsDistPath)) {
    fs.mkdirSync(blogsDistPath, { recursive: true });
}

const templateHtml = fs.readFileSync(path.join(__dirname, '../template.html'), 'utf8');

function getUpdatedKey(fileContent) {
    const m1 = fileContent.match(/\*\s*Last\s+Updated\s*:\s*(\d{1,2})\/(\d{1,2})\/(\d{4})\s*\*/i);
    if (m1) return `${m1[3]}-${m1[2].padStart(2, '0')}-${m1[1].padStart(2, '0')}`;
    // Support more metadata keys and quoted ISO dates commonly used by GitJournal/YAML
    const m2 = fileContent.match(/^(?:modified|updated|last_modified|date):\s*["']?(\d{4}-\d{2}-\d{2})/mi);
    return m2 ? m2[1] : null;
}

function keyToTime(key) {
    if (!key) return null;
    const [y, m, d] = key.split('-');
    return getDate(`${d}${m}${y}`).getTime();
}

// Read all markdown files in the source directory
let files = fs.readdirSync(blogsSourcePath);
files = files.filter(file => file.endsWith('.md'));

// Sort the files according to their last-updated date (newest first)
files = files.sort((a, b) => {
    const aPath = path.join(blogsSourcePath, a);
    const bPath = path.join(blogsSourcePath, b);
    const aContent = fs.readFileSync(aPath, 'utf8');
    const bContent = fs.readFileSync(bPath, 'utf8');

    const aTime = keyToTime(getUpdatedKey(aContent)) ?? fs.statSync(aPath).mtime.getTime();
    const bTime = keyToTime(getUpdatedKey(bContent)) ?? fs.statSync(bPath).mtime.getTime();
    return bTime - aTime;
});

// Loop through the files in batches of ARTICLES_PER_PAGE
for (let i = 0; i < files.length; i += ARTICLES_PER_PAGE) {
    const filesBatch = files.slice(i, i + ARTICLES_PER_PAGE);

    // Create a list of the files and get their properties.
    const filesList = filesBatch.map(file => {
        const fileSourcePath = path.join(blogsSourcePath, file);
        let fileContent = fs.readFileSync(fileSourcePath, 'utf8');
        const key = getUpdatedKey(fileContent); // Remove frontmatter

        // Extract Genre and First Published
        const genreMatch = fileContent.match(REGEX_GENRE) || fileContent.match(REGEX_GENRE_FALLBACK);
        const genre = genreMatch ? genreMatch[1].trim() : null;
        const fpMatch = fileContent.match(REGEX_FIRST_PUBLISHED);
        const firstPublished = fpMatch ? fpMatch[1] : null;
        fileContent = fileContent.replace(REGEX_FRONTMATTER, '');
        const previewText = fileContent.replace(REGEX_PREVIEW_CLEAN, '');
        const filePreview = makeHtml(previewText, {
            removeHtmlTags: true,
            trimCharCount: 170,
        });
        
        // Get details from file's content
        // Blog name: find first non-empty line + remove the # + trim
        const firstLine = fileContent.split('\n').find(l => l.trim().length > 0) || '';
        const blogName = firstLine.replace(/\#/g, '').trim();

        // Last-updated date: explicit marker > frontmatter modified > mtime
        // key is expected in 'YYYY-MM-DD' format; convert to 'DDMMYYYY'
        const mtime = fs.statSync(fileSourcePath).mtime;
        const blogDate = key
            ? `${key.slice(8, 10)}${key.slice(5, 7)}${key.slice(0, 4)}`
            : `${String(mtime.getDate()).padStart(2, '0')}${String(mtime.getMonth() + 1).padStart(2, '0')}${mtime.getFullYear()}`;


        // Count the number of words in the file and estimate the reading time (200 words per minute)
        const estimated = Math.ceil(fileContent.split(' ').length / 200);

        // Create the HTML file for each markdown file
        const htmlContent = templateHtml.replace('<!--ROOT-->', makeHtml(fileContent));
        const htmlDistPath = path.join(blogsDistPath, file.replace('.md', ''));
        if (!fs.existsSync(htmlDistPath)) {
            fs.mkdirSync(htmlDistPath, { recursive: true });
        }
        fs.writeFileSync(path.join(htmlDistPath, 'index.html'), htmlContent);

        return { file, blogName, blogDate, filePreview, estimated, genre, firstPublished };
    });

    // Create a directory for each batch of files and output the HTML correspondingly
    const pageLink = path.join(blogsDistPath, (i / ARTICLES_PER_PAGE + 1).toString());

    let pageHtml = templateHtml.replace('<!--ROOT-->', filesList.map(file => {
        const fileName = file.file.replace('.md', '');
        
        const fileDate = getDate(file.blogDate);
        const fpubHtml = file.firstPublished ? ` | Published: ${file.firstPublished}` : '';
        const genreHtml = file.genre ? ` | Genre: ${file.genre}` : '';

        return `<div>
            <a href="/blogs/${fileName}"><h2>${file.blogName}</h2></a>
            <p>Last Updated: ${fileDate.toLocaleDateString('en-GB')}${fpubHtml}${genreHtml} | ${file.estimated} min read</p>
            <p>${file.filePreview} <a href="/blogs/${fileName}">Read more</a></p>
        </div>`;
    }).join('\n<hr>\n'));

    // Inject pagination into sidebar
    const currentPage = i / ARTICLES_PER_PAGE + 1;
    const totalPages = Math.ceil(files.length / ARTICLES_PER_PAGE);
    
    pageHtml = injectPagination(pageHtml, currentPage, totalPages, 'blogs', 'Blogs');

    if (!fs.existsSync(pageLink)) {
        fs.mkdirSync(pageLink, { recursive: true });
    }

    fs.writeFileSync(path.join(pageLink, 'index.html'), pageHtml);
}