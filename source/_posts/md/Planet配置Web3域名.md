---

title: Planet配置Web3域名
tag:
- Planet
category:
- Web3
id:  6885322357796359
date:  2025-08-08

---

Planet 项目是 V 站站长 Livid 很早之前启动的项目。最近 V 站也出了 $V2EX 币， Livid 也一直在推动区块链和 Web3 在 V 站的快速应用。跟着这个趋势，我也学习了很多这方面的知识。



>  Planet 是一款免费的开源 macOS 应用程序，用于发布和关注 Web 内容。它不依赖于中央服务器或服务，而是使用 IPFS 进行点对点内容分发。您可以将您的内容链接到以太坊名称（例如，planetable.eth），以便其他人可以使用您的 .eth 名称在 Planet 上关注您，或通过 eth.limo 或 eth.sucks 等网关访问您的 ENS 网站。由于 IPFS 和 ENS 都是去中心化的，因此 Planet 可以帮助您以去中心化的方式构建和关注网站。


了解到 Planet 的特性以及原理后，我发现 Planet 很适合做日志，随记，心情，备忘录的 Posts。正好我当前 Web2 的博客网站上没有类似的功能，索性把 Planet 的 Web 集成到博客网站上。我火速给自己搭建了 Web，并在此 Web 上链接了 Web3 的域名。你可以点击导航栏上的 『碎碎念🔗』或者直接访问我的 Web3 域名『 https://uhufoundme.sol.build/ 』，跳转到我的日常更新 Posts。


言归正题，Planet 应用能够轻松将 Web 内容发布在链上，并通过 IPFS 生成的 IPNS 访问链上内容。但是这个 IPNS 是随机的哈希值，难记，不易传播，所以就需要链接一个 Web3 域名。这里有两种方案，一种是直接买一个 Web3 的域名，类似 .eth 或者 .sol 的。另一种是 Web2 域名开启 IPNS，支持链上内容的绑定。因为我本来就有个 Web2 域名，所以一开始我想开通 IPNS 就不用再折腾了。这里吐槽一下，阿里云域名开通 IPNS 要￥120，而 .eth 域名每月几美刀，.sol 冷门域名 1 刀就可以永久拥有，那就用 .sol 吧。


## 购买域名


> Solana域名服务（SNS）的目标是提供一种去中心化且可负担的方式，将域名（.sol）和链上数据连接起来。这些链上数据可以是SOL地址、 IPFS CID、图片、文本、或者任何其它的东西。


![Solana域名主页](img/image-202588319698.png)



在 [Solana](https://www.sns.id/zh-Hans) 上购买域名需要通过 Web3钱包登录，该网站支持多种钱包，我使用的是 phantom 钱包。登录之后就可以直接在页面上搜索想要的域名，其中大部分的域名都在 20 USDC（大概 $20），一些冷门的域名可以 1 USDC 捡到，可以多试试。



![image-202588559199.png](img/image-202588559199.png)



支付时候也有多种方式，可以用 SOL，USDC，USDT 或者其他虚拟货币，甚至可以用信用卡。在这里，不讨论如何充值虚拟货币，如果有疑问可以 google。需要注意的是，**所有链上操作都需要有手续费，在充币或者兑换时候要考虑多买多充**。



![image-202588839176.png](img/image-202588839176.png)



## 绑定 IPNS



![image-2025882636315.png](img/image-2025882636315.png)

![image-2025884737529.png](img/image-2025884737529.png)



在购买之后，就可以去我的域名里面配置，将 Planet 上复制的 IPNS 复制配置好即可。这里我出现了下图的问题，一开始也不清楚什么情况。请教了一下 Livid 之后，才知道是因为绑定操作也是需要消耗 gas 的，我钱包里面 SOL 不够。然后 Livid 给我空投 0.1 SOL 之后就绑定成功。



![telegram-cloud-photo-size-5-6098227393199198658-y.jpg](img/telegram-cloud-photo-size-5-6098227393199198658-y.jpg)



这样就可以通过 https://uhufoundme.sol.build/ 访问了。在这个过程中，感谢 Livid 大佬的答疑以及空投。



得益于 IPFS 这种 P2P 的方式，在 Planet 中 Send 之后就发布在 Web 上，不需要额外的去服务器上发布内容。这种便捷的方式对我来说更适合去记录即时的灵感和感受。所以我决定在 https://uhufoundme.sol.build/ 更新些更随意，更生活的内容，在 https://www.lazydaily.cn/ 更新些更严谨，更有质量的内容。你也可以通过不同的地址来关注感兴趣的内容。
