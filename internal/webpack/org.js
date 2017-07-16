var org = require("org");
var loaderUtils = require("loader-utils");
const cheerio = require("cheerio");

module.exports = function(content) {
    const query = loaderUtils.getOptions(this) || {};
    var parser = new org.Parser({
        toc: false,
        tocHtml: false,
    });
    var orgDocument = parser.parse(content);
    var orgHTMLDocument = orgDocument.convert(org.ConverterHTML, {
        exportFromLineNumber: true,
        headerOffset: 1,
        suppressAutoLink: false,
        suppressSubScriptHandling: false,
    });
    this.value = content;

    const $ = cheerio.load( orgHTMLDocument.contentHTML );
    $("body h1").remove();
    return "module.exports = " + JSON.stringify($("body").html());
};
module.exports.seperable = true;
