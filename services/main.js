const fetch = require("node-fetch");
const fs = require("fs");

// get readme file
var README = fs.readFileSync("./README.template.md", "utf-8");

// get lyrics
fetch("http://yuki.garden/api/yuki/lyric").then(res => {
    res.json().then(json => {
        // replace
        README = README.replace("{{lyric-zone}}", json.lyrics.split("\n").join("<br />\n"));
        README = README.replace("{{artist}}", json.artist);
        README = README.replace("{{title}}", json.title);

        README = README.replace("{{last-update}}", new Date().toLocaleString());
        README = README.replace("{{url}}", json.url);
        
        // save to readme
        fs.writeFileSync("./README.md", README);
    });
})
