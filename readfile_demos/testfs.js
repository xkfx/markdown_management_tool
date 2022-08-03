const fs = require("fs").promises
const path = require('path')

function readFile(path) {
    let opions = {
        encoding: 'utf-8',
    }
    return fs.readFile(path, opions)
}

// let testPath1 = path.join(__dirname, 'README.md');
// let testPath2 = path.join(__dirname, 'READYOU.md');

// readFile(testPath1).then(content => console.log(content))

// readFile(testPath2).then(() => {}, (err) => console.log(err));

// readFile(testPath2).catch(err => console.log(err));

// Promise.all([readFile(testPath1), readFile(testPath1)]).then(result => {
//     console.log(result)
// }).catch(err => {
//     console.log(err)
// })

// 上面的没注释现在都不知道啥意思了！—— 2022-08-03
// 现在就是要读一个rss格式的文件，然后解析之....
let file_path = path.join(__dirname, 'cnblog_backup_rss_posts.xml')
// 这个文件就在当前目录下.把它输出来看一下是不是先,执行node testfs.js
console.log(file_path)
// => D:\Electron\markdown_management_tool\readfile_demos\cnblog_backup_rss_posts.xml

const htmlparser2 = require("htmlparser2");
let dealWithContent = (content) => {
    // 现在我们拿到这个content,感觉良好,,
    // console.log(content)

    // 准备整个rss解析的东西来把它对象化一下,然后搞成文件输出
    // 大功告成,这是最理想的情况,要不然自己正则表达式解析也不是不行

    const feed = htmlparser2.parseFeed(content);
    // console.log(feed)
    // 看看数量先
    // console.log(feed.items[0])

    
    let posts = feed.items
    let olHtml = "<ol>"
    posts.slice(0, 5).map((post) => {
        olHtml += `<li><a href="./posts/${post.title}.html"></a></li>`
        fs.writeFile(`./posts/${post.title}.html`, 
        post.description, 
        err => {
            if (err) console.log(err)
        });                
    })

    olHtml += '</ol>'
}

readFile(file_path).then(content => dealWithContent(content))

