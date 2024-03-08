const showdown = require('showdown');
const showdownConfig = {
  noHeaderId: true,
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
  }

  if (trimCharCount) {
    htmlContent = htmlContent.substring(0, trimCharCount).trim() + "...";
  }

  return htmlContent;
}

function getDate(ddmmyyyy) {
  return new Date(parseInt(ddmmyyyy.substring(4, 8)), parseInt(ddmmyyyy.substring(2, 4)) - 1, parseInt(ddmmyyyy.substring(0, 2)));
}

module.exports = {
  makeHtml,
  getDate
};