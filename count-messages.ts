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

    console.log(data)




    const usernamePattern = /[A-Z\sa-z\!]+:/; // e.g. Clare:
    let userMessages = new Map();
    const matches = data.match(usernamePattern);
    console.log(matches)

});
