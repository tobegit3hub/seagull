
# Use JQuery.Gritter For Notification

JQuery.Gritter is A small growl-like notification plugin for jQuery. It's easy to use and leaves  users a impressive experiences. Seagull has used it for notification and you can apply it for your websites, too.

## Official Tutorial

Here is the Github page of JQuery.Gritter, <https://github.com/jboesch/Gritter>. If you want to use it, this blog from <http://boedesign.com/blog/2009/07/11/growl-for-jquery-gritter/> should not be missed to introduce the use cases of JQuery.Gritter. There is also a demo website for it, <http://boedesign.com/demos/gritter/>.

## How To Use It

Seagull has installed JQuery.Gritter by using Bower. Just run `bower install jquery.gritter --save` and it automatically downloads the js and css files in bower_components. If you're not familiar with Bower, I recommand to read [use-bower-to-manage-dependency](2014-10-26-use-bower-to-manage-dependency.md).

If you're not using Bower, you can go to the official website to download the js and css files. To notice that the css file is important which will style the notification box.

## How Seagull Use It

Seagull includes the JQuery.Gritter in seagull/views/index.html.

```
 <link rel="stylesheet" type="text/css" href="static/bower_components/jquery.gritter/css/jquery.gritter.css">

 <script src="static/bower_components/jquery.gritter/js/jquery.gritter.min.js"></script>
```

We have also written functions to encapsulate the usage of JQuery.Gritter in seagull/static/js/controllers.js. But it's really simple.

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

So when we want to notify something, we can directly call this JavaScript functions like these in the same controllers.js.

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

## Any Problem?

That's all about our usage of JQuery.Gritter. If you have any problem, please don't hesitate to contact me.
