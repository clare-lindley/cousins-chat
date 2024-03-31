import * as fs from 'fs'

/**
 * Cases to handle
 * Messages with new lines
 * Messages that are URLs, links to tweets etc etc don't follow the convention of '[23/08/2022, 12:25:11] Emily: wow that’s absolutely stunning! Can’t believe that’s even real!!!!\r',
 * Work out the usernames dynamically instead of relying on a hardcoded list
 * */

fs.readFile('_chat.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }


    /**
     *   'Cousin John' => { name: 'Cousin John', count: 0 },
     *   'Cousin Mark' => { name: 'Cousin Mark', count: 0 },
     *   'Emily' => { name: 'Emily', count: 0 },
     *   'Julia BupBup!' => { name: 'Julia BupBup!', count: 0 },
     *   'Clare Lindley' => { name: 'Clare Lindley', count: 0 },
     *   'Paul' => { name: 'Paul', count: 0 },
     *   'Kate' => { name: 'Kate', count: 0 },
     *   'Cousin Tom' => { name: 'Cousin Tom', count: 0 },
     *   'Anna' => { name: 'Anna', count: 0 },
     *   'Carmel' => { name: 'Carmel', count: 0 },
     *   'Ruth' => { name: 'Ruth', count: 0 },
     *   'Cousin Ben' => { name: 'Cousin Ben', count: 0 }
     */

    let cousins = [
        {
            name: 'Cousin John',
            count: 0
        },
        {
            name: 'Cousin Mark',
            count: 0
        },
        {
            name: 'Emily',
            count: 0
        },
        {
            name: 'Cousin Ben',
            count: 0
        },
        {
            name: 'Cousin Ben',
            count: 0
        }
    ]

    // prepare valid message rows - these are just text rows with a username in them that we can use to extract
    // and tally up who wrote the most
    const validMsgRows = data.split('\n').filter((row) => row !== '').filter((row) => {
        const datePattern = /\[[0-9]+\/[0-9]+\/[0-9]+\,\s[0-9]+\:[0-9]+\:[0-9]+\]/
        const matches = row.match(datePattern)
        if(!Object.is(matches, null)){
            return row
        }
    })


    // for each row - isolate the name and increase the count for each cousin
    const pattern = /[A-Z\sa-z\!]+:/ // e.g. Clare:
    validMsgRows.forEach((row) => {

        // when row.match a cousin name increment the count for that cousin name
        // '[23/08/2022, 12:25:11] Emily: wow that’s absolutely stunning! Can’t believe that’s even real!!!!\r',



        const matches = row.match(pattern)
        if(!Object.is(matches, null)){
            const msgAuthor = matches[0].replace(':', '').trim()

            //Find index of specific object using findIndex method.
            const objIndex = cousins.findIndex((obj => obj.name === msgAuthor));

            console.log(`objIndex ${objIndex}`)
            console.log(`msgAuthor ${msgAuthor}`)


            if(objIndex !== -1) {
                //Log object to Console.
                console.log("Before update: ", cousins[objIndex])

                //Update object's count property.
                cousins[objIndex].count = cousins[objIndex].count + 1

                //Log object to console again.
                console.log("After update: ", cousins[objIndex])
            }



        }

    })

    console.log(`Total rows: ${validMsgRows.length}`) // 10875 TOTAL // 9712
    console.log(`Cousins: ${cousins}`)
    console.log(cousins)
});
