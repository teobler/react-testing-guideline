这里使用了三种方式来测试 request

1. mock request client, 然后通过 assert 这个 mock 方法来测试 request 是否符合我们的预期
2. 使用第三方库来充当 request matcher 的角色，只有 request 所有的属性（host/path/method/param/...）都符合我们的定义测试才算通过
3. 在测试环境中启动一个 mock server 直接充当一个服务器来接收前端的 request，这时候测试不关心实现细节，只要按照正常接收到的 response 去 assert 组件中的内容即可

reference：
 - [Stop Mocking Fetch](https://kentcdodds.com/blog/stop-mocking-fetch)
