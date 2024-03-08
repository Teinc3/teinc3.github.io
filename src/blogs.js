const fs = require('fs');
const path = require('path');
const { makeHtml, getDate } = require('./utils');

const blogsSourcePath = path.join(__dirname, '../markdowns/blogs');
const blogsDistPath = path.join(__dirname, '../dist/blogs');
if (!fs.existsSync(blogsDistPath)) {
    fs.mkdirSync(blogsDistPath, { recursive: true });
}

const templateHtml = fs.readFileSync(path.join(__dirname, '../template.html'), 'utf8');

// Read all markdown files in the source directory
let files = fs.readdirSync(blogsSourcePath);
files = files.filter(file => file.endsWith('.md'));

// Sort the files according to their creation date
files = files.sort((a, b) => {
    return fs.statSync(path.join(blogsSourcePath, b)).birthtime.getTime() - fs.statSync(path.join(blogsSourcePath, a)).birthtime.getTime();
});

// Loop through the files in batches of 10
for (let i = 0; i < files.length; i += 10) {
    const filesBatch = files.slice(i, i + 10);

    // Create a list of the files and get their properties.
    const filesList = filesBatch.map(file => {
        const fileSourcePath = path.join(blogsSourcePath, file);
        const fileContent = fs.readFileSync(fileSourcePath, 'utf8');
        const filePreview = makeHtml(fileContent, {
            removeHtmlTags: true,
            trimCharCount: 100,
        });
        
        // Get details from file's content
        // Blog name: first line + remove the # + trim
        const blogName = fileContent.split('\n')[0].replace(/\#/g, '').trim();
        // Blog date
        const blogDate = fileContent.split('\n')[1].replace(/[^0-9\/]/g, '').split('/').map((item, index) => {
            return index !== 2 ? item = item.padStart(2, '0') : item;
        }).join('');

        // Count the number of words in the file and estimate the reading time (200 words per minute)
        const estimated = Math.ceil(fileContent.split(' ').length / 200);

        // Create the HTML file for each markdown file
        const htmlContent = templateHtml.replace('<!--ROOT-->', makeHtml(fileContent));
        const htmlDistPath = path.join(blogsDistPath, file.replace('.md', ''));
        if (!fs.existsSync(htmlDistPath)) {
            fs.mkdirSync(htmlDistPath, { recursive: true });
        }
        fs.writeFileSync(path.join(htmlDistPath, 'index.html'), htmlContent);

        return { file, blogName, blogDate, filePreview, estimated };
    });

    // Create a directory for each batch of files and output the HTML correspondingly
    const pageLink = path.join(blogsDistPath, (i / 10 + 1).toString());

    // Create the HTML content for the page
    const pageHtml = templateHtml.replace('<!--ROOT-->', filesList.map(file => {
        const fileName = file.file.replace('.md', '');
        
        const fileDate = getDate(file.blogDate);

        return `<div>
            <a href="/blogs/${fileName}"><h2>${file.blogName}</h2></a>
            <p>Last Updated: ${fileDate.toLocaleDateString('en-HK')} - ${file.estimated} min read</p>
            <p>${file.filePreview} <a href="/blogs/${fileName}">Read more</a></p>
        </div>`;
    }).join('\n<hr>\n'));

    if (!fs.existsSync(pageLink)) {
        fs.mkdirSync(pageLink, { recursive: true });
    }

    fs.writeFileSync(path.join(pageLink, 'index.html'), pageHtml);
}