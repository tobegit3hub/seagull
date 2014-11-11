
# Implement Angular Filter

Angular filter is the tool for user to process the data. Normally we use filter to get our interested data or format the output of them.

Implementing our own filters is easy and necessary.

## Official Tutorial

If you're not familiar with AngularJS, please refer to [Use Angular](2014-10-25-use-angularjs.md).

Here is the official website of angular filter and a simple demo, <https://docs.angularjs.org/api/ng/filter/filter>.

## How Seagull Does It

Seagull has implemented three filters.

The first one is to convert file size into readable string. The source code is from <https://gist.github.com/yrezgui/5653591>.

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

Then we can use it when I want to print the size of images.

```
 <td>{{image.VirtualSize | filesize:2}}</td>
```

The second filter of seagull is to convert string array into string.

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

Then we use it in seagull/static/html/images.html to print the string array.

```
 <td>{{image.RepoTags | array_to_string}}</td>
```

The third filter is to print the literal boolean as "true" or "false".

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

Finally seagull uses it anywhere we have to display the value of a boolean.
