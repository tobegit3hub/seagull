
# Seagull是如何使用Bootstrap的

Bootstrap是一个流行的前端框架。我不需要说太多关于它有多么多么的好。它既是普通用户也是开发者最好的选择。

## 官方教程

如果你还没有听说过Bootstrap，请一定要看看它的官方网站，<http://getbootstrap.com>。

## 如何使用它

Bootstrap是一个JavaScript类库，所以你需要下载它并引入到你的HTML文件中。

如果你使用Bower，只要执行`bower install bootstrap --save`就可以下载类库。你可以参考[使用Bower来管理依赖](2014-10-26-use-bower-to-manage-dependency.md)了解海鸥是如何使用Bower的。

如果你没有使用Bower，那也只要到官方网站下载JS文件即可。

我们已经引入了Bootstrap到seagull/views/index.html文件中。

```
 <script src="static/bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
```

## 海鸥如何使用它

### 导航栏

导航栏的代码有一些复杂，你可以在seagull/views/index.html看到源代码。但使用Bootstrap最终的效果是好看的而且更加易用。

```
 <div class="navbar navbar-default navbar-fixed-top" role="navigation">
   <div class="container">
     <!-- Home page button -->
     <div class="navbar-header">
       <a class="navbar-brand" href="/">{{'seagull'|translate}}</a>
     </div>

     <!-- Containers page, images page and configuration page buttons -->
     <div class="navbar-collapse collapse">
       <ul class="nav navbar-nav">
         <li><a href="/containers">{{'containers'|translate}}</a></li>
         <li><a href="/images">{{'images'|translate}}</a></li>
         <li><a href="/configuration">{{'configuration'|translate}}</a></li>
       </ul>

       <!-- A more button to change i18n languages and email me -->
       <ul class="nav navbar-nav navbar-right">
         <li class="dropdown">
           <a class="dropdown-toggle" data-toggle="dropdown" href="">{{'more'|translate}} <span class="caret"></span></a>
           <ul class="dropdown-menu" role="menu">
             <li ng-hide="isEnUs()"><a href="" ng-click="changeLanguage('en-us')">{{'en_us'|translate}}</a></li>
             <li ng-hide="isZhCn()"><a href="" ng-click="changeLanguage('zh-cn')">{{'zh_cn'|translate}}</a></li>
             <li ng-hide="isZhHant()"><a href="" ng-click="changeLanguage('zh-hant')">{{'zh_hant'|translate}}</a></li>
             <li><a href="mailto:tobeg3oogle@gmail.com?Subject=seagull" target="_top">{{'need_help'|translate}}</a></li>
           </ul>
         </li>
       </ul>
     </div>
   </div>
 </div> <!-- End of navbar -->
```

### 表格

HTML表格的默认样式是超丑的。但如果你使用了Bootstrap，不妨尝试添加“table”、“table-striped”和“table-hover”这几个类。这些可以使你的表格看起来更舒服，还有不同颜色和生动的动画。

```
 <table class="table table-striped table-hover">
   <thead>
     <tr>
       <th>{{'id'|translate}}</th>
     </tr>
   </thead>
   <tbody>
     <tr ng-repeat="container in containers | filter: search track by $index">
       <td><a ng-href="/containers/{{container.Id}}">{{container.Id | limitTo:12}}</a></td>
     </tr>
   </tbody>
 </table>
```

### 警告

当你从数据库拿不到数据时，海鸥会显示一个警告消息。通过Bootstrap添加一个带有“alert”的div很容易就可以实现。这样做既简单又优雅。

```
 <div ng-show="!containers.length" class="alert alert-danger" role="alert">{{'no_docker_container'|translate}}</div>
```

### 搜索表单

Bootstrap的表单是很漂亮的。当你点击了“input”表单，它自动地而且是渐进地变亮。你所需要做的仅仅是给它添加一个类而已。

```
 <div class="page-header-right input-group">
   <input type="text" class="form-control" placeholder="{{'search'|translate}}" ng-model="search" autofocus>
 </div>
```

## 是否有疑问？

这就是关于海鸥使用Bootstrap的全部东西。如果你有任何疑问，请不要犹豫马上联系我。
