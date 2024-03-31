import * as fs from 'fs'

/**
 * Cases to handle
 * Messages with new lines
 * Messages that are URLs, links to tweets etc etc don't follow the convention of '[23/08/2022, 12:25:11] Emily: wow that’s absolutely stunning! Can’t believe that’s even real!!!!\r',
 */


fs.readFile('_chat.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    // prepare valid message rows - these are just text rows with a username in them that we can use to extract
    // and tally up who wrote the most
    const validMsgRows = data.split('\n').filter((row) => row !== '').filter((row) => {
        const datePattern = /\[[0-9]+\/[0-9]+\/[0-9]+\,\s[0-9]+\:[0-9]+\:[0-9]+\]/
        const matches = row.match(datePattern)
        if(!Object.is(matches, null)){
            return row
        }
    })


    // Workout the usernames - they are unique to each person's dataset!
    const pattern = /[A-Z\sa-z\!]+:/ // e.g. Clare:
    let cousins = new Map()
    validMsgRows.forEach((row) => {

        // when row.match a cousin name increment the count for that cousin name
        // '[23/08/2022, 12:25:11] Emily: wow that’s absolutely stunning! Can’t believe that’s even real!!!!\r',



        const matches = row.match(pattern)
        if(!Object.is(matches, null)){
            const msgAuthor = matches[0].replace(':', '').trim()

            let user = {
                    name: msgAuthor,
                    count: 0
            }

            // unique set of all usernames - which can't be used until we've processed the whole list
            cousins.set(msgAuthor, user)

            // if is in the list, update the score!
            if(cousins.get(msgAuthor)){
                // get the object
                let clone = {...cousins.get(msgAuthor)}
                // update it
                clone.count++
                // set it back
                cousins.set(msgAuthor, clone)
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

    })

    console.log(`Total rows: ${validMsgRows.length}`) // 10875 TOTAL // 9712
    console.log(`Cousins:`)
    console.log(cousins)
});
