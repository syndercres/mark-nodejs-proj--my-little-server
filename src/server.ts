import express from "express";
import ponyData from "../data/ponies.json";
import { seasonOneEpisodes } from "./episodes";
import { pickRandom } from "./random";

const app = express();
const serverStartDate = new Date();
let serverHitCount = 0;
const history: string[] =[];

app.get("/", (req, res) => {
  res.send(
    "This is the default path - and it isn't very interesting, sorry. \nTry visiting localhost:4000/creation-time, localhost:4000/current-time"
  );
});

app.get("/history", (req,res) =>{
  res.json({
    message: `You and me have a whole lot of history`,
    data: history,
    countedAsHit: false,
  });
});

app.get("/hello-world", (req, res) => {
  history.push("/hello-world");
  res.json({
    
      english: "Hello world!",
      esperanto: "Saluton mondo!",
      hawaiian: "Aloha Honua",
      turkish: "Merhaba Dünya!",
    
    countedAsHit: false,
    
  });
});

app.get("/creation-time", (req, res) => {
  history.push("/creation-time");
  res.json({
    message: `The server was started at ${serverStartDate.toTimeString()}`,
    utc: serverStartDate.toUTCString(),
    countedAsHit: false,
  });
});

app.get("/current-time", (req, res) => {
  const dateOfRequestHandling = new Date();
  history.push("/current-time");

  res.json({
    message: `The current date is ${dateOfRequestHandling.toTimeString()}`,
    utc: dateOfRequestHandling.toUTCString(),
    countedAsHit: false,
  });
});

app.get("/hits", (req, res) => {
  serverHitCount += 1;
  history.push("/hits");
  res.json({
    note: "We've registered your hit!",
    currentTotal: serverHitCount,
    countedAsHit: true,
  });
});

app.get("/hits-stealth", (req, res) => {
  history.push("/hits-stealth");
  res.json({
    note: "Oooh, you ninja. We didn't count that hit.",
    currentTotal: serverHitCount,
    countedAsHit: false,
  });
});

app.get("/ponies", (req, res) => {
  history.push("/ponies");
  res.json({
    message: "Loaded dummy JSON data:",
    data: ponyData,
    countedAsHit: false,
  });
});

app.get("/ponies/random", (req, res) => {
  history.push("/ponies/random");
  res.json({
    message: "Loaded random pony data:",
    data: pickRandom(ponyData.members),
    countedAsHit: false,
  });
});

app.get("/season-one", (req, res) => {
  history.push("/season-one");
  res.json({
    countedAsHit: false,
    data: seasonOneEpisodes,
  });
});

app.get("/season-one/random", (req, res) => {
  const randomEpisode = pickRandom(seasonOneEpisodes);
  history.push("/season-one/random");
  res.json({
    countedAsHit: false,
    data: randomEpisode,
  });
});

// using 4000 by convention, but could be changed
const PORT_NUMBER = 4000;

app.listen(PORT_NUMBER, () => {
  console.log(
    `If you can see this message in the console, this means that you successfully started the server! \n\nYou can see what comes back by visiting localhost:${PORT_NUMBER} in your browser. \n\nChanges will not be processed unless you restart your server (close and restart). \n\nThe server is currently listening for requests - press Ctrl + C to quit.`
  );
});
