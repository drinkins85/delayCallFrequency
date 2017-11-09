**Мы уделяем большое внимание производительности наших приложений. Нередко случается, что отдельно взятая функция (например, обработчик события) работает достаточно долго, а вызывается часто, что сильно ухудшает «отзывчивость» интерфейса.** 
   
#### Предложите общее решение, которое позволит вызывать любую функцию не чаще N раз в секунду, даже если её вызов происходит чаще.

```
/**
 Вызывает функцию не чаще указанное количество раз в указанный интервал
 @param {Function} func Функция
 @param {Number} [frequency=1] Частота вызова
 @param {Number} [timeout=1000] Интервал
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
```

#### Пример использования

```
function doSmthWthCoords(x,y) {
    console.log(x,":",y)
};

// Не чаще одного раза в секунду
let printCoords = delayCallFrequency(doSmthWthCoords, 1, 1000);

document.addEventListener('mousemove', function (e) {
    printCoords(e.screenX, e.screenY);
});

```