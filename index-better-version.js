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
    // prepare valid message rows - these are just text rows with a username in them that we can use to extract
    // and tally up who wrote the most
    var validMsgRows = data.split('\n').filter(function (row) { return row !== ''; }).filter(function (row) {
        var datePattern = /\[[0-9]+\/[0-9]+\/[0-9]+\,\s[0-9]+\:[0-9]+\:[0-9]+\]/;
        var matches = row.match(datePattern);
        if (!Object.is(matches, null)) {
            return row;
        }
    });
    // Workout the usernames - they are unique to each person's dataset!
    var pattern = /[A-Z\sa-z\!]+:/; // e.g. Clare:
    var cousins = new Map();
    validMsgRows.forEach(function (row) {
        // when row.match a cousin name increment the count for that cousin name
        // '[23/08/2022, 12:25:11] Emily: wow that’s absolutely stunning! Can’t believe that’s even real!!!!\r',
        var matches = row.match(pattern);
        if (!Object.is(matches, null)) {
            var msgAuthor = matches[0].replace(':', '').trim();
            var user = {
                name: msgAuthor,
                count: 0
            };
            // unique set of all usernames - which can't be used until we've processed the whole list
            cousins.set(msgAuthor, user);
            // if is in the list, update the score!
            if (cousins.get(msgAuthor)) {
                // get the object
                var same = cousins.get(msgAuthor);
                same.count++;
                // set it back
                cousins.set(msgAuthor, same);
            }
            //Find index of specific object using findIndex method.
            /*            const objIndex = cousins.findIndex((obj => obj.name === msgAuthor));
            
                        console.log(`objIndex ${objIndex}`)
                        console.log(`msgAuthor ${msgAuthor}`)
            
            
                        if(objIndex !== -1) {
                            //Log object to Console.
                            console.log("Before update: ", cousins[objIndex])
            
                            //Update object's count property.
                            cousins[objIndex].count = cousins[objIndex].count + 1
            
                            //Log object to console again.
                            console.log("After update: ", cousins[objIndex])
                        }*/
        }
    });
    console.log("Total rows: ".concat(validMsgRows.length)); // 10875 TOTAL // 9712
    console.log("Cousins:");
    console.log(cousins);
});
