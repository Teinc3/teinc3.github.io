const showdown = require('showdown');
const showdownConfig = {
  disableForced4SpacesIndentedSublists: true,
};

// Define a custom extension
let myExtension = {
  type: 'output',
  regex: /<(\/)?strong>/g,
  replace: '<$1b>'
};

let myExtension2 = {
  type: 'output',
  regex: /<(\/)?em>/g,
  replace: '<$1i>'
};

// Add the extension to the converter
showdownConfig.extensions = [myExtension, myExtension2];

const converter = new showdown.Converter(showdownConfig);

function makeHtml(fileContent, options = {}) {
  const { removeHtmlTags, trimCharCount } = options;
  let htmlContent = converter.makeHtml(fileContent);

  if (removeHtmlTags) {
    htmlContent = htmlContent.replace(/<[^>]*>?/gm, '');
    htmlContent = htmlContent.replace(/<\s*script[^>]*>/gi, '');
    htmlContent = htmlContent.replace(/<\/\s*script\s*>/gi, '');
  }

  if (trimCharCount) {
    htmlContent = htmlContent.substring(0, trimCharCount).trim() + "...";
  }

  return htmlContent;
}

function getDate(ddmmyyyy) {
  return new Date(parseInt(ddmmyyyy.substring(4, 8)), parseInt(ddmmyyyy.substring(2, 4)) - 1, parseInt(ddmmyyyy.substring(0, 2)));
}

function injectPagination(htmlContent, currentPage, totalPages, basePath, labelText) {
  let paginationHtml = '';

  if (currentPage > 1) {
      paginationHtml += `<h3><a href="/${basePath}/${currentPage - 1}">View Newer ${labelText}</a></h3><hr>`;
  }
  if (currentPage < totalPages) {
      paginationHtml += `<h3><a href="/${basePath}/${currentPage + 1}">View Older ${labelText}</a></h3><hr>`;
  }

  if (paginationHtml) {
      return htmlContent.replace('<h2>Navigation</h2><hr>', `<h2>Other Articles</h2><hr>${paginationHtml}<h2>Navigation</h2><hr>`);
  }
  return htmlContent;
}

module.exports = {
  makeHtml,
  getDate,
  injectPagination
};
