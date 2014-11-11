
# 实现Angular过滤器

Angular过滤器是用户处理数据的工具。通常我们使用过滤器来获得我们想要的数据，或者格式化数据的输出。

实现我们自己的过滤器很简单而且很有必要。

## 官方教程

如果你对AngularJS不熟悉，推荐你阅读[使用AngularJS](2014-10-25-use-angularjs.md)

这里是Angular过滤器的官方网站和一个简单的示例程序，<https://docs.angularjs.org/api/ng/filter/filter>。

## 海鸥如何使用它

海鸥已经是实现了三个过滤器。

第一个过滤器用于将文件大小转化为用户可读的字符串。源代码来自于<https://gist.github.com/yrezgui/5653591>。

```
seagull.filter( 'filesize', function () {
  var units = [
    'bytes',
    'KB',
    'MB',
    'GB',
    'TB',
    'PB'
  ];

  return function( bytes, precision ) {
    if ( isNaN( parseFloat( bytes )) || ! isFinite( bytes ) ) {
      return '?';
    }

    var unit = 0;
    while ( bytes >= 1024 ) {
      bytes /= 1024;
      unit ++;
    }
    return bytes.toFixed( + precision ) + ' ' + units[ unit ];
  };
});
```

当我们需要输出镜像大小的时候，我们就可以使用它。

```
 <td>{{image.VirtualSize | filesize:2}}</td>
```

海鸥的第二个过滤器是将数组转化成字符串。

```
seagull.filter( 'array_to_string', function () {
  return function( strings ) {
    if ( !Array.isArray(strings) ) {
      return '';
    }

    var result = "";
    for (var i=0; i<strings.length; i++) {
      result += strings[i];
      if (i != strings.length-1) {
        result += ", ";
      }
    }
    return result;
  };
});
```

然后我们就可以在seagull/static/html/images.html使用它来输出字符串数组了。

```
 <td>{{image.RepoTags | array_to_string}}</td>
```

第三个过滤器是将布尔型输出为“true”或者“false”。

```
/* Filter to convert boolean into string */
seagull.filter( 'boolean_to_string', function () {
  return function( bool ) {
    /* Todo: Determine it is boolean or not but it seems not work
    if ( typeof bool != "boolean" ) {
      return '';
    } */

    if (bool) {
      return "true";
    } else {
      return "false";
    }
  };
});
```

最后海鸥就可以在任何需要输出布尔型数值的地方使用它。
