这里使用了三种方式来测试 request,并且在三种不同方式下测试了大家会遇到的不同的场景。

这三种方式分别是：
1. mock request client, 然后通过 assert 这个 mock 方法来测试 request 是否符合我们的预期
2. 使用第三方库来充当 request matcher 的角色，只有 request 所有的属性（host/path/method/param/...）都符合我们的定义测试才算通过
3. 在测试环境中启动一个 mock server 直接充当一个服务器来接收前端的 request，这时候测试不关心实现细节，只要按照正常接收到的 response 去 assert 组件中的内容即可

这里我们不讨论哪种方式更好，这里我们只是想告诉大家这三种方式应该怎么去测试 request 的不同场景，于是在三个文件中有不同的测试用例，它们分别是
- 单纯测试 request 成功的场景
- 测试某一个 request 被触发了多次的场景
- request 的 error 场景
- request 的 loading 场景

这里放上一篇文章，作者主张我们不要去 mock request client，也给出了他的一些理由：
 - [Stop Mocking Fetch](https://kentcdodds.com/blog/stop-mocking-fetch)
