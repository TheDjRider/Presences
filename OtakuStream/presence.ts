var presence = new Presence({
    clientId: "639519044629692417",
    mediaKeys: false
 }),

  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

  var browsingStamp = Math.floor(Date.now()/1000);

  var title : any, views : any, air : any, air2 : any;
  var iFrameVideo : boolean, currentTime : any, duration : any, paused : any;

  var video : HTMLVideoElement, videoDuration : any, videoCurrentTime : any;

  var lastPlaybackState = null;
  var playback;
  var browsingStamp = Math.floor(Date.now()/1000);

  var user : any;
  var search : any;
  
  if(lastPlaybackState != playback) {
  
      lastPlaybackState = playback
      browsingStamp = Math.floor(Date.now()/1000)
        
  }

  

 
  presence.on("iFrameData", data => {

    playback = 
    data.iframe_video.duration !== null
      ? true : false

  if(playback) {

    iFrameVideo = data.iframe_video.iFrameVideo;
    currentTime = data.iframe_video.currTime;
    duration    = data.iframe_video.dur;
    paused      = data.iframe_video.paused;

  }
  
  });


presence.on("UpdateData", async () => {
var a =
        '',
        timestamps = getTimestamps(
          Math.floor(currentTime),
          Math.floor(duration)
        ),
        presenceData: presenceData = {
          largeImageKey: "otaku"
      };
    
      

if (document.querySelector("body > div.web-app > div.player-bg > div > div > div > div > div > article > div > header > h1") !== null) {
  if (iFrameVideo == true && !isNaN(duration)) {
    presenceData.smallImageKey = paused ? "pause" : "play";
    presenceData.smallImageText = paused ? (await strings).pause : (await strings).play;
    presenceData.startTimestamp = timestamps[0];
    presenceData.endTimestamp = timestamps[1];
    
    title = document.querySelector("body > div.web-app > div.player-bg > div > div > div > div > div > article > div > header > h1"); 
    presenceData.details = title.innerText;

    air = document.querySelector("body > div.web-app > div.home-bg > div > div > div.col-12.col-md-12.col-lg-9 > div > div > article > div > div:nth-child(1) > div.col-12.col-sm-6.col-lg-7 > div > div > table > tbody > tr:nth-child(4)");
    if (air !== null && !air.innerText.includes("AIRED")) {
      if (document.querySelector("body > div.web-app > div.home-bg > div > div > div.col-12.col-md-12.col-lg-9 > div > div > article > div > div:nth-child(1) > div.col-12.col-sm-6.col-lg-7 > div > div > table > tbody > tr:nth-child(5)") !== null) {
        air = document.querySelector("body > div.web-app > div.home-bg > div > div > div.col-12.col-md-12.col-lg-9 > div > div > article > div > div:nth-child(1) > div.col-12.col-sm-6.col-lg-7 > div > div > table > tbody > tr:nth-child(5)");
      }
    }
    
    if (air !== null) {
      presenceData.state = "Aired on: " + air.innerText.replace("AIRED :","");
    }
        
      if (paused) {
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
      }

  } else if (iFrameVideo == null && isNaN(duration)) {

     presenceData.startTimestamp = browsingStamp;
     presenceData.details = "Looking at: ";
     title = document.querySelector("body > div.web-app > div.player-bg > div > div > div > div > div > article > div > header > h1"); 
     presenceData.state = title.innerText;
     presenceData.smallImageKey = "reading";

  }
  
} else if (document.location.pathname.includes("/movie")) {
  presenceData.details = "Browsing through";
  presenceData.state = "all movies";
  presenceData.startTimestamp = browsingStamp;
} else if (document.location.pathname.includes("/anime")) {
  presenceData.details = "Browsing through";
  presenceData.state = "all animes";
  presenceData.startTimestamp = browsingStamp;
} else if (document.URL.includes("/?s=")) {
  search = document.querySelector("body > div.web-app > div.home-bg.animes-list > div > div > div.col-12.col-md-9 > div > header > h1 > span");
  presenceData.details = "Searching for:";
  presenceData.state = search.innerText;
  presenceData.smallImageKey = "search";
  presenceData.startTimestamp = browsingStamp;
} else if (document.location.pathname.includes("/ongoing")) {
  presenceData.details = "Browsing through";
  presenceData.state = "ongoing animes";
  presenceData.startTimestamp = browsingStamp;
} else if (document.location.pathname.includes("/trending-animes")) {
  presenceData.details = "Browsing through";
  presenceData.state = "trending animes";
  presenceData.startTimestamp = browsingStamp;
} else if (document.location.pathname.includes("/popular-animes")) {
  presenceData.details = "Browsing through";
  presenceData.state = "popular animes";
  presenceData.startTimestamp = browsingStamp;
} else if (document.location.pathname.includes("/general-discussion")) {
  presenceData.details = "Writing to the community";
  presenceData.state = "in general discussion";
  presenceData.smallImageKey = "writing";
  presenceData.startTimestamp = browsingStamp;
} else if (document.location.pathname.includes("/contact-us")) {
  presenceData.details = "Contacting OtukaStream";
  presenceData.smallImageKey = "writing";
  presenceData.startTimestamp = browsingStamp;
} else if (document.URL == "https://otakustream.tv/") {
  presenceData.details = "Browsing...";
  presenceData.smallImageKey = "reading";
  presenceData.startTimestamp = browsingStamp;
}

if (presenceData.details == null) {
  presence.setTrayTitle();
  presence.setActivity()
} else {
  presence.setActivity(presenceData);
}

});



/**
 * Get Timestamps
 * @param {Number} videoTime Current video time seconds
 * @param {Number} videoDuration Video duration seconds
 */
function getTimestamps(videoTime: number, videoDuration: number) {
  var startTime = Date.now();
  var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}