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
recursiveCopyDir(assetsPath, distAssetsPath);

// Copy 404.html to the dist directory
fs.copyFileSync(path.join(__dirname, '../404.html'), path.join(__dirname, '../dist/404.html'));

// Copy .well-known to the dist directory
const wellKnownPath = path.join(__dirname, '../.well-known');
const distWellKnownPath = path.join(__dirname, '../dist/.well-known');
recursiveCopyDir(wellKnownPath, distWellKnownPath);

// Quit the process with exit code 0 once the build is done
console.log('Static build completed.')
process.exit(0);

function recursiveCopyDir(src, dest) {
    fs.mkdirSync(dest, { recursive: true });

    var entries = fs.readdirSync(src, { withFileTypes: true });

    entries.forEach(function(entry) {
        var srcPath = path.join(src, entry.name);
        var destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            recursiveCopyDir(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    });
}