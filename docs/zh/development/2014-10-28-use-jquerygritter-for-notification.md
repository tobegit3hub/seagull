
# 使用JQuery.Gritter做通知

JQuery.Gritter是一个基于JQuery的类似Growl的通知插件。它很容易使用而且能给用户留下深刻的印象。海鸥使用了它来做网站通知，你也使用把它应用到你的网站上。

## 官方教程

这里是JQuery.Gritter的Github主页，<https://github.com/jboesch/Gritter>。如果你想使用它，不容错过这篇博客<http://boedesign.com/blog/2009/07/11/growl-for-jquery-gritter/>，它介绍了JQuery.Gritter几个使用例子。这里还有一个它的示例网站，<http://boedesign.com/demos/gritter/>。

## 如何使用它

海鸥已经通过Bower来安装JQuery.Gritter。只需要执行`bower install jquery.gritter --save`就会自动将JS和CSS文件下载到bower_components目录。如果你对Bower不熟悉，我建议你阅读[使用Bower来管理依赖](2014-10-26-use-bower-to-manage-dependency.md)。

如果你不想使用Bower，你可以到它的官方网站下载JS和CSS文件。注意CSS文件也是很重要的，它会为你美化通知窗口。

## 海鸥如何使用它

海鸥导入JQuery.Gritter在seagull/views/index.html文件中。

```
 <link rel="stylesheet" type="text/css" href="static/bower_components/jquery.gritter/css/jquery.gritter.css">

 <script src="static/bower_components/jquery.gritter/js/jquery.gritter.min.js"></script>
```

我们也写了一些函数来封装对JQuery.Gritter的使用，在seagull/static/js/controllers.js文件中。但这也是相当简单的。

```
/* Use JQuery.gritter to popup success message */
function alert_success(message) {
  $.gritter.add({
    title: 'Success!',
    text: message,
    image: 'static/img/seagull-logo.png',
    time: 3000
  });
}

/* Use JQuery.gritter to popup error message */
function alert_error(message) {
  $.gritter.add({
    title: 'Error!',
    text: message,
    image: 'static/img/seagull-logo.png',
    time: 3000
  });
}
```

当我们想通知什么事情时，我们可以直接调用这些JavaScript函数，就像在那个controllers.js所做的那样。

```
$scope.startContainer = function(id) {
  $http({
    method: 'POST',
    url: '/dockerapi/containers/' + id + "/start",
    data: '',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  }).success(function(data, status, headers, config) {
    if (status == 200) {
      alert_success("Start container " + id.substring(0,12));
      $http.get('/dockerapi/containers/json?all=1').success(function(data) {
        $scope.containers = data;
      });
    } else {
      alert_error("Start container " + id.substring(0,12));
    }
  }).error(function(data, status, headers, config) {
    alert_error("Start container " + id.substring(0,12));
  });
};
```

## 是否有疑问？

这就是关于海鸥使用JQuery.Gritter的全部代码。如果你有任何疑问，请不要犹豫马上联系我。
