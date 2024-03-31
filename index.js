"use strict";
exports.__esModule = true;
var fs = require("fs");
/**
 * Cases to handle
 * Messages with new lines
 * Messages that are URLs, links to tweets etc etc don't follow the convention of '[23/08/2022, 12:25:11] Emily: wow that’s absolutely stunning! Can’t believe that’s even real!!!!\r',
 */
fs.readFile('_chat.txt', 'utf8', function (err, data) {
    if (err) {
        console.error(err);
        return;
    }
    var cousins = [
        {
            name: 'Cousin John',
            count: 0
        },
        {
            name: 'Cousin Mark',
            count: 0
        },
        {
            name: 'Cousin Ben',
            count: 0
        }
    ];
    // prepare valid message rows - these are just text rows with a username in them that we can use to extract
    // and tally up who wrote the most
    var validMsgRows = data.split('\n').filter(function (row) { return row !== ''; }).filter(function (row) {
        var datePattern = /\[[0-9]+\/[0-9]+\/[0-9]+\,\s[0-9]+\:[0-9]+\:[0-9]+\]/;
        var matches = row.match(datePattern);
        if (!Object.is(matches, null)) {
            return row;
        }
    });
    // for each row - isolate the name and increase the count for each cousin
    var pattern = /[A-Z\sa-z\!]+:/; // e.g. Clare:
    validMsgRows.forEach(function (row) {
        // when row.match a cousin name increment the count for that cousin name
        // '[23/08/2022, 12:25:11] Emily: wow that’s absolutely stunning! Can’t believe that’s even real!!!!\r',
        var matches = row.match(pattern);
        if (!Object.is(matches, null)) {
            var msgAuthor_1 = matches[0].replace(':', '').trim();
            //Find index of specific object using findIndex method.
            var objIndex = cousins.findIndex((function (obj) { return obj.name === msgAuthor_1; }));
            console.log("objIndex ".concat(objIndex));
            console.log("msgAuthor ".concat(msgAuthor_1));
            if (objIndex !== -1) {
                //Log object to Console.
                console.log("Before update: ", cousins[objIndex]);
                //Update object's count property.
                cousins[objIndex].count = cousins[objIndex].count + 1;
                //Log object to console again.
                console.log("After update: ", cousins[objIndex]);
            }
        }
    });
    console.log("Total rows: ".concat(validMsgRows.length)); // 10875 TOTAL // 9712
    console.log("Cousins: ".concat(cousins));
    console.log(cousins);
});
