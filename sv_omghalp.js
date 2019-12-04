const fs = require('fs');
function getChapterFilenames(){
    let fullPath = GetResourcePath(GetCurrentResourceName()) + '/chapters/';
    let files = [];
    if (fs.existsSync(fullPath)){
        var raw = fs.readdirSync(fullPath);
        for (let fileNumber in raw){
            let fileName = raw[fileNumber];
            if (fileName.toLowerCase().endsWith("\.md")){
                files.push(fileName)
            }
        }
    }
    return files.sort();
}
let chapters = getChapterFilenames();
console.log('omghalp found ' + chapters.length + ' chapters');

onNet('omghalp:chapter-list', ()=>{
    TriggerClientEvent('omghalp:chapter-list', source, chapters);
});