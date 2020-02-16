const fs = require('fs');
const path = require('path');


/**
 * 需求：先读取 文件 1.txt  成功后读取文件 2.txt  成功后读取文件 3.txt
 * 
 * 典型的【回调地狱】问题
 */

getFileByPath(path.join(__dirname, './files/1.txt'), data => {
    console.log(data);
    getFileByPath(path.join(__dirname, './files/2.txt'), data => {
        console.log(data);
        getFileByPath(path.join(__dirname, './files/3.txt'), data => {
            console.log(data);
        }, err => {
            console.log(err.message);
        })
    }, err => {
        console.log(err.message);
    })
}, err => {
    console.log(err.message);
});




/**
 * 读取指定目录的文件内容
 *      方法内存在异步方法，无法使用 return 返回值，所以采用回调
 * @param {*} fpath 
 * @param {*} callBack 
 */
function getFileByPath(fpath, successCallBack, errorCallBack) {
    fs.readFile(fpath, 'utf-8', (err, dataStr) => {
        if (err) return errorCallBack(err);
        successCallBack(dataStr);
    })
}

