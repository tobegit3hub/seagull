
# Seagull Design And Implement

Seagull is implemented in Go and JavaScript with tools like Beego, AngularJS, Bootstrap, Bower, JQuery and Docker. Wait, wait, wait. It's not so complicated. I will introduce you what's the architecture and technology of seagull. You may implement a better HTTP service after reading this.

## Overview

Seagull actually is a Web service running on your localhost. There'is a API server running to access your docker unix socket to get data of docker, which is written with Beego framework. Beego accept requests and response the HTML file as a HTTP server as well. But most logic of the web page is controlled by the MVC front-end framework, AngularJS. We don't use database and the website is totally stateless. There're some tools like Bower help to mange the JavaScript dependency and Bootstrap helps to style the web pages. We're also using JQuery.gritter for notification and Angular-translate for i18n(internationalization) which will highly improve the user experience. Let's start with each component.

## Web Server

The web server is responsible for accepting HTTP requests and response the HTML file to browsers. There're so many choices for you no matter what language you prefer. Finally I choose Beego because it's full-feature, high-performance and easy to use.

Please refer to <https://github.com/tobegit3hub/seagull/blob/master/docs/2014-10-23-use-beego-as-web-server.md> and I will tell how seagull implements its web server.

After reading this, you know how to process HTTP requests and return a complete web page. But it's not all seagull has been done. Actually seagull server can process the API requests.

## API Server

The API server is responsible for accepting HTTP requests and response the specified data. In modern development, RESTful(Representational State Transfer) is the industry standard. So web service like seagull should implement RESTful interfaces for front-end users.

Please refer to <https://github.com/tobegit3hub/seagull/blob/master/docs/2014-10-24-use-beego-as-api-server.md>. I will introduce how to implement a simple API server with beego and how seagull server works.

## Front-end Framework

Front-end framework is really important for single page application. If you have experienced seagull, you may find that it's fast and data changes dynamically. It benifites from the front-end MVC framework. What's more, the code is much cleaner than just using pure JavaScript.

Please refer to <https://github.com/tobegit3hub/seagull/blob/master/docs/2014-10-25-use-angulr.md> and I will tell you how the easiest way to use AngualrJS.

## Manage Dependency

Currently we're using JavaScript libraries like angular, angular-route, jquery, bootstrap, jquery.gritter, angular-translate, angular-translate-storage-local and angular-cookies. How can I manage this dependency or upgrade some of these libraries? Now you need Bower, a package manager for the web.

Please refer to <https://github.com/tobegit3hub/seagull/blob/master/docs/2014-10-26-use-bower-to-manage-dependency.md>. It's super easy to use this powerful tool for your website.

## Website Style

As stated about, seagull is using Bootstrap to style all the web pages. It's a popular front-end framework which provides a clean, beautiful and standard UI for us. The best of all is that it releases you from the hell of writing CSS and JavaScript.

Please refer to <https://github.com/tobegit3hub/seagull/blob/master/docs/2014-10-27-how-seagull-use-bootstrap.md> which show the basic usage of Bootstrap.

## Notification

Bootstrap doesn't provide a pretty way for notification, but JQuery.gritter does. It's a JavaScript library and no need to configure it. I would just say one more time, "It's easy to use and gorgeous to see".

Please refer to <https://github.com/tobegit3hub/seagull/blob/master/docs/2014-10-28-use-jquerygritter-for-notification.md>. I will show you how to use it.

## I18n

I18n(internationalization) is an important part of seagull to improve the user experience. Espectially for non-English users, the option of changing languages means a lot for them. Currently, English, simplified Chinese and traditional Chinese are perfectly supported. Angular-translate is a great project to help me to achieve this.

Please refer to <https://github.com/tobegit3hub/seagull/blob/master/docs/2014-10-18-implement-i18n-with-angular-translate.md> and it shows how to support i18n in your Angular project.

## Package

Finally I would like to introduce how to package seagull. Seagull can run in docker container so that you can run one command to setup and start it. It's one of the advantage of docker. The only difficult part is how to write the Dockerfile for the project.

Please refer to <https://github.com/tobegit3hub/seagull/blob/master/docs/2014-10-20-seagull-dockerfile.md> which tells all the detail of seagull's Dockerfile.
