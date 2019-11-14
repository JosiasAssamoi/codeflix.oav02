
let fs = require('fs')
const path = require('path')
const stream = require('stream')

function duplicate(fileName){
const ext =  path.extname(fileName)
const base =  path.basename(fileName,ext)

let file = fs.createReadStream(fileName)
let status = 0
let  copy = fs.createWriteStream(`${base}.copy${ext}`)
fs.stat(fileName , (error,stat) => {
    file.on('data',(chunk) => {
        status += chunk.length
        console.log(Math.round(100 * status / stat.size) + "%")
        } )
    } 
)
// tunnel cad affectation de file dans copy
file.pipe(copy)
copy.on('finish', () => {
    console.log('fichier copié')
})

}






module.exports = {
    duplicate
}
