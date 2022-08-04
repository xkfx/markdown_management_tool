const fs = require("fs").promises
const path = require('path')
const htmlparser2 = require("htmlparser2")
const { nanoid } = require("nanoid");
// "nanoid": "^3.3.4"

function readFile(path) {
    let opions = {
        encoding: 'utf-8',
    }
    return fs.readFile(path, opions)
}

async function totalWork() {
    // 原始文件 转 obj
    console.log('* 原始文件 转 obj')
    let rss_path = path.join(__dirname, 'cnblog_backup_rss_posts.xml')
    let rss_raw_content = await readFile(rss_path)
    let rss_objs = htmlparser2.parseFeed(rss_raw_content)
    let posts = rss_objs.items.map(rss_obj => {
        let post = {
            id: nanoid(8),
            title: rss_obj.title,
            content: rss_obj.description,
            pubDate: rss_obj.pubDate,                   
        }
        return post
    })       

    // obj 转 json 并写入文件
    // console.log('* obj 转 json 并写入文件')
    // let posts_json = JSON.stringify(posts)
    // let json_path = path.join(__dirname, 'posts.json')
    // await fs.writeFile(json_path, posts_json)

    // 递归删除posts文件夹及文件
    console.log('* 递归删除posts文件夹及文件')
    await fs.rm('./posts/', { recursive: true, force: true })

    // obj 生成静态HTML文章
    console.log('* 创建posts文件夹')
    await fs.mkdir('./posts/')

    let writeFileTasks = posts.map(post => {
        return fs.writeFile(`./posts/${post.id}.html`, post.content).catch(err => {
            console.log(`* 生成【./posts/${post.id}(${post.title}).html】异常`)
            console.log(err)
        })
    })

    console.log('* 等待所有writeFile任务完成')
    Promise.all(writeFileTasks)
    console.log('* 所有writeFile任务完成')

    // 生成简单索引页
    let indexHtml = '<html><body><table>'
    for (let i = 0; i != posts.length; ++i) {
        let result = `<tr>`
        + `<td>${i}</td>`
        + `<td>${posts[i].id}</td>`
        + `<td>${posts[i].title}</td>`
        + `<td>${posts[i].pubDate}</td>`
        + `<td><a href="./posts/${posts[i].id}.html">点我访问</a></td>`
        + `</tr>`

        indexHtml += result
    }
    indexHtml += '</table></body></html>'

    console.log('* 生成简单索引页')
    await fs.writeFile('index.html', indexHtml)
}

totalWork().then(() => {
    console.log('* totalWork完成')
}).catch(err => {
    console.log('* 捕捉到err:')
    console.log(err)
})
