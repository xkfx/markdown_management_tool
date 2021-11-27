const fs = require("fs").promises
const path = require('path')

function readFile(path) {
    let opions = {
        encoding: 'utf-8',
    }
    return fs.readFile(path, opions)
}

let testPath1 = path.join(__dirname, 'README.md');
let testPath2 = path.join(__dirname, 'READYOU.md');

// readFile(testPath1).then(content => console.log(content))

// readFile(testPath2).then(() => {}, (err) => console.log(err));

// readFile(testPath2).catch(err => console.log(err));

Promise.all([readFile(testPath1), readFile(testPath1)]).then(result => {
    console.log(result)
}).catch(err => {
    console.log(err)
})
