
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
      "Id": "d0bd54b5889f73ced793007ecdb3a1f923b3bc6d47979e9b24a8c7f1906aee5a", // I edit it
      "Names": ["/happy_turing"] // I add it
      "Image": "base:latest",
      "Command": "echo 1",
      "Created": 1367854155,
      "Status": "Exit 0",
      "Ports":[{"PrivatePort": 2222, "PublicPort": 3333, "Type": "tcp"}],
    }]
  */

  /* Get the container objects */
  $http.get('/dockerapi/containers/json').success(function(data) {
    $scope.containers = data;
  });
}]);

seagullControllers.controller('ContainerController', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {

  /*
    {
      "Id": "4fa6e0f0c6786287e131c3852c58a2e01cc697a68231826813597e4994f1d6e2",
      "Created": "2013-05-07T14:51:42.041847+02:00",
      "Name": "/realms-wiki", // I add it
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
      }
    }
  */

  /* Get the container object */
  $http.get('/dockerapi/containers/' + $routeParams.id + '/json').success(function(data) {
    $scope.container = data;
  });
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
      "VirtualSize": 131506275,
      "ParentId": c738822faf4d5f2c93632645b4a2870a668357e961f2731a1da460d9f0001b4a // I add it
    }]
  */

  /* Get the image objects */
  $http.get('/dockerapi/images/json').success(function(data) {
    $scope.images = data;
  });
}]);

seagullControllers.controller('ImageController', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {

  /*
    {
      Architecture: "amd64",
      Author: "tobe tobeg3oogle@gmail.com",
      Comment: "",
      Config: {
          AttachStderr: false,
          AttachStdin: false,
          AttachStdout: false,
          Cmd: [
            "./bin/hbase",
            "master",
            "start"
        ],
        CpuShares: 0,
        Cpuset: "",
        Domainname: "",
        Entrypoint: null,
        Env: [
          "HOME=/",
          "PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",
          "JAVA_HOME=/usr/lib/jvm/java-7-oracle/"
        ],
        ExposedPorts: {
          16000/tcp: { },
          16010/tcp: { },
          16020/tcp: { },
          16030/tcp: { },
          2181/tcp: { }
        },
        Hostname: "b756a5b3138f",
        Image: "c207d0b37af7b71ad611e610fe29318c45cf325153aaa2a38dd547b6315cf0cf",
        Memory: 0,
        MemorySwap: 0,
        NetworkDisabled: false,
        OnBuild: [ ],
        OpenStdin: false,
        PortSpecs: null,
        StdinOnce: false,
        Tty: false,
        User: "",
        Volumes: null,
        WorkingDir: "/opt/hbase"
      },
      Container: "cc03ae59eb372918c611a97f4b8fe585a41c1004a330c87f72ad5aeaac5ffe7a",
        ContainerConfig: {
        AttachStderr: false,
        AttachStdin: false,
        AttachStdout: false,
        Cmd: [
          "/bin/sh",
          "-c",
          "#(nop) CMD [./bin/hbase master start]"
        ],
        CpuShares: 0,
        Cpuset: "",
        Domainname: "",
        Entrypoint: null,
        Env: [
          "HOME=/",
          "PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",
          "JAVA_HOME=/usr/lib/jvm/java-7-oracle/"
        ],
        ExposedPorts: {
          16000/tcp: { },
          16010/tcp: { },
          16020/tcp: { },
          16030/tcp: { },
          2181/tcp: { }
        },
        Hostname: "b756a5b3138f",
        Image: "c207d0b37af7b71ad611e610fe29318c45cf325153aaa2a38dd547b6315cf0cf",
        Memory: 0,
        MemorySwap: 0,
        NetworkDisabled: false,
        OnBuild: [ ],
        OpenStdin: false,
        PortSpecs: null,
        StdinOnce: false,
        Tty: false,
        User: "",
        Volumes: null,
        WorkingDir: "/opt/hbase"
      },
      Created: "2014-09-02T01:47:04.08306725Z",
      DockerVersion: "1.1.2",
      Id: "fd175444c76df6a70aa6453dc448d6fac907f201dc8bb712e9f68d26d9312241",
      Os: "linux",
      Parent: "c207d0b37af7b71ad611e610fe29318c45cf325153aaa2a38dd547b6315cf0cf",
      Size: 0
    }
  */

  /* Get the image object */
  if(typeof $routeParams.id === 'undefined' || $routeParams.id == null){
    $http.get('/dockerapi/images/' + $routeParams.user + "/" + $routeParams.repo + '/json').success(function(data) {
      $scope.image = data;
    });
  }else{
    $http.get('/dockerapi/images/' + $routeParams.id + '/json').success(function(data) {
      $scope.image = data;
    });
  };
}]);



seagullControllers.controller('ConfigurationController', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {

}]);
