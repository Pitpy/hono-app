const promise1 = () => new Promise((resolve, reject) => {
    setTimeout(() => resolve('Promise 1'), 3000);
});

const promise2 = () => new Promise((resolve, reject) => {
    setTimeout(() => resolve('Promise 2'), 500);
});

const promise3 = (p: boolean) => new Promise((resolve, reject) => {
    setTimeout(() => p ? resolve('Promise 3 [Resolved]') : reject('Promise 3 [Reject]'), 500);
});

(async function fnc() {
    console.log('Starting...');

    let value1 = await promise1()
    console.log(value1);

    promise1().then((value) => console.log(value))

    let value2 = await promise2()
    console.log(value2);

    promise3(true).then((value) => console.log('then:', value)).catch((err) => console.log('catch:', err))
})()