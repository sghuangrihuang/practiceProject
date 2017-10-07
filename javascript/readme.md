## setTimeout(fn, 0) 存在的问题

`Javascript`单线程运行，`setTimeout(fn, 0)`，会立即添加到队列中，不代表会立即执行，需要等待前面的代码执行完毕，`setTimeout`是否及时取决于`Javascript`线程是拥挤还是空闲。

`alert`会造成阻塞，弹出的`alert`会中断`setTimeout`的计时功能，关闭对话框后，`setTimeout`的时间会重新开始计时，而不是从中断处。

