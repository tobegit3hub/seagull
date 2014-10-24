
# Views

There's one HTML file in this directory and the others are in seagull/static/html/ because seagull is a single page application.

## Index.html

The index.html is used by Beego framework and has the common part of all these pages. Here's the entry of the website of seagull.

It uses `<div ng-view></div>` to include other pages.

And we have to load the HTML files as resources, so we put them in seagull/static/html/.
