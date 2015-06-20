javascript:(function(){

	// lyrics are embedded into the page via a javascript file - get it's location
    var filepath = "http://www.utamap.com/" + $($("script[language=\"javascript\"")[0]).attr("src");

    $.get(filepath, extractAndDisplay, "text");
})();

function extractAndDisplay(data) {

    var lines = extractTextFromPage(data);

    displayTextInNewWindow(lines);
}

function extractTextFromPage(data) {

    var regex = /context2.fillText\(\'([^)]+)\'/g;

    var lines = [];
    while (line = regex.exec(data))
        lines.push(line[1]);

    return lines;
}

function displayTextInNewWindow(lines) {

    var w = window.open();

    $(w.document.body).append("<p>");

    for (var i = 0; i < lines.length; i++)
        $(w.document.body).append(lines[i] + "<br>");

    $(w.document.body).append("</p>");
}