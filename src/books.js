const fs = require('fs');
const path = require('path');
const { makeHtml } = require('./utils');

const booksSourcePath = path.join(__dirname, '../markdowns/books');
const booksDistPath = path.join(__dirname, '../dist/books');
if (!fs.existsSync(booksDistPath)) {
    fs.mkdirSync(booksDistPath, { recursive: true });
}

const templateHtml = fs.readFileSync(path.join(__dirname, '../template.html'), 'utf8');

// Read books.md
const booksContent = fs.readFileSync(path.join(booksSourcePath, 'books.md'), 'utf8');
const booksHtml = templateHtml.replace('<!--ROOT-->', makeHtml(booksContent));
fs.writeFileSync(path.join(booksDistPath, 'index.html'), booksHtml);