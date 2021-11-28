# markdown_management_tool

云笔记本
桌面应用程序
markdown

## 创建项目
npm init

cnpm install --save-dev electron

{
  "scripts": {
    "start": "electron ."
  }
}

npm start

touch .gitignore

把node_modules/添加进.gitignore

## 项目结构的一点想法

main.js只提供不含业务逻辑的接口，尽量各窗口通用

preload.js不包含任何前端view相关的东西，便于eletron项目向浏览器迁移，但是应该完成后端应该做的、业务逻辑相关的事情

render.js尽量考虑便于向浏览器迁移，多弄点重复代码也无所谓

