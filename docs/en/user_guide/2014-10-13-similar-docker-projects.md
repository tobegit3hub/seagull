
# Similar Docker Projects

There are some similar projects which provide Web UI to monitor docker. Seagull is inspired by them but we could be better than them.

I would like to introduce them to you and everyone has his or her choice to use whatever he or she wants.

## Dockerui

Here is the github page, <https://github.com/crosbymichael/dockerui>.

You may notice that UI of seagull is kind of like dockerui. Because we both use Bootstap and AngularJS as front-end frameworks. It's great project and has almost 2000 stars in github.

Seagull learns a lot from dockerui, including use JQuery.Gritter for notification. But the UI of dockerui is not clean. It will never think about i18n(internationalization) but we do. We could do more for developers all around the world. The dockerui hasn't supported search yet and seagull is good at this.

Dockerui and seagull are the same products to monitor docker daemon. You don't have to use both of them. And our goal is to replace dockerui with a more friendly and useful UI.

## Zdocker

Here is the github page, <https://github.com/love320/Zdocker>.

Zdocker does the same things to monitor images and containers of docker. But it's implemented in Java and hasn't provided the docker image, so it's hard to use and learn.

It's quite a personal project and I don't recommand you to use it. Because I haven't known how to run it yet.

## Shipyard

Here is the github page, <https://github.com/shipyard/shipyard>.

Shipyard is designed for management of docker cluster. You have to input the ssh key of the server to deploy shipyard engine. Then you can run the container with command-line or web interfaces in your managed servers.

It's quite different from seagull because seagull just monitors docker without asking for more permission. So you can use shipyard as management system and use seagull to monitor at the same time.

## CAdvisor

Here's the github page, <https://github.com/google/cadvisor>.

CAdvisor is from Google and it's mainly for analysing resources of the container. You can use it monitor the history about how much CPU or memory your containers have used.

However, you can't use cAdvisor to manage your images or containers.

## Docker Registry Web

Here is the github page, <https://github.com/atc-/docker-registry-web>.

It's the Web UI for private docker registry. The UI is nice but you have add the address of private registry manually. It uses cookies to store the address so you have to add it every time you run.

It crashes when I try to search repositories. And it occurs "Method Not Allow" when I try to get the detail of the repository.

I hope they can add official docker registry by default before we has added our private registry. But this will never work because <http://registry.hub.docker.com> doesn't support CORS.

## Docker Registry UI

Here is the github page, <https://github.com/worksap-ate/docker-registry-ui>.

It's also the Web UI for private docker registry. It works but the UI is not so good.

## Docker Register Frontend

Here is the github page, <https://github.com/kwk/docker-registry-frontend>.

Almost the same thing as docker-registry-web and docker-registry-ui.
