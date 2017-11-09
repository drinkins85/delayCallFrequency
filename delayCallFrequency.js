/*
 Вызывает функцию не чаще указанное количество раз в указанный интервал
 @param {Function} Функция
 @param {Number} Частота вызова
 @param {Number} Интервал
 @return {Function}
 */
function delayCallFrequency(func, frequency = 1, timeout = 1000) {

    if (typeof func !== 'function'){
        throw new Error(func + " is not a Function")
    }

    let timer = null;
    let callsCount = 0;
    let isCallable = true;

    return function () {
        if (isCallable){
            if (callsCount < frequency) {
                func.apply(this, arguments);
                callsCount ++;
            } else {
                isCallable = false;
                callsCount = 0;
                timer = setTimeout(function () {
                    isCallable = true;
                }, timeout)
            }
        }
    }

}