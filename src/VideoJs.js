import * as React from "react";
import videojs from "video.js";

// Styles
import "video.js/dist/video-js.css";

const initialOptions = {
  controls: true,
  fluid: true,
  controlBar: {
    volumePanel: {
      inline: false,
    },
  },
};

const VideoJs = ({ options }) => {
  const videoNode = React.useRef();
  const player = React.useRef();

  React.useEffect(() => {
    player.current = videojs(videoNode.current, {
      ...initialOptions,
      ...options,
    }).ready(function () {
      let track1 = new videojs.AudioTrack({
        id: "my-spanish-audio-track1",
        kind: "translation",
        label: "Spanish",
        language: "es",
        enabled: true,
      });
      let track2 = new videojs.AudioTrack({
        id: "my-spanish-audio-track2",
        kind: "translation",
        label: "Eng",
        language: "en",
        enabled: true,
      });
      let track3 = new videojs.AudioTrack({
        id: "my-spanish-audio-track3",
        kind: "translation",
        label: "tamil",
        language: "tr",
        enabled: true,
      });
      const audio = new Audio();

      this.audioTracks().addTrack(track1);
      this.audioTracks().addTrack(track2);
      this.audioTracks().addTrack(track3);
      const pp = this;
      console.log("onPlayerReady", this.audioTracks());
      let audioTrackList = this.audioTracks();

      // Listen to the "change" event.
      audioTrackList.addEventListener("change", function () {
        const syncTime = (player, audio) => {
          const time = player.currentTime();
          audio.currentTime = time;
        };
        // Log the currently enabled AudioTrack label.
        for (let i = 0; i < audioTrackList.length; i++) {
          let track = audioTrackList[i];
          console.log(track);

          if (track.enabled) {
            console.log(pp, this);

            videojs.log(track.label);
            console.log("A new " + track.label + " has been enabled!", {
              label: track.label,
              language: track.language,
              id: track.id,
              kind: track.kind,
            });
            console.log(document.getElementById(track.id).src);
            audio.src = document.getElementById(track.id).src;
            console.log(audio, pp);
            pp.pause();
            pp.play();
            return;
          }
          pp.on("play", () => {
            syncTime(pp, audio);
            if (audio.paused) audio.play();
          });
          pp.on("pause", () => {
            syncTime(pp, audio);
            if (!audio.paused) audio.pause();
          });
          pp.on("seeked", () => {
            if (!pp.paused()) pp.pause();
            pp.one("canplay", () => {
              const sync = () => {
                syncTime(pp, audio);
                audio.removeEventListener("canplay", sync);
                if (pp.paused()) pp.play();
              };
              audio.addEventListener("canplay", sync);
            });
          });
          pp.on("volumechange", () => {
            if (pp.muted()) {
              audio.muted = true;
            } else {
              audio.muted = false;
              audio.volume = pp.volume();
            }
          });
        }
      });
    });
    return () => {
      if (player.current) {
        player.current.dispose();
      }
    };
  }, [options]);

  return (
    <>
      <video ref={videoNode} id="vdo" className="video-js" controls>
        <source
          id="my-spanish-audio-track1"
          src="https://www.tunepocket.com/wp-main/uploads/TunePocket-May-The-Fun-Be-With-You-30-Sec-Preview.mp3"
          type="audio/mp3"
        />
        <source
          id="my-spanish-audio-track2"
          src="https://www.tunepocket.com/wp-main/uploads/TunePocket-Middle-East-Journey-30-Sec-Preview.mp3"
          type="audio/mp3"
        />
        <source
          id="my-spanish-audio-track3"
          src="https://www.tunepocket.com/wp-main/uploads/TunePocket-Lucky-30-Sec-Preview.mp3"
          type="audio/mp3"
        />
      </video>
    </>
  );
};

export default VideoJs;
