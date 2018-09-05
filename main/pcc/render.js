const fs = require("fs");
const showdown = require("showdown"),
  converter = new showdown.Converter({ tables: true });
const { getSheet } = require("./sheet");
const TABLERANGE = "Sheet1!A1:H6"
const fetchSpeaker = getSheet(
  "1oZQ8dgH3R_mKXWptmYdbZtUeOsXwdlxmz0sIUpx06DU",
  TABLERANGE
).then(res => {
  console.log('retriving', TABLERANGE)
  console.log('got speakers data', res)
  return res
}).then(aggregateSpeakers);
function newTabLink(html) {
  return html.replace(
    /<a href/g,
    `<a rel="noopener noreferrer" target="_blank" href`
  );
}

function readString(file) {
  return fs.readFileSync(file).toString();
}

function rerender() {
  // routing components
  const index = readString("./src/index.html");
  const speakers = readString("./src/speakers.html");
  // common components
  const head = readString("./src/Components/head.html");
  const nav = readString("./src/Components/nav.html");
  const autoreload = readString("./src/Components/autoreload.html");

  // individual components
  const home = newTabLink(
    converter.makeHtml(readString("./src/Components/home.md"))
  );
  // const speakerdata = Papa.parse(readString("./assets/speaker.csv"), {
  //   header: true
  // }).data;
  const newindex = appendCommon({ html: index, head, nav, autoreload }).replace(
    /<!-- Content Here -->/,
    home
  );
  fs.writeFileSync("./index.html", newindex);
  fetchSpeaker
    .then(speakerdata => {
      const newspeakers = appendCommon({
        html: speakers,
        head,
        nav,
        autoreload
      }).replace(/<!-- Speakers -->/, speakerInfo(speakerdata));
      fs.writeFileSync(
        "./assets/speakerdata.json",
        JSON.stringify(speakerdata)
      );
      fs.writeFileSync("./speakers.html", newspeakers);
      console.log("rerendered");
    })
    .catch(e => console.error(e));
}

function appendCommon({ html, head, nav, autoreload }) {
  return html
    .replace("</head>", head + "</head>")
    .replace("<body>", "<body>" + nav)
    .replace("</body>", autoreload + "</body>");
}

function speakerInfo(speakers) {
  const template = readString("./src/Components/speakertemplate.html");
  return speakers
    .map(data =>
      Object.keys(data).reduce(
        (prev, curr) =>
          prev.replace(
            new RegExp(`{${curr}}`, "g"),
            data[curr] ? data[curr].replace(/\n/g, "<br>") : ""
          ),
        template
      )
    )
    .join("\n");
}

function aggregateSpeakers(arr) {
  const keys = arr[0];
  const data = arr.slice(1);
  return data.map(speaker => {
    return keys.reduce((prev, curr, i) => {
      return { ...prev, [curr]: speaker[i] };
    }, {});
  });
}
if (process.argv[2] === "watch") {
  fs.watch("./src", { recursive: true }, (evtype, filename) => {
    console.log(evtype, filename);
    if (evtype === "change") {
      rerender();
    }
  });
  console.log("listening");
}
rerender();
