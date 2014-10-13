
'use strict';

// https://docs.docker.com/reference/api/docker_remote_api_v1.14/

/* The angular application controllers */
var seagullControllers = angular.module('seagullControllers', []);

/* This controller to get comment from beego api */
seagullControllers.controller('HomeController', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {


}]);

seagullControllers.controller('ContainersController', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {

  /*
    [{
      "Id": "8dfafdbc3a40",
      "Image": "base:latest",
      "Command": "echo 1",
      "Created": 1367854155,
      "Status": "Exit 0",
      "Ports":[{"PrivatePort": 2222, "PublicPort": 3333, "Type": "tcp"}],
      "SizeRw":12288,
      "SizeRootFs":0
    }]
  */

}]);

seagullControllers.controller('ContainerController', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {

  /*
    {
      "Id": "4fa6e0f0c6786287e131c3852c58a2e01cc697a68231826813597e4994f1d6e2",
      "Created": "2013-05-07T14:51:42.041847+02:00",
      "Path": "date",
      "Args": [],
      "Config": {
        "Hostname": "4fa6e0f0c678",
        "User": "",
        "Memory": 0,
        "MemorySwap": 0,
        "AttachStdin": false,
        "AttachStdout": true,
        "AttachStderr": true,
        "PortSpecs": null,
        "Tty": false,
        "OpenStdin": false,
        "StdinOnce": false,
        "Env": null,
        "Cmd": [
          "date"
        ],
        "Dns": null,
        "Image": "base",
        "Volumes": {},
        "VolumesFrom": "",
        "WorkingDir":""
      },
      "State": {
        "Running": false,
        "Pid": 0,
        "ExitCode": 0,
        "StartedAt": "2013-05-07T14:51:42.087658+02:01360",
        "Ghost": false
      },
      "Image": "b750fe79269d2ec9a3c593ef05b4332b1d1a02a62b4accb2c21d589ff2f5f2dc",
      "NetworkSettings": {
        "IpAddress": "",
        "IpPrefixLen": 0,
        "Gateway": "",
        "Bridge": "",
        "PortMapping": null
      },
      "SysInitPath": "/home/kitty/go/src/github.com/docker/docker/bin/docker",
      "ResolvConfPath": "/etc/resolv.conf",
      "Volumes": {},
      "HostConfig": {
        "Binds": null,
        "ContainerIDFile": "",
        "LxcConf": [],
        "Privileged": false,
        "PortBindings": {
          "80/tcp": [
            {
                "HostIp": "0.0.0.0",
                "HostPort": "49153"
            }
          ]
        },
        "Links": ["/name:alias"],
        "PublishAllPorts": false,
        "CapAdd: ["NET_ADMIN"],
        "CapDrop: ["MKNOD"]
      }
    }
  */

}]);

seagullControllers.controller('ImagesController', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {

  /*
    [{
      "RepoTags": [
        "ubuntu:12.04",
        "ubuntu:precise",
        "ubuntu:latest"
      ],
      "Id": "8dbd9e392a964056420e5d58ca5cc376ef18e2de93b5cc90e868a1bbc8318c1c",
      "Created": 1365714795,
      "Size": 131506275,
      "VirtualSize": 131506275
    }]
  */

  /* Get the image objects */
  $http.get('/dockerapi/images/json').success(function(data) {
    /* If the data is empty string, don't return objects */
    if(typeof data[0].Id == "undefined") {
      $scope.images = null;
    } else {
      $scope.images = data;
    }
  });
}]);

seagullControllers.controller('ImageController', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {

  /*
    {
      "Created":"2013-03-23T22:24:18.818426-07:00",
      "Container":"3d67245a8d72ecf13f33dffac9f79dcdf70f75acb84d308770391510e0c23ad0",
      "ContainerConfig":
      {
        "Hostname":"",
        "User":"",
        "Memory":0,
        "MemorySwap":0,
        "AttachStdin":false,
        "AttachStdout":false,
        "AttachStderr":false,
        "PortSpecs":null,
        "Tty":true,
        "OpenStdin":true,
        "StdinOnce":false,
        "Env":null,
        "Cmd": ["/bin/bash"],
        "Dns":null,
        "Image":"base",
        "Volumes":null,
        "VolumesFrom":"",
        "WorkingDir":""
      },
      "Id":"b750fe79269d2ec9a3c593ef05b4332b1d1a02a62b4accb2c21d589ff2f5f2dc",
      "Parent":"27cf784147099545",
      "Size": 6824592
    }
  */

}]);


seagullControllers.controller('ConfigurationController', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {


}]);
