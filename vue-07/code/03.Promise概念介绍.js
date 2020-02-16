/**
 * *******************************************************************************
 * *                                                                             *
 * *     Promise 出现的初衷就是为了解决【回调地狱】问题，并不能减少代码量和工作量      *
 * *                                                                             *
 * *******************************************************************************
 * 
 * 1、Promise 是一个构造函数，既然是构造函数，就可以 new Promise() 得到一个 Promise 实例
 * 
 * 2、在 Promise 上，有两个函数，分别叫 resolve（成功之后的回调函数）和 reject（失败之后的回调函数）
 * 
 * 3、在 Promise 构造函数的 Prototype 属性上，有一个 .then() 方法，也就是，只要是 Promise 构造函数创建的实例，都可以访问到 .then() 方法
 * 
 * 4、Promise 是一个异步操作；每当 new 一个 Promise 实例，这个实例就表示一个具体的异步操作
 * 
 * 5、既然 Promise 创建的实例，是一个异步操作，那么，这个异步操作的结果，只能有两种状态
 *      5.1、状态1：异步执行成功，需要在内部调用成功的回调函数 resolve 把结果返回给调用者；
 *      5.2、状态2：异步执行失败，需要在内部调用失败的回调函数 reject 把结果返回给调用者；
 *      5.3、由于 Promise 的实例，是一个异步操作，所以，内部拿到操作的结果后，无法使用 return 把操作的结果返回给调用者，这时候，只能使用回调函数的形式看，来把成功或失败的结果，返回给调用者
 * 6、我们可以 new 出来的 Promise 实例上，调用 .then() 方法，【预先】为这个 Promise 异步操作，指定成功（resolve）和失败（reject）回调函数
 * 
 */



// ★ 创建 Promise 对象。只是代表【形式上】的一个异步操作
// var promise = new Promise();

// ★ 创建 Promise 对象。这是一个【具体】的异步操作。
// 创建 Promise 对象的时候，除了能够得到一个 promise 实例之外，还会立即调用我们为 Promise 构造函数传递的 function，执行 function 中的异步操作
// var promise = new Promise(function () {
//     // 这个 function 内部写的就是具体的异步操作
// })


// ★ 在 js 中，除了 function 之外其他所有代码都会在创建时立即执行
// 所以，要想不让 promise 在创建时立即执行，需要将其封装到方法中
function functionname(params) {                                     //第一步、封装方法。还未调用。
    var promise = new Promise(function (resolve, reject) {          //第三步、开始执行异步方法（执行中...）     //第七步、异步方法获取到第六步传回的回调方法，继续执行
        // 异步操作 无法使用 return 将操作结果返回
        if (true)
            return reject('error message')
        resolve('success message')
    })
    return promise;                                                 //第四部、异步方法执行中（...），返回 promise 实例
}
//调用
//因为是异步方法，获取到 pro 的一瞬间异步还正在执行，并没有执行完成
var pro = functionname('params');                                   //第二步、调用封装的方法        //第五步、pro 变量获取到封装方法返回的 promise 实例。（此时异步仍未执行完）
//【预先】为 promise 指定 resolve 和 reject 方法
pro.then(function (data) {                                          //第六步、预指定 promise 实例的 resolve 和 reject 回调函数                                      
    // 指定完成后异步中的操作才在执行
    console.log(data);
}, function (err) {
    console.log(err);
})

