const fs = require("fs").promises
const path = require("path")

async function createFilesAsync() {
    const files = ['file1.json', 'file2.json', 'file3.json']

    files.map(async (file) =>{
        try{
            await fs.writeFile(path.join(__dirname,file),JSON.stringify({}))
        }
        catch(err){
            throw new Error("Error in creating files")
        }
    })
}

async function deleteFilesAsync() {
    const files = ['file1.json', 'file2.json', 'file3.json']

    files.map(async (file) =>{
        try{
            await fs.unlink(path.join(__dirname,file))
            
        }
        catch(err){
            throw new Error("Error in deleting files")
        }
    })
}

async function main() {
    try{
        await createFilesAsync()
        console.log("Files created sucessfully")
        await deleteFilesAsync()
        console.log("Files deleted sucessfully")
    }
    catch(err){
        console.log("error" + err)
    }
}

main()