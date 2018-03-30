javascript:(function(){

    // Lyrics are embedded into the page via a javascript file - get it's location
    var filepath = "http://www.utamap.com/" + $($("script[language=\"javascript\"")[0]).attr("src");

    $.get(filepath, showLyrics, "text");
})();

function showLyrics(data) {

    var lines = extractLyricsFromScript(data);

    showLyricsInNewWindow(lines);
}

function extractLyricsFromScript(data) {

    var lines = [];

    // Extract the full arguments list for every fillText function call (including the arguments after the text itself)
    var regex = /context2.fillText\(\'(.+?(?=\);))/g;

    var line;
    while (line = regex.exec(data))
        // Text may contain escaped apostrophes, so get all text up to the last apostrophe to be sure that it's all captured
        lines.push(line[1].substring(0, line[1].lastIndexOf("'")));

    return lines;
}

function showLyricsInNewWindow(lines) {

    var w = window.open();

    for (var i = 0; i < lines.length; i++)
        // Remove the escape character from escaped apostrophes
        $(w.document.body).append(lines[i].replace(/\\'/g, "'") + "<br>");
}