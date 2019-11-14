const fs  = require('fs')
const {duplicate} = require('./streambox')
const args = process.argv.slice(2)

const fileName = args[0]


// si on n'envoie pas exactement 1 param on envoie le "man de lapp"
// __fileName renvoie path du fichier courant
if(args.length !== 1){
    console.log(`usage : node js  <FILENAME> `)
    process.exit(0)
}
//Si le parametre passé a main n'existe pas 
if (!fs.existsSync(fileName)) {
    console.log(`The file ${fileName} does not exist.`);
    process.exit(-1)
}

duplicate(fileName)