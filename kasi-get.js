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

    // Extract the full arguments list for every fillText function call (including the arguments after the lyric itself)
    var regex = /context2.fillText\(\'(.+?(?=\);))/g;

    var line;
    while (line = regex.exec(data)) {

        // Text may contain escaped apostrophes, so get all text up to the last apostrophe to be sure that it's all captured
        var lyric = line[1].substring(0, line[1].lastIndexOf("'"));

        // Remove the escape character from escaped apostrophes
        var unescapedLyric = lyric.replace(/\\'/g, "'");

        lines.push(unescapedLyric);
    }

    return lines;
}

function showLyricsInNewWindow(lines) {

    var w = window.open();

    for (var i = 0; i < lines.length; i++)
        $(w.document.body).append(lines[i] + "<br>");
}