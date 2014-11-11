
# Seagull Images Page

Images page displays all images from your docker daemon. You can know the basic status of these images and delete them easily.

## What Is Image

Docker is a container engine which is responsible for managing containers. Containers come from images and image is kind of like the static container. When we try to run a container, we have to build it from image and specify what you're gonna run.

You can delete any image with the command like `docker rmi tobegit3hub/seagull`. And you can pull it back with `docker pull tobegit3hub/seagull`. But with seagull, just a click on your browser does that for you.

## Why We Care

With seagull, you can watch the whole list of your images. But why should we care?

First of all, the images occupy the space of your disks. The image of Ubuntu 14.04 is almost 200M. So when you have lots of images in your server, it's inevitable for you to focus on the usage of images. Just delete the deprecated images and seagull makes it much easier.

Secondly, knowing all about your images helps you to use docker better. You can run the image with specified version. Currently, the images page doesn't provide the interface to search or pull images. Please let me know if you want it.

## Bug Of This Page

If you have found bugs of this page, please don't hesitate to report issues. Any suggestion is welcome.
