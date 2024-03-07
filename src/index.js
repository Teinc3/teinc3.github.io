// This file runs agenda.js, book.js, blog.js, etc.
// These files will output the HTML correspondingly, and create directories for each file in /dist
// Just an entry point for the build process

require('./agenda.js')

// Quit the process with exit code 0 once the build is done
process.exit(0);