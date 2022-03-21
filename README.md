

# ReactTestingGuideline

在实际工作中我们发现很多同学写测试是靠运气，靠某一步某名奇妙的操作让测试变绿，然后自己的任务就完成了。

我们也能够理解许多开发同学志不在此，没有时间或者是干脆对测试这件事情没有兴趣。

这个 repo 的诞生正是为了能够让不熟悉 React 测试的小伙伴能有一个抄作业的地方。

我会将我工作中遇到的情况尽量一一用例子写出来，总结出一些写测试的模式。

我想做的事情是，你不需要知道测试的逻辑是什么，你甚至可以不看官网只需要了解语法就能从这里照搬到你的项目中去。

这个repo将会有两个项目，一个项目模拟的是自己搭建的 jest config，一个项目模拟的是使用 cra 创建出来的项目。

那么为什么需要有这样的区别对待呢？因为我们确实发现 cra 会有一些隐晦的设置会修改一些 jest 的默认参数导致其行为会有一些略微不一致。

## 技术栈

- React
- Jest
- React-Testing-Library
- React-Testing-Library/react-hooks
- cypress
- MSW

## packages

 - custom 代表我们自己可以随意修改jest config的项目，我会尽量用一个通用的 config
 - cra 代表通过 cra 生成的项目

