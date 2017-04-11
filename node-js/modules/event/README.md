#### addListener(event, listener)

* 為指定事件添加一個監聽器到監聽器數組的尾部。

#### on(event, listener)

* 為指定事件註冊一個監聽器,接收一個字符串 event 和一個回調函數。

#### once(event, listener)

* 為指定事件註冊一個單次監聽器，即監聽器最多只會觸發一次，觸發後立刻解除該監聽器。

#### removeListener(event, listener)

* 移除指定事件的某個監聽器，監聽器 必須是該事件已經註冊過的監聽器。

#### removeAllListeners([event])

* 移除所有事件的所有监听器， 如果指定事件，则移除指定事件的所有监听器。

#### setMaxListeners(n)

* 默認情況下，EventEmitters如果你添加的監聽器超過10個就會輸出警告信息。 setMaxListeners 函數用於提高監聽器的默認限制的數量。

#### listeners(event)

* 返回指定事件的監聽器數組。

#### emit(event, [arg1], [arg2], [...])

* 按參數的順序執行每個監聽器，如果事件有註冊監聽返回 true，否則返回 false。

[events](http://www.runoob.com/nodejs/nodejs-event.html)
