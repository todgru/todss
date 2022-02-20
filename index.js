"use strict";

const { toXML } = require("jstoxml");

/*
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
    xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">
  <channel>
    <title>Dafna's Zebra Podcast</title>
    <itunes:owner>
        <itunes:email>dafna@example.com</itunes:email>
    </itunes:owner>
    <itunes:author>Dafna</itunes:author>
    <description>A pet-owner's guide to the popular striped equine.</description>
    <itunes:image href="https://www.example.com/podcasts/dafnas-zebras/img/dafna-zebra-pod-logo.jpg"/>
    <language>en-us</language>
    <link>https://www.example.com/podcasts/dafnas-zebras/</link>
    <item>
      <title>Top 10 myths about caring for a zebra</title>
      <description>Here are the top 10 misunderstandings about the care, feeding, and breeding of these lovable striped animals.</description>
      <pubDate>Tue, 14 Mar 2017 12:00:00 GMT</pubDate>
      <enclosure url="https://www.example.com/podcasts/dafnas-zebras/audio/toptenmyths.mp3"
                 type="audio/mpeg" length="34216300"/>
      <itunes:duration>30:00</itunes:duration>
      <guid isPermaLink="false">dzpodtop10</guid>
    </item>
    <item>
      <title>Keeping those stripes neat and clean</title>
      <description>Keeping your zebra clean is time consuming, but worth the effort.</description>
      <pubDate>Fri, 24 Feb 2017 12:00:00 GMT</pubDate>
      <enclosure url="https://www.example.com/podcasts/dafnas-zebras/audio/cleanstripes.mp3"
                 type="audio/mpeg" length="26004388"/>
      <itunes:duration>22:48</itunes:duration>
      <guid>dzpodclean</guid>
    </item>
  </channel>
</rss>
*/

const xmlOptions = {
  header: false,
  indent: "  ",
};

const rss = {
  _name: "rss",
  _content: {
    channel: {
      title: "foo",
      "itunes:owner": {
        "itunes:email": "me@todgru.com",
      },
      "itunes:author": "me",
      description: "test",
      "itunes:image": "https://www.example.com/podcasts/dafnas-zebras/img/dafna-zebra-pod-logo.jpg",
      language: "en-us",
      link: "https://www.example.com/podcasts/dafnas-zebras/",
      item: [
        {
          title: "Top 10 myths about caring for a zebra",
          description:
            "Here are the top 10 misunderstandings about the care, feeding, and breeding of these lovable striped animals.",
          pubDate: "Tue, 14 Mar 2017 12:00:00 GMT",
          enclosure: {
            _attrs: {
              url: "https://www.example.com/podcasts/dafnas-zebras/audio/toptenmyths.mp3",
              type: "audio/mpeg",
              length: "34216300",
            },
          },
          // <itunes:duration>30:00</itunes:duration>
          // <guid isPermaLink="false">dzpodtop10</guid>
        },
      ],
      // </item>
      // <item>
      //   <title>Keeping those stripes neat and clean</title>
      //   <description>Keeping your zebra clean is time consuming, but worth the effort.</description>
      //   <pubDate>Fri, 24 Feb 2017 12:00:00 GMT</pubDate>
      //   <enclosure url="https://www.example.com/podcasts/dafnas-zebras/audio/cleanstripes.mp3"
      //              type="audio/mpeg" length="26004388"/>
      //   <itunes:duration>22:48</itunes:duration>
      //   <guid>dzpodclean</guid>
      // </item>
    },
  },
  _attrs: {
    version: "2.0",
    "xmlns:itunes": "http://www.itunes.com/dtds/podcast-1.0.dtd",
  },
};

const result = toXML(rss, xmlOptions);
console.log(result);
