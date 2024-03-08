const fs = require('fs');
const path = require('path');
const { makeHtml } = require('./utils');

const homeSourcePath = path.join(__dirname, '../markdowns/home');
const homeDistPath = path.join(__dirname, '../dist'); // Remember: home is the root directory
if (!fs.existsSync(homeDistPath)) {
    fs.mkdirSync(homeDistPath, { recursive: true });
}

const templateHtml = fs.readFileSync(path.join(__dirname, '../template.html'), 'utf8');

// Read all markdown files in the source directory
let files = fs.readdirSync(homeSourcePath);
files = files.filter(file => file.endsWith('.md'));

// Sort by alphabetical order of the file names (a first, z last)
files.sort();

// Loop through the files
let htmlContent = '';
for (let file of files) {
    const fileSourcePath = path.join(homeSourcePath, file);
    const fileContent = fs.readFileSync(fileSourcePath, 'utf8');

    htmlContent += makeHtml(fileContent);
    htmlContent += '\n<hr>\n';
}

if (htmlContent.endsWith('\n<hr>\n')) {
    htmlContent = htmlContent.substring(0, htmlContent.length - 6);
}

// Create the HTML content for the page
const pageHtml = templateHtml.replace('<!--ROOT-->', htmlContent);
fs.writeFileSync(path.join(homeDistPath, 'index.html'), pageHtml);