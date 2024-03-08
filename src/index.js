// This file runs agenda.js, book.js, blog.js, etc.
// These files will output the HTML correspondingly, and create directories for each file in /dist
// Just an entry point for the build process

const fs = require('fs');
const path = require('path');

// Delete the dist directory and its contents, if it exists
const distPath = path.join(__dirname, '../dist');
if (fs.existsSync(distPath)) {
    fs.rmSync(distPath, { recursive: true, force: true });
}

// Start the build process
require('./home.js');
require('./agenda.js');
require('./books.js');
require('./blogs.js');

// Copy all assets to the dist directory
const assetsPath = path.join(__dirname, '../assets');
const distAssetsPath = path.join(__dirname, '../dist/assets');
fs.mkdirSync(distAssetsPath, { recursive: true });

fs.readdirSync(assetsPath).forEach((file) => {
    fs.copyFileSync(path.join(assetsPath, file), path.join(distAssetsPath, file));
});

// Copy 404.html to the dist directory
fs.copyFileSync(path.join(__dirname, '../404.html'), path.join(__dirname, '../dist/404.html'));

// Quit the process with exit code 0 once the build is done
console.log('Static build completed.')
process.exit(0);