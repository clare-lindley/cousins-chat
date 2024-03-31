import * as fs from 'fs'

/**
 * Cases to handle
    * Messages with new lines
    * Messages that are URLs, links to tweets etc etc don't follow the convention of '[23/08/2022, 12:25:11] Emily: wow that’s absolutely stunning! Can’t believe that’s even real!!!!\r',
    * Messages with emoji reactions
 */

// [23/08/2022, 12:25:11] Username: wow this is a test message! 

fs.readFile('_chat.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }


    // 1. prepare valid message rows - these are just text rows with a username in them that we can use to extract
    // and tally up who wrote the most
    const allRowsWithAUserName = data.split('\n').filter((row) => row !== '').filter((row) => {
        const datePattern = /\[[0-9]+\/[0-9]+\/[0-9]+\,\s[0-9]+\:[0-9]+\:[0-9]+\]/
        const matches = row.match(datePattern)
        if(!Object.is(matches, null)){
            return row
        }
    })


    // 2. Tally up the message count for each user
    const usernamePatter = /[A-Z\sa-z\!]+:/; // e.g. Clare:
    let userMessages = new Map();
    allRowsWithAUserName.forEach(row => {
        const matches = row.match(usernamePatter);
        if (matches !== null) {
            const msgAuthor = matches[0].replace(':', '').trim();
            // Increment the count for the user
            userMessages.set(msgAuthor, (userMessages.get(msgAuthor) || 0) + 1);
        }
    });

    // Convert the Map into an array of objects
    const allCousins = Array.from(userMessages, ([username, count]) => ({ username, count }));
    console.log(allCousins);

    // 3. FIND OUT WHO SAID THE MOST?!!
    let chattiestCousin = [...userMessages.entries()].reduce((highest, entry) => {
        return entry[1] > highest[1] ? entry : highest;
       }, [null, -Infinity]);
       
    console.log(chattiestCousin);
});
