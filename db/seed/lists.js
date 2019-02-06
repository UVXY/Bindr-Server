const bestBksEvr = require("./goodread_bestbooksever_1.json");
const backpacking = require("./goodread_backpacking_1.json");
const cry = require("./goodread_cry_1.json");
const devops = require("./goodread_devops_1.json");
const fall = require("./goodread_fall_1.json");
const funniest= require("./goodread_funniest_1.json");
const history = require("./goodread_history_1.json");
const rainyday = require("./goodread_rainyday_1.json");
const reese = require("./goodread_reese_1.json");
const scifi = require("./goodread_scifi_1.json");
const selfhelp = require("./goodread_selfhelp_1.json");
const sports = require("./goodread_sports_1.json");
const summer = require("./goodread_summer_1.json");
const sweaterWthr = require("./goodread_sweaterweather_1.json");
const thriller = require("./goodread_thriller_1.json");
const winter = require("./goodread_winter_1.json");
const tags = require("./tags.json");
//const = require("./.json");

const books = bestBksEvr.concat(
    backpacking, 
    cry, 
    devops, 
    fall, 
    funniest, 
    history, 
    rainyday, 
    reese, 
    scifi, 
    selfhelp, 
    sports, 
    summer, 
    sweaterWthr, 
    thriller, 
    winter
);

const totalLists = [];
 totalLists.push(
    bestBksEvr,
    backpacking, 
    cry, 
    devops, 
    fall, 
    funniest, 
    history, 
    rainyday, 
    reese, 
    scifi, 
    selfhelp, 
    sports, 
    summer, 
    sweaterWthr, 
    thriller, 
    winter
);

const lists = require("./list.json")

module.exports = expPackage = {
    books: books,
    lists: lists,
    tags: tags,
    sepLists: totalLists
};