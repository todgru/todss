"use strict";

const { toXML } = require("jstoxml");
const NodeID3 = require("node-id3");
const fs = require("fs");
const path = require("path");
const XML_OPTIONS = {
  header: true,
  indent: "	",
};

// user editable constants
const PODCAST_FEED_EMAIL = "me@example.com";
const PODCAST_FEED_AUTHOR = "Example Author";
const PODCAST_FEED_DESCRIPTION = "Example description";
const PODCAST_FEED_LANGUAGE = "en-US";
const PODCAST_FEED_URL = "https://example.com";
const MP3_URL = "https://example.com/path/to/mp3s/";
const MP3_PATH = "mp3/";
const RSS_PATH = "rss/";

//
// Create podcast xml files based on mp3 directory and files
//
const normalizedPath = path.join(__dirname, MP3_PATH);
const mp3Directories = fs.readdirSync(normalizedPath);

const formatItem = (file, i) => {
  const mp3Url = `${MP3_URL}${file}`;
  const tags = NodeID3.read(`${normalizedPath}/${file}`);

  const item = {
    "itunes:episodeType": "full",
    "itunes:explicit": "no",
    "itunes:subtitle": "",
    "itunes:title": tags.title,
    description: tags.album,
    link: "", // @todo what is "link"?
    // @todo make pubDate an appropriate date
    pubDate: `Tue, ${i + 1} Jan ${tags.raw.TYER || "2022"} 12:00:00 GMT`,
    title: file,
    guid: {
      _attrs: { isPermaLink: "true" },
      _content: mp3Url,
    },
    enclosure: {
      _attrs: {
        url: mp3Url,
        type: "audio/mpeg", // @todo verify
        length: "1234", // @todo determine
      },
    },
  };
  return { item };
};

mp3Directories.forEach(artist => {
  const PATH = RSS_PATH + artist;
  if (!fs.existsSync(PATH)) fs.mkdirSync(PATH);

  // @todo read subdirctories in the "mp3" path should be smarter; dir vs file
  if (artist === ".gitkeep") return;
  const files = fs.readdirSync(MP3_PATH + artist);
  const mp3s = files.filter(file => path.extname(MP3_PATH + file).toLowerCase() === ".mp3");

  const items = mp3s.map((file, i) => formatItem(`${artist}/${file}`, i));
  const rss = [
    {
      _name: "rss",
      _attrs: {
        version: "2.0",
        "xmlns:itunes": "http://www.itunes.com/dtds/podcast-1.0.dtd",
        "xmlns:content": "http://purl.org/rss/1.0/modules/content/",
      },
      _content: {
        channel: [
          {
            title: artist,
            "itunes:owner": { "itunes:email": PODCAST_FEED_EMAIL },
            "itunes:author": PODCAST_FEED_AUTHOR,
            description: PODCAST_FEED_DESCRIPTION,
            language: PODCAST_FEED_LANGUAGE,
            link: PODCAST_FEED_URL,
          },
          items,
        ],
      },
    },
  ];

  const result = toXML(rss, XML_OPTIONS);
  fs.writeFileSync(`${PATH}/index.xml`, result);
});

// @todo write podcast list to "/index.html" or some simliar path
// mp3Directories.forEach(artist => {
//   const indexFile = // collection of artist podcasts available for subscription.
//   const rssPath = RSS_PATH + artist;
//   fs.writeFileSync(`${rssPath}/index.html`, indexFile);
// });
