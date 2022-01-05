import React from "react";
import VideoJS from "./VideoJs";

function App() {
  const playerRef = React.useRef(null);

  const videoJsOptions = {
    // lookup the options in the docs for more options
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    muted: true,
    sources: [
      {
        src: "https://vjs.zencdn.net/v/oceans.mp4",
        type: "video/mp4",
      },
      // {
      //   src: "https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8",
      //   type: "application/x-mpegURL",
      // },
    ],
    tracks: [
      {
        kind: "subtitles",
        srclang: "en",
        src: "https://kot-politiken.s3-eu-west-1.amazonaws.com/2019/114_en.vtt.txt",
        default: true,
      },
      {
        kind: "captions",
        srclang: "ja",
        src: "http://solutions.brightcove.com/bcls/assets/captions/intro-vcs-jp.vtt",
        default: false,
      },
    ],
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // you can handle player events here
    player.on("waiting", () => {
      console.log("player is waiting");
    });

    player.on("dispose", () => {
      console.log("player will dispose");
    });
  };

  return (
    <>
      <div>Rest of app here</div>

      <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />

      <div>Rest of app here</div>
    </>
  );
}

export default App;
