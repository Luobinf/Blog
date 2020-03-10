##  初识HTTP

[![8Cclmq.md.jpg](https://s2.ax1x.com/2020/03/10/8Cclmq.md.jpg)](https://imgchr.com/i/8Cclmq)

[![8Cgybq.md.jpg](https://s2.ax1x.com/2020/03/10/8Cgybq.md.jpg)](https://imgchr.com/i/8Cgybq)

[![8Cc0n1.md.jpg](https://s2.ax1x.com/2020/03/10/8Cc0n1.md.jpg)](https://imgchr.com/i/8Cc0n1)

[![8CcGkT.md.jpg](https://s2.ax1x.com/2020/03/10/8CcGkT.md.jpg)](https://imgchr.com/i/8CcGkT)


### TCP三次握手详细过程

[![8CgfGF.png](https://s2.ax1x.com/2020/03/10/8CgfGF.png)](https://imgchr.com/i/8CgfGF)

1 第二行中， A 发送了 SEQ 100，标志位是 SYN；
2 第三行，B 发回了 ACK 101 与 SEQ 300，标志位是 SYN 与 ACK（两个过程合并了）。注意，ACK 是101意味着，B 希望接收到 101序列号开始的数据段。
3 第四行，A 返回了空的数据，SEQ 101， ACK 301，标志位为 ACK。至此，双方的开始 SEQ （也就是 ISN）号100与300都被确认接收到了。
4 第五行，开始正式发送数据包，注意的是 ACK 依旧是第四行的301，因为没有需要 ACK 的 SYN 了（第四行已经 ACK 完）。

以上，4 最后这个确认的过程，是可以带上数据的。

### 使用wireshark进行抓包
打开wireshark，开始进行抓包，命令行输入 ping www.baidu.com，待页面跳转时，停止进行抓包。
从下图中可以看到在发生HTTP请求报文之前，的确是要进行TCP三次握手的，
握手过程就是前面所述。

[![8CocZQ.md.png](https://s2.ax1x.com/2020/03/10/8CocZQ.md.png)](https://imgchr.com/i/8CocZQ)

### HTTP协议的简单特点
HTTP协议用于客户端和服务端之间的通信，通过HTTP请求报文和响应报文达到双方的通信目的。

HTTP是不保存状态的协议，即无状态协议。也就是说协议本身不保留对之前的请求或响应中的一些信息，这是为了便于更快的处理大量事物，才将HTTP协议设计成如此简单的。

HTTP/1.1 虽然是无状态协议，但为了实现保存状态功能引入了Cookie。

#### 持久连接节省通信量
HTTP协议的初始版本中，每进行一次HTTP通信就要断开一次TCP连接。对于当年的通信量来说是可行的，因为都是些容量很小的文本传输，所以没有多大问题。
但是对于现在来说，一个网页中会包含大量的图片，在发送请求访问HTML页面资源的同时，也会请求该HTML页面包含的其他资源。因此，每次的请求都会造成无畏的TCP连接建立和断开，增加通信量的开销。
#### 持久连接
为了解决上述问题，HTTP/1.1引入了持久连接，也成为HTTP keep-alive。持久连接的特点是只要一方没有明确提出断开连接，则保持TCP连接状态。

