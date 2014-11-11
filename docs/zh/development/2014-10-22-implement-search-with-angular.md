
# 在Angular实现搜索

如果已经使用过海鸥，你可能发现在海鸥中搜索是非常快的。你知道这是为什么吗？因为海鸥是在前端实现的搜索，这得益于使用了AngularJS框架。

## 官方教程

如果你刚接触AngularJS，我推荐你阅读这篇简单的教程，<https://docs.angularjs.org/tutorial/step_00>。它使用AngularJS来实现一个简单但强大的单页应用。其中的一个教程介绍了如何在AngularJS中实现搜索。

## 如何实现搜索

现在我想给你展示海鸥实现搜索的完整代码。

首先，我们在展示对象列表时增加了一个过滤器，在seagull/static/html/containers.html文件中。

```
<tbody>
  <tr ng-repeat="container in containers | filter: search track by $index">
    <td>{{container.Names | array_to_string}}</td> <!-- Add comma between names -->
    <td>{{container.Image}}</td>
    <td>{{container.Command}}</td>
  </tr>
</tbody>
```

这个过滤器的名字是任意的，在这里我们命令为“search”。我将会在这一个containers.html文件中使用“search”过滤器。

```
 <div class="page-header-right input-group">
   <input type="text" class="form-control" placeholder="{{'search'|translate}}" ng-model="search" autofocus>
 </div>
```

这里最重要的代码是“ng-model”，它将会从输入表单中获得数据。因为在AngularJS中数据是双向绑定的，所以当用户输入内容时，过滤器得到的结果也是动态改变的。

## 是否有疑问？

这就是海鸥使用AngularJS实现搜索的全部代码。如果你有任何疑问，请不要犹豫马上联系我。
