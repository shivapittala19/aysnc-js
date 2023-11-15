const fs = require("fs")
const path = require("path")

function createFilesCallback(callBack){
    const files = ['file1.json', 'file2.json', 'file3.json']
    let count = 0

    files.forEach((file) =>{
        fs.writeFile(path.join(__dirname, file), JSON.stringify({}), (err)=>{
            if (err){
                callBack(err)
            }
            else{
                count += 1
                if (count === files.length){
                    callBack(null)
                }
            }
        })
    })
}

function deleteFilesCallback(callBack) {
    const files = ['file1.json', 'file2.json', 'file3.json']
    let count = 0

    files.forEach((file) => {
        fs.unlink(path.join(__dirname, file), (err) => {
            if (err) {
                callBack(err);
            } else {
                count++;
                if (count === files.length) {
                    callBack(null)
                }
            }
        })
    })
}

function main(){
    createFilesCallback((err) =>{
        if(err){
            console.log("Error in creating files")
        }
        else{
            console.log("Files created sucessfully")
            deleteFilesCallback((err) =>{
                if(err){
                    console.log("Error in deleting files")
                }
                else{
                    console.log("Sucessfully deleted files")
                }
            })
        }
    })
}

main()