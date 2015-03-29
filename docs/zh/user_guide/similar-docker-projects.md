
# 类似的Docker项目

现在有很多类似的项目提供了Web界面来监控Docker。海鸥就是受他们影响并且期望做得比他们更好。

我想把这些项目都介绍给你们，任何人都可以根据他们所需要的进行选择。

## Dockerui

这是它的Github主页，<https://github.com/crosbymichael/dockerui>.

你可以发现海鸥的UI是有点像Dockerui。因为我们都使用了Bootstrap和AngularJS作为前端框架。它是一个很好的项目并且在Github上有差不多2000个关注。

海鸥从Dockerui中学习了很多，包括使用JQuery.Gritter作为网站通知。但Dockerui的界面不够简洁，而且它没有考虑到国际化的需求，而我们考虑到了。我们愿意为全世界的开发者多做些事情。Dockerui还没有实现搜索功能而海鸥则很擅长这点。

Dockerui和海鸥是同类型产品，用于监控Docker。你没必要同时使用他们。而我们的目标就是用一个更友好、更实用的UI满足用户，并且取代Dockerui。

## Zdocker

这是它的Github主页，<https://github.com/love320/Zdocker>.

Zdocker做了同类的事情来监控Docker镜像和容器。但它是使用Java实现的，而且没有提供Docker镜像，而且人们很难使用和学习。

这只能算是个人项目，我并不建议你去使用。因为目前为止我也不知道该怎样去运行它。

## Shipyard

这是它的Github主页，<https://github.com/shipyard/shipyard>.

Shipyard设计来管理一个Docker集群。你必须输入服务器的SSH认证代码才能部署Shipyard引擎。然后你就可以通过命令行或者Web界面在你管理的服务器上部署容器了。

它和海鸥是非常不同的，因为海鸥仅仅是监控Docker而不会要求更多的权限。因此你可以使用Shipyard作为管理系统，同时使用海鸥来监控Docker。

## CAdvisor

这是它的Github主页，<https://github.com/google/cadvisor>.

CAdvisor来自于Google，它主要是为了分析容器的资源。你可以使用它来监控你的容器占用CPU或者内存的历史情况。

然后，你不能用CAdivsor来管理你的镜像和容器。

## Docker Registry Web

这是它的Github主页，<https://github.com/atc-/docker-registry-web>.

这是为Docker参与设计的Web界面。它的UI展示不错但你必须手动添加私有仓库地址。它用了Cookies来存储这个地址所以每次你运行时都要重新添加。

当我尝试去搜索Docker镜像时程序崩溃了。当我尝试去或者镜像详细信息的时候它显示“方法未授权”。

我希望他们可以在我们添加私有仓库时就默认添加Docker官方仓库。但我不太可能因为<http://registry.hub.docker.com>不支持CORS。

## Docker Registry UI

这是它的Github主页，<https://github.com/worksap-ate/docker-registry-ui>.

这也是为Docker仓库设计的Web界面。它能用但是UI不是很好。

## Docker Register Frontend

这是它的Github主页，<https://github.com/kwk/docker-registry-frontend>.

这几乎是跟Docker-registry-web和Docker-registry-ui是一样的东西。
