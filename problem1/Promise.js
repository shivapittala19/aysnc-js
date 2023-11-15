const { rejects } = require("assert")
const { countReset } = require("console")
const { promises } = require("dns")
const fs = require("fs")
const path = require("path")

function createFilesPromise(){
    const files = ['file1.json', 'file2.json', 'file3.json']

    const promises = files.map((file)=>{
        return new Promise((resolve,reject) =>{
            fs.writeFile(path.join(__dirname,file),JSON.stringify({}),(err) =>{
                if(err){
                    reject("rejected")
                }
                else{
                    resolve()
                }
            })
        })
    })
    return Promise.all(promises)
} 
function deleteFilesPromise(){
    const files = ['file1.json', 'file2.json', 'file3.json']

    const promises = files.map((file)=>{
        return new Promise((resolve,reject) =>{
            fs.unlink(path.join(__dirname,file),(err) =>{
                if(err){
                    reject(err)
                }
                else{
                    resolve()
                }
            })
        })
    })
    return Promise.all(promises)
}

function main(){
    Promise.all([createFilesPromise(), deleteFilesPromise()])
        .then(() => console.log('Files created deleted successfully.'))
        .catch((err) => console.error('Error:', err))
}

main()