/**
 * 文件读取模块
 */

const fs = require('fs');
const path = require('path');


// function getFileByPath(fpath){
//     /* readFile 是一个异步方法。调用 getFileByPath 时，该方法进入分支，非主程序执行，所以不能使用 return 返回信息 */
//     fs.readFile(fpath, 'utf-8', (err, dataStr) => {
//         if (err) throw err;
//         console.log(dataStr)
//         return dataStr;
//     })
// }
// // 调用 getFileByPath 返回 undefined。 原因： getFileByPath 内部的 readFile 是异步方法，其内的 return 在 getFileByPath 方法主程序执行完后才执行到
// console.log(getFileByPath(path.join(__dirname, './files/1.txt')));



/**
 * 读取指定目录的文件内容
 *      方法内存在异步方法，无法使用 return 返回值，所以采用回调
 * @param {*} fpath 
 * @param {*} callBack 
 */
function getFileByPath(fpath, successCallBack, errorCallBack) {
    /* readFile 是一个异步方法。调用 getFileByPath 时，该方法进入分支，非主程序执行，所以不能使用 return 返回信息 */
    fs.readFile(fpath, 'utf-8', (err, dataStr) => {
        if (err) return errorCallBack(err);
        // console.log(dataStr);
        successCallBack(dataStr);
    })
}
// 调用 getFileByPath 返回 undefined。 原因： getFileByPath 内部的 readFile 是异步方法，其内的 return 在 getFileByPath 方法主程序执行完后才执行到
getFileByPath(path.join(__dirname, './files/1.txt'), (dataStr) => {
    console.log(dataStr)
}, (err) => {
    console.log(err.message)
})