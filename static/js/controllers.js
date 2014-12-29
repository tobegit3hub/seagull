
'use strict';

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

/* All angular application controllers */
var seagullControllers = angular.module('seagullControllers', []);

/* This controller to get comment from beego api */
seagullControllers.controller('HomeController', ['$scope', '$rootScope', '$routeParams', '$http',
  function($scope, $rootScope, $routeParams, $http) {

  /* Get the version object */
  $http.get($rootScope.canonicalServer + '/version').success(function(data) {
    $scope.version = data;
    $scope.Os = $scope.version.Os;
    $scope.KernelVersion = $scope.version.KernelVersion;
    $scope.GoVersion = $scope.version.GoVersion;
    $scope.Version = $scope.version.Version;
  });

  /* Get the info object */
  $http.get($rootScope.canonicalServer + '/info').success(function(data) {
    $scope.info = data;
    $scope.Containers = $scope.info.Containers;
    $scope.Images = $scope.info.Images;
  });
}]);

/* Contaienrs controller requests beego API server to get/start/stop/delete containers */
seagullControllers.controller('ContainersController', ['$scope', '$rootScope', '$routeParams', '$http', '$cookies',
  function($scope, $rootScope, $routeParams, $http, $cookies) {

  $scope.predicate = '';
  $scope.reverse = false;

  /* Refer to https://docs.docker.com/reference/api/docker_remote_api_v1.14/#list-containers
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

  /* For the first time, display all containers by default */
  if (typeof $cookies.isAllContainers === "undefined") {
    $cookies.isAllContainers = "true"; // Only string data in cookies
  }

  /* Check cookies and get all or running container objects */
  if ($cookies.isAllContainers === "true") {
    $http.get($rootScope.canonicalServer + '/containers/json?all=1').success(function(data) {
      $scope.currentFilterString = "All"
      $scope.isAllContainers = true;
      $scope.containers = data;
    });
  } else {
    $http.get($rootScope.canonicalServer + '/containers/json?all=0').success(function(data) {
      $scope.currentFilterString = "Running"
      $scope.isAllContainers = false;
      $scope.containers = data;
    });
  }

  /* Get all containers objects */
  $scope.getAllContainers = function() {
    $http.get($rootScope.canonicalServer + '/containers/json?all=1').success(function(data) {
      $scope.currentFilterString = "All"
      $scope.isAllContainers = true;
      $cookies.isAllContainers = "true";
      $scope.containers = data;
      alert_success("Get all containers");
    });
  };

  /* Get running containers objects */
  $scope.getRunningContainers = function() {
    $http.get($rootScope.canonicalServer + '/containers/json?all=0').success(function(data) {
      $scope.currentFilterString = "Running"
      $scope.isAllContainers = false;
      $cookies.isAllContainers = "no";
      $scope.containers = data;
      alert_success("Get running containers");
    });
  };

  /* Enable to check startsWith, refer to http://stackoverflow.com/questions/646628/how-to-check-if-a-string-startswith-another-string */
  if (typeof String.prototype.startsWith != 'function') {
    // see below for better implementation!
    String.prototype.startsWith = function (str){
      return this.indexOf(str) == 0;
    };
  };

  /* Determine if the container is running */
  $scope.checkRunning = function(container) {
    if (container.Status.startsWith("Up")) {
      return true;
    } else {
      return false;
    }
  };

  /* Ports: [
      {
        PrivatePort: 16000,
        Type: "tcp"
      },
      {
        PrivatePort: 16010,
        Type: "tcp"
      },
      {
        PrivatePort: 16020,
        Type: "tcp"
      },
      {
        PrivatePort: 16030,
        Type: "tcp"
      },
      {
        IP: "0.0.0.0",
        PrivatePort: 5000,
        PublicPort: 5000,
        Type: "tcp"
      }
    ]
  */

  /* Print ports in better way */
  $scope.printPorts = function(data) {
    var returnString = "";
    for(var i = 0; i < data.length; i++) {
      var object = data[i];
      if (object["IP"]) {
        returnString += object.IP + ":" + object.PublicPort + "->" + object.PrivatePort + "/" + object.Type;
      } else {
        returnString += object.PrivatePort + "/" + object.Type;
      }

      if (i != data.length-1) {
        returnString += ", ";
      }
    }

    return returnString;
  }

  /* Request beego API server to start container */
  $scope.startContainer = function(id) {
    $http({
      method: 'POST',
      url: $rootScope.canonicalServer + '/containers/' + id + "/start",
      data: '',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function(data, status, headers, config) {
      if (status == 200) {
        alert_success("Start container " + id.substring(0,12));
        $http.get($rootScope.canonicalServer + '/containers/json?all=1').success(function(data) {
          $scope.containers = data;
        });
      } else {
        alert_error("Start container " + id.substring(0,12));
      }
    }).error(function(data, status, headers, config) {
      alert_error("Start container " + id.substring(0,12));
    });
  };

  /* Request beego API server to stop container */
  $scope.stopContainer = function(id) {
    $http({
      method: 'POST',
      url: $rootScope.canonicalServer + '/containers/' + id + "/stop",
      data: '',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function(data, status, headers, config) {
      if (status == 200) {
        alert_success("Stop container " + id.substring(0,12));
        $http.get($rootScope.canonicalServer + '/containers/json?all=1').success(function(data) {
          $scope.containers = data;
        });
      } else {
        alert_error("Stop container " + id.substring(0,12));
      }
    }).error(function(data, status, headers, config) {
      alert_error("Stop container " + id.substring(0,12));
    });
  };

  /* Request beego API server to delete container */
  $scope.deleteContainer = function(id) {
    $http({
      method: 'DELETE',
      url: $rootScope.canonicalServer + '/containers/' + id,
      data: '',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function(data, status, headers, config) {
      if (status == 200) {
        alert_success("Delete container " + id.substring(0,12));
        $http.get($rootScope.canonicalServer + '/containers/json?all=1').success(function(data) {
          $scope.containers = data;
        });
      } else {
        alert_error("Delete container " + id.substring(0,12));
      }
    }).error(function(data, status, headers, config) {
      alert_error("Delete container " + id.substring(0,12));
    });
  };

}]);

/*
 * Contaienr controller requests beego API server to get/start/stop/delete container
 * Todo: Remove the duplicated code from ContainersController
 */
seagullControllers.controller('ContainerController', ['$scope', '$rootScope', '$routeParams', '$http',
  function($scope, $rootScope, $routeParams, $http) {

  /* Refer to https://docs.docker.com/reference/api/docker_remote_api_v1.14/#inspect-a-container
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

  /*
    {
      "Titles":[
        "UID", // edit
        "PID",
        "C",
        "STIME"
        "TTY",
        "TIME",
        "CMD" // edit
      ],
      "Processes":[
         ["root","24550","24549","0","17:25","?","00:00:00","runsv cron"], // edit
         ["root","24492","24485","0","17:25","?","00:00:00","/usr/bin/python3 -u /sbin/my_init"] // edit
      ]
    }
  */

  /* Get the container object */
  $http.get($rootScope.canonicalServer + '/containers/' + $routeParams.id + '/json').success(function(data) {
    $scope.container = data;
  });

  /* Get the container top status */
  $http.get($rootScope.canonicalServer + '/containers/' + $routeParams.id + '/top').success(function(data) {
    $scope.top = data;
  });

  /* Refresh the page */
  $scope.refresh = function() {
    location.reload();
  };

  /* Request beego API server to start container */
  $scope.startContainer = function(id) {
    $http({
      method: 'POST',
      url: $rootScope.canonicalServer + '/containers/' + id + "/start",
      data: '',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function(data, status, headers, config) {
      if (status == 200) {
        alert_success("Start container " + id.substring(0,12));
        $http.get($rootScope.canonicalServer + '/containers/' + $routeParams.id + '/json').success(function(data) {
          $scope.container = data;
        });

        $http.get($rootScope.canonicalServer + '/containers/' + $routeParams.id + '/top').success(function(data) {
          $scope.top = data;
        });
      } else {
        alert_error("Start container " + id.substring(0,12));
      }
    }).error(function(data, status, headers, config) {
      alert_error("Start container " + id.substring(0,12));
    });
  };

  /* Request beego API server to stop container */
  $scope.stopContainer = function(id) {
    $http({
      method: 'POST',
      url: $rootScope.canonicalServer + '/containers/' + id + "/stop",
      data: '',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function(data, status, headers, config) {
      if (status == 200) {
        alert_success("Stop container " + id.substring(0,12));
        $http.get($rootScope.canonicalServer + '/containers/' + $routeParams.id + '/json').success(function(data) {
          $scope.container = data;
        });

        $http.get($rootScope.canonicalServer + '/containers/' + $routeParams.id + '/top').success(function(data) {
          $scope.top = data;
        });
      } else {
        alert_error("Stop container " + id.substring(0,12));
      }
    }).error(function(data, status, headers, config) {
      alert_error("Stop container " + id.substring(0,12));
    });
  };

  /* Request beego API server to delete container */
  $scope.deleteContainer = function(id) {
    $http({
      method: 'DELETE',
      url: $rootScope.canonicalServer + '/containers/' + id,
      data: '',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function(data, status, headers, config) {
      if (status == 200) {
        alert_success("Delete container " + id.substring(0,12));
        $http.get($rootScope.canonicalServer + '/containers/' + $routeParams.id + '/json').success(function(data) {
          $scope.container = data;
        });

        $http.get($rootScope.canonicalServer + '/containers/' + $routeParams.id + '/top').success(function(data) {
          $scope.top = data;
        });
      } else {
        alert_error("Delete container " + id.substring(0,12));
      }
    }).error(function(data, status, headers, config) {
      alert_error("Delete container " + id.substring(0,12));
    });
  };

}]);

/* Images controller requests beego API server to get/delete images */
seagullControllers.controller('ImagesController', ['$scope', '$rootScope', '$routeParams', '$http',
  function($scope, $rootScope, $routeParams, $http) {

  /* Refer to https://docs.docker.com/reference/api/docker_remote_api_v1.14/#inspect-an-image
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

  // Sort table, refer to https://docs.angularjs.org/api/ng/filter/orderBy
  $scope.predicate = '';
  $scope.reverse = false;

  /* Request beego API server to get images */
  $http.get($rootScope.canonicalServer + '/images/json').success(function(data) {
    $scope.images = data;
  });

  /* Request beego API server to delete image */
  $scope.deleteImage = function(id) {
    $http({
      method: 'DELETE',
      url: $rootScope.canonicalServer + '/images/' + id,
      data: '',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function(data, status, headers, config) {
      if (status == 200) {
        alert_success("Delete image " + id.substring(0,12));
        $http.get($rootScope.canonicalServer + '/images/json').success(function(data) {
          $scope.images = data;
        });
      } else {
        alert_error("Delete image " + id.substring(0,12));
      }
    }).error(function(data, status, headers, config) {
      alert_error("Delete image " + id.substring(0,12));
    });
  };
}]);

/*
 * Image controller requests beego API server to get image
 * Todo: Remove the duplicated code from ImagesController
 */
seagullControllers.controller('ImageController', ['$scope', '$rootScope', '$routeParams', '$http',
  function($scope, $rootScope, $routeParams, $http) {

  /* Refer to https://docs.docker.com/reference/api/docker_remote_api_v1.14/#inspect-an-image
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

  /* Request beego API server to get image */
  if(typeof $routeParams.id === 'undefined' || $routeParams.id == null){
    $http.get($rootScope.canonicalServer + '/images/' + $routeParams.user + "/" + $routeParams.repo + '/json').success(function(data) {
      $scope.image = data;
    });
  }else{
    $http.get($rootScope.canonicalServer + '/images/' + $routeParams.id + '/json').success(function(data) {
      $scope.image = data;
    });
  };
}]);

/* Contaienrs controller requests beego API server to get configuration */
seagullControllers.controller('ConfigurationController', ['$scope', '$rootScope', '$routeParams', '$http',
  function($scope, $rootScope, $routeParams, $http) {

    /* Refer to https://docs.docker.com/reference/api/docker_remote_api_v1.14/#show-the-docker-version-information
      {
        "ApiVersion":"1.12",
        "Version":"0.2.2",
        "GitCommit":"5a2a5cc+CHANGES",
        "GoVersion":"go1.0.3"
      }
    */

    /* Refer to https://docs.docker.com/reference/api/docker_remote_api_v1.14/#display-system-wide-information
      {
        "Containers":11,
        "Images":16,
        "Driver":"btrfs",
        "DriverStatus": [ // I add it
          [
            "Root Dir",
            "/var/lib/docker/aufs"
          ],[
            "Dirs",
            "544"
          ]
        ],
        "ExecutionDriver":"native-0.1",
        "KernelVersion":"3.12.0-1-amd64"
        "Debug":false,
        "NFd": 11,
        "NGoroutines":21,
        "NEventsListener":0,
        "InitPath":"/usr/bin/docker",
        "InitSha1": "", // I add it
        "IndexServerAddress": "https://index.docker.io/v1/", // I edit it
        "MemoryLimit":true,
        "SwapLimit":false,
        "IPv4Forwarding":true
        "Sockets": [
          "unix:///var/run/docker.sock" // I add it
        ],
      }
    */

  /*   /* Request beego API server to get the version object */
  $http.get($rootScope.canonicalServer + '/version').success(function(data) {
    $scope.version = data;
  });

  /* Request beego API server to get the info object */
  $http.get($rootScope.canonicalServer + '/info').success(function(data) {
    $scope.info = data;
  });
}]);

/* Dockerhub controller requests beego API server to get search images */
seagullControllers.controller('DockerhubController', ['$scope', '$rootScope', '$routeParams', '$http',
  function($scope, $rootScope, $routeParams, $http) {

  /*
    [{
      description: "Friendly Web UI to monitor docker daemon",
      is_official: false,
      is_trusted: true,
      name: "tobegit3hub/seagull",
      star_count: 1
    }]
  */

  /* Display the loading icon before get search images */
  $scope.isSearching = true;

  /* Request beego API server to get search images, default is seagull */
  $http.get($rootScope.canonicalServer + '/images/search?term=seagull').success(function(data) {
    $scope.isSearching = false;
    $scope.images = data;
  });

  /* Request beego API server to get search images */
  $scope.getSearchImages = function(term) {
    $scope.isSearching = true;

    $http.get($rootScope.canonicalServer + '/images/search?term=' + term).success(function(data) {
      $scope.isSearching = false;
      $scope.images = data;
      alert_success("Search images of " + term);
    }).error(function(data, status, headers, config) {
      $scope.isSearching = false;
      alert_error("Search images of " + term);
    });
  };

  /* Generate the image link by judging it's official images or not */
  $scope.getImageLink = function(name) {
    var address;

    if(name.indexOf('/') === -1) {
      // Example: https://registry.hub.docker.com/_/golang
      address = "https://registry.hub.docker.com/_/" + name;
    } else {
      // Example: https://registry.hub.docker.com/u/tobegit3hub/seagull
      address = "https://registry.hub.docker.com/u/" + name;
    }

    return address;
  };
}]);
