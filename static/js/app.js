
'use strict';

/* The seagull angular application */
var seagull = angular.module('seagull', [
  'ngRoute',
  'seagullControllers',
  'pascalprecht.translate'
]);

/* Configurate application like router and others*/
seagull.config(['$locationProvider', '$routeProvider',
  function($locationProvider, $routeProvider) {
    /* Remove the # in url from Angular */
    $locationProvider.html5Mode(true);

    /* Set router, all in /js/controllers.js */
    $routeProvider.
      when('/', {
        templateUrl: '/static/html/home.html',
        controller: 'HomeController'
      }).
      when('/containers', {
        templateUrl: '/static/html/containers.html',
        controller: 'ContainersController'
      }).
      when('/containers/:id', {
        templateUrl: '/static/html/container.html',
        controller: 'ContainerController'
      }).
      when('/images', {
        templateUrl: '/static/html/images.html',
        controller: 'ImagesController'
      }).
      when('/images/:id', {
        templateUrl: '/static/html/image.html',
        controller: 'ImageController'
      }).
      when('/images/:user/:repo', {
        templateUrl: '/static/html/image.html',
        controller: 'ImageController'
      }).
      when('/configuration', {
        templateUrl: '/static/html/configuration.html',
        controller: 'ConfigurationController'
      });
      /* No default page for angular
      otherwise({
        redirectTo: '/'
      }); */
  }]
);

/* File size filter, code from https://gist.github.com/yrezgui/5653591 */
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

/* Filter to convert string array into string */
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

