
# How Seagull Use Bootstrap

Bootstrap is a popular front-end framework. I don't need to talk about how great it is. It's not only the best choice for normal users but also for developers. All the pages of seagull are styled by Bootstrap.

## Official Tutorial

If you haven't known about Bootstrap, please refer to its official website, <http://getbootstrap.com>.

## How To Use It

Bootstrap is a JavaScript library so you just need to download it and include it in your HTML file.

If you're using Bower, just run `bower install bootstrap --save` to download the library. You can refer to [use-bower-to-manage-dependency](2014-10-26-use-bower-to-manage-dependency.md) to know about how seagull uses Bower.

If you're not using Bower, just go to the official website and download the js file.

We have added the library in seagull/views/index.html.

```
 <script src="static/bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
```

## How Seagull Uses It

### Navigation Bar

The navigation bar is a little complicated and you can view the source code in seagull/views/index.html. But the final effect after using Bootstrap is remarkable and easier to use.

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

### Table

The default style of HTML table is ugly. But if you're using Bootstrap, have a try to add these classes "table", "table-striped" and "table-hover". These make the table comfortable to see with different colors and lively animation.

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

### Alert

When you can't get data from the server, seagull will display a alert message. It's really easy to use Bootstrap to add class "alert" for a div. This's simple and graceful.

```
 <div ng-show="!containers.length" class="alert alert-danger" role="alert">{{'no_docker_container'|translate}}</div>
```

### Search Form

The form of Bootstrap is beautiful. When you click the "input", it automatically gradually shines. All you have to do is just add a class for it.

```
 <div class="page-header-right input-group">
   <input type="text" class="form-control" placeholder="{{'search'|translate}}" ng-model="search" autofocus>
 </div>
```

## Any Problem?

That's all about our usage of Bootstrap. If you have any problem, don't hesitate to contact me.
