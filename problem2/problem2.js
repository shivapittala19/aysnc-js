const fs = require("fs").promises
const path = require("path")
const { search } = require("truecallerjs")
const filenames = []

const readFiles = (async (filename) =>{
    const data =  fs.readFile(filename, 'utf-8')
    return data
})

const convertToUpperCase = (async (filename) =>{
    const data = await readFiles(filename)
    return data.toUpperCase()
})

const converttoLowerCase = (async (filename) =>{
    const data  = await readFiles(filename)
    return data.toLowerCase()
})

const writeContentToFile = (async (filename,data) =>{
    await fs.writeFile(path.join(__dirname,filename), data)
})

const splitContent = (async (data) =>{
    let sentences = data.split(/(?<=[.!?])\s+/)
    let count = 1
    sentences.forEach(async (row) =>{
        file = `problem${count}.txt`
        count += 1
        filenames.push(file)
        await writeContentToFile(file,row)
    })
    await writeContentToFile('filenames.txt',filenames.join('\n'))
})

const sortContentWriteInNewFile = (async () =>{
    const filesArray = []
    filenames.forEach(async (file)=>{
        if(file != 'uppercase.txt'){
            const data = readFiles(file)
            filesArray.push(data)
        }
    })
    const sortedData = filesArray.sort()
    await writeContentToFile('sorted.txt',sortedData)
    await fs.appendFile('filenames.txt', '\n').then(() => fs.appendFile('filenames.txt', 'sorted.txt'));

})

const deleteNewFiles = ( async ()=>{
    const allFiles = (await readFiles('filenames.txt')).split('\n')
    allFiles.forEach((file)=>{
        if(file){
            fs.unlink(path.join(__dirname,file))
        }
    })
})


async function main(){
    try{

        const upperCaseData = await convertToUpperCase('lipsum.txt')
        await writeContentToFile('uppercase.txt',upperCaseData)
        filenames.push('uppercase.txt')
        
        //write the newly created files into filenames.txt
        await writeContentToFile('filenames.txt',filenames.join('\n')) 

        const lowerCaseData = await converttoLowerCase('uppercase.txt')
        await splitContent(lowerCaseData)

        await sortContentWriteInNewFile()

        await deleteNewFiles()
    }
    catch(err){
        console.log(err)
    }
}

main()