/* Filter to convert boolean into string */
seagull.filter( 'boolean_to_string', function () {
  return function( bool ) {
    /* Todo: seems not work
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

seagull.controller('IndexController', function ($scope, $translate) {
  $scope.changeLanguage = function (key) {
    $translate.use(key);
  };

  $scope.isEnUs = function () {
     return $translate.use() == "en-us";
  }

  $scope.isZhCn = function () {
	   return $translate.use() == "zh-cn";
  }

  $scope.isZhHant = function () {
     return $translate.use() == "zh-hant";
  }
});

seagull.config(function ($translateProvider) {

  $translateProvider.preferredLanguage('en-us');

  $translateProvider.translations('en-us', {
    // Index html
    seagull: 'Seagull',
    containers: 'Containers',
    images: 'Images',
    configuration: 'Configuration',
    more: 'More',
    zh_cn: '简体中文',
    zh_hant: '繁體中文',
    en_us: 'English',
    need_help: 'Need Help',
    // Home page
    error_to_load_data_from_docker_deanmon_please_check_seagull_and_configuration: 'Error to load data from docker deamon. Please check seagull and configuration.',
    period: '.',
    the_best_friend_of_docker: 'the best friend of docker',
    im_using: 'I\'m using',
    with_kernel: 'with kernel',
    and_docker: 'and Docker',
    the_docker_deamon_has: 'The docker deamon has',
    running_stopped_containers_and: 'running/stopped containers and',
    images_now: 'images now',
    docker_is_an_open_platform_for_distributed_application_for_developers_and_sysadmins: 'Docker is an open platform for distributed application for developers and sysadmins.',
    and_seagull_provides_a_friendly_web_ui_to_monitor_docker: 'and seagull provides a friendly Web UI to monitor docker.',
    github: 'Github',
    go_now: 'Go now!',
    learn_more: 'Learn More',
    containers_page_display_all_running_and_stopped_docker_containers: 'Containers page display all running and stopped docker containers.',
    images_page_display_all_docker_images_to_start_stop_and_delete: 'Images page display all docker images to start, stop and delete.',
    configuration_page_display_all_your_docker_environment_and_settings:'Configuration page display all your docker environment and settings.',
    seagull_is_open_source_in_Github_welcome_to_contribution_and_issues: 'Seagull is open source in Github. Welcome to contribution and issues.',
    // Containers page
    search: 'Search',
    no_docker_container: 'No docker container!',
    id: 'Id',
    names: 'Names',
    image: 'Image',
    command: 'Command',
    created: 'Created',
    status: 'Status',
    ports: 'Ports',
    operation: 'Operation',
    // Images page
    no_docker_image: 'No docker image!',
    repotags: 'RepoTags',
    virtualsize: 'VirtualSize',
    delete: 'Delete',
    // Container page
    container: 'Container',
    start: 'Start',
    stop: 'Stop',
    refresh: 'Refresh',
    no_such_container: 'No such container!',
    attribute: 'Attribute',
    value: 'Value',
    name: 'Name',
    running: 'Running',
    startedat: 'StartedAt',
    publishallports: 'PublishAllPorts',
    links: 'Links',
    openstdin: 'OpenStdin',
    uid: 'UID',
    pid: 'PID',
    c: 'C',
    stime: 'STIME',
    tty: 'TTY',
    time: 'TIME',
    cmd: 'CMD',
    // Image page
    no_such_image: 'No such image!',
    author: 'Author',
    architecture: 'Architecture',
    comment: 'Comment',
    dockerversion: 'DockerVersion',
    os: 'Os',
    parent: 'Parent',
    size: 'Size',
    // Configuration page
    no_data_of_version_or_info: 'No data of version or info',
    goversion: 'GoVersion',
    version: 'Version',
    gitcommit: 'GitCommit',
    apiversion: 'ApiVersion',
    driver: 'Driver',
    executiondriver: 'ExecutionDriver',
    KernelVersion: 'KernelVersion',
    debug: 'Debug',
    nfd: 'NFD',
    ngoroutines: 'NGoroutines',
    neventslistener: 'NEventsListener',
    initpath: 'InitPath',
    initsha1: 'InitSha1',
    indexserveraddress: 'IndexServerAddress',
    memorylimit: 'MemoryLimit',
    swaplimit: 'SwapLimit',
    ipv4forwarding: 'IPv4Forwarding',
    sockets: 'Sockets'
  });

  $translateProvider.translations('zh-cn', {
    // Index html
    seagull: '海鸥',
    containers: '容器',
    images: '镜像',
    configuration: '配置',
    more: '更多',
    zh_cn: '简体中文',
    zh_hant: '繁體中文',
    en_us: 'English',
    need_help: '帮助',
    // Home page
    error_to_load_data_from_docker_deanmon_please_check_seagull_and_configuration: '从Docker中获取数据失败，请检查Docker和海鸥的配置',
    period: '。',
    the_best_friend_of_docker: 'docker的最佳小伙伴',
    im_using: '我正在使用',
    with_kernel: '内核版本',
    and_docker: '和Docker',
    the_docker_deamon_has: '目前Docker有',
    running_stopped_containers_and: '正在运行或者停止的容器和',
    images_now: '镜像',
    docker_is_an_open_platform_for_distributed_application_for_developers_and_sysadmins: 'Docker是为开发和运维人员设计的分布式应用的开放平台。',
    and_seagull_provides_a_friendly_web_ui_to_monitor_docker: '而海鸥为Docker的监控提供了友好的界面',
    github: 'Github',
    go_now: '马上进入！',
    learn_more: '了解更多',
    containers_page_display_all_running_and_stopped_docker_containers: '容器页面展示了所有正在运行或者停止运行的Docker容器。',
    images_page_display_all_docker_images_to_start_stop_and_delete: '镜像页面展示了所有Docker镜像，并且可以启动、停止和删除。',
    configuration_page_display_all_your_docker_environment_and_settings:'配置页面展示了当前所有Docker的运行环境和配置信息。',
    seagull_is_open_source_in_Github_welcome_to_contribution_and_issues: '海鸥项目已经在Github开源，欢迎任何人参与讨论和贡献。',
    // Containers page
    search: '搜索',
    no_docker_container: '没有Docker容器！',
    id: 'Id',
    names: '名字',
    image: '镜像',
    command: '命令',
    created: '创建',
    status: '状态',
    ports: '端口',
    operation: '操作',
    // Images page
    no_docker_image: '没有Docker镜像',
    repotags: '项目标签',
    virtualsize: '虚拟大小',
    delete: '删除',
    // Container page
    container: '容器',
    start: '启动',
    stop: '停止',
    refresh: '刷新',
    no_such_container: '没有这个容器！',
    attribute: '属性',
    value: '值',
    name: '名字',
    running: '正在运行',
    startedat: '开始时间',
    publishallports: '开放所有端口',
    links: '连接',
    openstdin: '打开标准输入',
    uid: 'UID',
    pid: 'PID',
    c: 'C',
    stime: 'STIME',
    tty: 'TTY',
    time: 'TIME',
    cmd: 'CMD',
    // Image page
    no_such_image: '没有这个镜像！',
    author: '作者',
    architecture: '架构',
    comment: '评论',
    dockerversion: 'Docker版本',
    os: '操作系统',
    parent: '父镜像',
    size: '大小',
    // Configuration page
    no_data_of_version_or_info: '没有版本数据',
    goversion: 'Go版本',
    version: '版本',
    gitcommit: 'Git提交版本',
    apiversion: 'API版本',
    driver: '驱动',
    executiondriver: '执行驱动',
    KernelVersion: '内核版本',
    debug: '调试',
    nfd: 'Fd数',
    ngoroutines: 'Go例程数',
    neventslistener: '事件监听数',
    initpath: '初始路径',
    initsha1: '初始散列',
    indexserveraddress: '索引服务器地址',
    memorylimit: '内存限制',
    swaplimit: 'SWAP限制',
    ipv4forwarding: 'IPv4转发',
    sockets: '套接字'
  });

  $translateProvider.translations('zh-hant', {
    // Index html
    seagull: '海鷗',
    containers: '容器',
    images: '鏡像',
    configuration: '配置',
    more: '更多',
    zh_cn: '简体中文',
    zh_hant: '繁體中文',
    en_us: 'English',
    need_help: '幫助',
    // Home page
    error_to_load_data_from_docker_deanmon_please_check_seagull_and_configuration: '從Docker中獲取數據失敗，請檢查Docker和海鷗的配置',
    period: '。',
    the_best_friend_of_docker: 'docker的最佳小夥伴',
    im_using: '我正在使用',
    with_kernel: '內核版本',
    and_docker: '和Docker',
    the_docker_deamon_has: '目前Docker有',
    running_stopped_containers_and: '正在運行或者停止的容器',
    images_now: '鏡像',
    docker_is_an_open_platform_for_distributed_application_for_developers_and_sysadmins: 'Docker是爲開發和運維人員設計的分佈式應用的開放平臺。',
    and_seagull_provides_a_friendly_web_ui_to_monitor_docker: '而海鷗爲Docker的監控提供了友好的界面',
    github: 'Github',
    go_now: '馬上進入！',
    learn_more: '瞭解更多',
    containers_page_display_all_running_and_stopped_docker_containers: '容器頁面展示了所有正在運行或者停止運行的Docker容器。',
    images_page_display_all_docker_images_to_start_stop_and_delete: '鏡像頁面展示了所有Docker鏡像，並且可以啓動、停止和刪除。',
    configuration_page_display_all_your_docker_environment_and_settings:'配置頁面展示了當前所有Docker的運行環境和配置信息。',
    seagull_is_open_source_in_Github_welcome_to_contribution_and_issues: '海鷗項目已經在Github開源，歡迎任何人參與討論和共享。',
    // Containers page
    search: '搜索',
    no_docker_container: '沒有Docker容器！',
    id: 'Id',
    names: '名字',
    image: '鏡像',
    command: '命令',
    created: '創建',
    status: '狀態',
    ports: '端口',
    operation: '操作',
    // Images page
    no_docker_image: '没有Docker鏡像',
    repotags: '項目標籤',
    virtualsize: '虛擬大小',
    delete: '刪除',
    // Container page
    container: '容器',
    start: '啓動',
    stop: '停止',
    refresh: '刷新',
    no_such_container: '没有这个容器！',
    attribute: '屬性',
    value: '值',
    name: '名字',
    running: '正在運行',
    startedat: '開始時間',
    publishallports: '開放所有端口',
    links: '連接',
    openstdin: '打開標準輸入',
    uid: 'UID',
    pid: 'PID',
    c: 'C',
    stime: 'STIME',
    tty: 'TTY',
    time: 'TIME',
    cmd: 'CMD',
    // Image page
    no_such_image: '没有这个鏡像！',
    author: '作者',
    architecture: '架構',
    comment: '評論',
    dockerversion: 'Docker版本',
    os: '操作系統',
    parent: '父鏡像',
    size: '大小',
    // Configuration page
    no_data_of_version_or_info: '沒有版本數據',
    goversion: 'Go版本',
    version: '版本',
    gitcommit: 'Git提交版本',
    apiversion: 'API版本',
    driver: '驅動',
    executiondriver: '執行驅動',
    KernelVersion: '內核版本',
    debug: '調試',
    nfd: 'Fd數',
    ngoroutines: 'Go例程數',
    neventslistener: '事件監聽數',
    initpath: '初始路徑',
    initsha1: '初始散列',
    indexserveraddress: '索引服務器地址',
    memorylimit: '內存限制',
    swaplimit: 'SWAP限制',
    ipv4forwarding: 'IPv4轉發',
    sockets: '套接字'
  });
});
