let fileSearch = document.querySelector(".FileSearch");

    
fileSearch.addEventListener("search", () => {
    if (fileSearch.value != "") {
        console.log("fileSearch " + fileSearch.value);
    }
});

let files = [
    {
        id: '1',
        title: 'first post',
        body: 'dasdasdasdasdsa',
        createdAt: 123123123132,
    },
    {
        id: '2',
        title: 'second post',
        body: 'dasdasdasdasdsa',
        createdAt: 213121231323,
    },
    {
        id: '3',
        title: 'third post',
        body: 'dasdasdasdasdsa',
        createdAt: 213121231323,
    }
];

let DOMFileList = elt('ul', { class: 'FileList' });
files.map(x => {
    let inline_style = object2css({
        'color': randomHexColor(),
        'user-select': 'none',
        'font-family': "Times New Roman",
    });
    let attrs = {
        'data-id': x.id,
        'style': inline_style,
    };

    let title = elt('span', {}, x.title);
    let btnEdit = elt('button', {}, '编辑');
    let btnDelete = elt('button', {}, '删除');
    let initial_state = elt('div', attrs, title, btnEdit, btnDelete);

    let inputTitle = elt('input', {});
    let btnCancel = elt('button', {}, '取消');
    let edit_state = elt('div', {}, inputTitle, btnCancel);
    edit_state.style.display = 'none';

    let list_item = elt('li', {}, initial_state, edit_state);

    // initial_state事件监听

    title.addEventListener("click", () => {
        console.log("span " + x.title);
    });

    btnEdit.addEventListener("click", () => {
        console.log("btnEdit " + x.title);
        // 切换到li的另一个状态                       
        initial_state.style.display = 'none';
        edit_state.style.display = 'block';

        inputTitle.value = x.title;
        inputTitle.focus();
    });

    btnDelete.addEventListener("click", () => {
        console.log("btnDelete " + x.title);
    });

    // edit_state事件监听

    inputTitle.addEventListener("keydown", event => {           
        if (event.key == 'Enter' && inputTitle.value != "") {
            alert("确定修改?");
        }
        edit_state.style.display = 'none';
        initial_state.style.display = 'block';  
    });

    inputTitle.addEventListener("blur", () => {
        edit_state.style.display = 'none';
        initial_state.style.display = 'block'; 
    })

    btnCancel.addEventListener("click", () => {
        edit_state.style.display = 'none';
        initial_state.style.display = 'block';           
    });

    DOMFileList.appendChild(list_item);
});
document.querySelector(".FileList-container").appendChild(DOMFileList);

let tabList = files.map(file => {
    let tab = {
        title: file.title,
        content: file,
        unsaved: false,
    };
    return tab;
});
tabList.selected = -1;

let ul_tablist = elt('ul', { class: 'TabList' });
let inline_style = object2css({
    'user-select': 'none',
});      
tabList.map((tab, index) => {
    let attrs = {
        'data-id': tab.content.id,
        'style': inline_style,
    };            

    let span_title = elt('span', { class: 'title' }, tab.title);
    let btn_close = elt('button', {}, '关闭');           
    let li_tab = elt('li', attrs, span_title, btn_close);    
    if (tab.selected) span_title.style.color = 'red';
    btn_close.style.visibility = 'hidden';

    span_title.addEventListener("click", () => {            
        tabList.selected = index;
        console.log("tabList.selected: " + tabList.selected);
    });

    li_tab.addEventListener("mouseover", () => {
        btn_close.style.visibility = 'visible';
    });

    li_tab.addEventListener("mouseout", () => {
        btn_close.style.visibility = 'hidden';
    });

    ul_tablist.appendChild(li_tab);
});


let span_titles = ul_tablist.querySelectorAll('span.title');
for (let i = 0; i != tabList.length; ++i) {
    if (i == tabList.selected) span_titles[i].style.color = 'red';
    else span_titles[i].style.color = 'black';
}        

document.querySelector("div.TabList-container").appendChild(ul_tablist);

let simplemde = new SimpleMDE();

// 方便创建DOM节点的方法
function elt(name, attrs, ...children) {
    let dom = document.createElement(name);
    for (let attr of Object.keys(attrs)) {
        dom.setAttribute(attr, attrs[attr]);
    }
    for (let child of children) {
        if (["string", "number"].indexOf(typeof child) == -1) {
            dom.appendChild(child);
        } else {
            dom.appendChild(document.createTextNode(child));
        }
    }
    return dom;
}

// 把JS对象转化为内联CSS字符串
function object2css(obj) {
    let str = JSON.stringify(obj);
    str = str.substr(1, str.length - 2); // 去掉{}
    str = str.replace(/,/g, ";"); // ,改成;
    str = str.replace(/"/g, ""); // 去掉"
    return str;
}

//随机生成十六进制颜色
function randomHexColor() {
    var hex = Math.floor(Math.random() * 16777216).toString(16); //生成ffffff以内16进制数
    while (hex.length < 6) { //while循环判断hex位数，少于6位前面加0凑够6位
        hex = '0' + hex;
    }
    return '#' + hex; //返回‘#'开头16进制颜色
}
