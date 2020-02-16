const fs = require('fs')

function getFileByPath(fpath) {
    return new Promise(function (resolve, reject) {
        fs.readFile(fpath, 'utf-8', (err, dataStr) => {
            if (err) return reject(err);
            resolve(dataStr);
        })
    })
}


/**
 * 需求：先读取 文件 1.txt  成功后读取文件 2.txt  成功后读取文件 3.txt
 *
 * Promise 解决【回调地狱】问题
 * 
 * 在每个 .then 中的回调中返回新的 Promise 对象，继续使用 .then 对回调进行串联操作
 * 
 * 如果不指定 失败回调  
 *      则会导致前面的方法异常或者失败后，后续的 .then 操作被终止
 *      如果想要后续的 .then 操作继续，还需要在 失败回调 中返回一个新的 Promise 对象
 * 
 */


/**
 * 回调异常的捕获问题：
 *      情况一、前面的异常不影响后续的回调执行
 *          - 指定失败回调函数
 *          - 失败回调函数中需要返回新的 Promise 对象以供后续 .then 方法的继续执行
 * 
 *      情况二、后面的功能依赖于前面的执行结果
 *          - 不需要指定失败回调
 *          - 回调最尾端使用 catch 捕获异常
 */

/* 情况一、前面异常不影响后续回调执行 */
getFileByPath('./files/11.txt') //指定错误路径。制造异常
    .then(data => {
        console.log(data);
        return getFileByPath('./files/2.txt');
    }, err => {
        console.log(err.message);
        return getFileByPath('./files/2.txt');
    })
    .then(data => {
        console.log(data);
        return getFileByPath('./files/3.txt');
    }, err => {
        console.log(err.message);
        return getFileByPath('./files/3.txt');
    })
    .then(data => {
        console.log(data);
    }, err => {
        console.log(err.message);
    })



/* 情况二、后面的功能依赖于前面的执行结果 */
getFileByPath('./files/11.txt')//指定错误路径。制造异常
    .then(data => {
        console.log(data);
        return getFileByPath('./files/2.txt');
    })
    .then(data => {
        console.log(data);
        return getFileByPath('./files/3.txt');
    })
    .then(data => {
        console.log(data);
    }).catch(err => {
        // catch ： 前面任意一个 promise 执行失败。会立即终止所有后续 promise 执行，并进入 catch 代码块中抛出异常
        console.log(err.message);
    })