javascript:(function(){

    // lyrics are embedded into the page via a javascript file - get it's location
    var filepath = "http://www.utamap.com/" + $($("script[language=\"javascript\"")[0]).attr("src");

    $.get(filepath, showLyrics, "text");
})();

function showLyrics(data) {

    var lines = extractLyricsFromScript(data);

    showLyricsInNewWindow(lines);
}

function extractLyricsFromScript(data) {

    var lines = [];

    // Extract all instances of: everything after the first apostrophe in the fillText method arguments until the closing bracket and semi-colon
    var regex = /context2.fillText\(\'(.+?(?=\);))/g;

    var line;
    while (line = regex.exec(data))
        // Text may contain escaped apostrophes, so get all text up to the last apostrophe to be sure that all of the text is captured
        lines.push(line[1].substring(0, line[1].lastIndexOf("'")));

    return lines;
}

function showLyricsInNewWindow(lines) {

    var w = window.open();

    for (var i = 0; i < lines.length; i++)
        // Text may contain escaped apostrophes, so remove all instances of the escape character
        $(w.document.body).append(lines[i].replace(/\\'/, "'") + "<br>");
}