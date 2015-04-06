# Conf

Here's the configuration of Beego project.

## App.conf

It's quite a simple configuration file and you just need to edit the port or add more items.

```
# HTTP Server
appname = seagull
httpport = 10086
runmode = pro
#runmode = dev

# For AngularJS
CopyRequestBody = true
AutoRender = false
TemplateLeft = {{<
TemplateRight = >}}
```

Currently we just change the default port of seagull and add some rules for AngularJS.
