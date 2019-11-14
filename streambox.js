
let fs = require('fs')
const path = require('path')
const {Transform} = require('stream')

function getCopyFileName(fileName) {
    const ext = path.extname(fileName)
        const base = path.basename(fileName, ext)
        return `${base}.copy${ext}`
}

// duplique un fichier 
function duplicate(fileName){
    const copyFileName = getCopyFileName(fileName)
    let file = fs.createReadStream(fileName)
    let status = 0
    let  copy = fs.createWriteStream(copyFileName)
    fs.stat(fileName , (error,stat) => {
        file.on('data',(chunk) => {
            status += chunk.length
            console.log(Math.round(100 * status / stat.size) + "%")
            } )
        } 
    )
    // tunnel cad affectation de file dans copy
    file.pipe(copy)

    // a la fin de la copie
    copy.on('finish', () => {
        console.log(`${fileName} succesfully duplicated`)
    })

}

// transform un fichier
function transform(fileName,re,cb,in_stdout=false){
    const copyFileName = getCopyFileName(fileName)
    let file = fs.createReadStream(fileName)
    let copy = fs.createWriteStream(copyFileName)

    if (in_stdout)
        content=''
        file.on('data', chunk => {
            content += chunk.toString().replace(re,cb)
        })
        file.on('end',() => {
            console.log(content)
        } )


    const tstream = new Transform({
        transform(chunk,encoding,callback){
            this.push(chunk.toString().replace(re,cb))
            callback()
        }
 
    })
    file.pipe(tstream).pipe(copy)
}








module.exports = {
    duplicate,transform
}
