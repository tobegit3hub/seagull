
# Implement Search In Angular

If you have experienced seagull, you may notice that searching in seagull is super fast. Do you know why? Because it's implemented in front-end which benefics from AngularJS.

## Official Tutorial

If you're new to AngularJS, I recommand you to read the simple tutorial from <https://docs.angularjs.org/tutorial/step_00>. It use AngualrJS to implement a simple but powerful single page application. One of those steps introduce how to implement search in AngularJS.

## How To Implement It

Now I would like to show you the code of seagull to implement search.

Firstly, we add a search filter when we list all objects in seagull/static/html/containers.html.

```
<tbody>
  <tr ng-repeat="container in containers | filter: search track by $index">
    <td>{{container.Names | array_to_string}}</td> <!-- Add comma between names -->
    <td>{{container.Image}}</td>
    <td>{{container.Command}}</td>
  </tr>
</tbody>
```
The name of this filter is arbitrary and here's "search". I will use "search" in the same containers.html.

```
 <div class="page-header-right input-group">
   <input type="text" class="form-control" placeholder="{{'search'|translate}}" ng-model="search" autofocus>
 </div>
```

The most important code is `ng-model` which will get the data from the input. Because the data of AngularJS is two-way binding so the filter is dynamically changed when we input something.

## Any Problem?

That's all about how we implement search in seagull. If you have any problem, don't hesitate to contact me.
