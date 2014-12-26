
'use strict';

/* Remove one or more strings */
Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

/* Remove the duplicated strings */
function unique(list) {
  var result = [];
  $.each(list, function(i, e) {
    if ($.inArray(e, result) == -1) result.push(e);
  });
  return result;
}

/* Canonicalize server name for remote servers or localhost */
function canonicalizeServer(server) {
  if (server == "Local") {
    return "/dockerapi";
  } else {
    return server
  }

}

/* The seagull angular application */
var seagull = angular.module('seagull', [
  'ngRoute',
  'seagullControllers',
  'ngCookies', // To save perference of i18n language
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
      }).
      when('/dockerhub', {
        templateUrl: '/static/html/dockerhub.html',
        controller: 'DockerhubController'
      });
      /* No default page for angular so that beego can process API request
      otherwise({
        redirectTo: '/'
      }); */
  }]
);

/* Filter to convert file size into readable string, code from https://gist.github.com/yrezgui/5653591 */
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

/* Refer to http://www.ng-newsletter.com/posts/angular-translate.html for i18n */
seagull.controller('IndexController', function ($scope, $rootScope, $translate, $route, $http) {

  // Default new server and display in add server dialog
  $scope.newServer = "http://96.126.127.93:2375";

  /* Change languages with the language string */
  $scope.changeLanguage = function (key) {
    $translate.use(key);
  };

  /* Determine it is English or not */
  $scope.isEnUs = function () {
     return $translate.use() == "en-us";
  }

  /* Determine it is simplified Chinese or not */
  $scope.isZhCn = function () {
	   return $translate.use() == "zh-cn";
  }

  /* Determine it is traditional Chinese or not */
  $scope.isZhHant = function () {
     return $translate.use() == "zh-hant";
  }

  /* Determine it is German or not */
  $scope.isDeDe = function () {
     return $translate.use() == "de-de";
  }

  /* Determine it is French or not */
  $scope.isFrFr = function () {
     return $translate.use() == "fr-fr";
  }

  /* The default server is local */
  $scope.currentServer = "Local"; // TODO: Use cookies or something to store them
  $scope.servers = ["Local"];
  $rootScope.canonicalServer = canonicalizeServer($scope.currentServer);
  $scope.notCurrentServers = [];

  /* Change the server */
  $scope.changeServer = function (server) { // TODO: Remove duplicated code
    $scope.currentServer = server;
    $rootScope.canonicalServer = canonicalizeServer($scope.currentServer);
    $scope.notCurrentServers = unique($scope.servers.slice(0).remove($scope.currentServer)); // Deep copy

    $route.reload();
  };

  /* Prompt a dialog to add server in list */
  $scope.addServer = function (newServer) {

    /* Check if we can access the new server */
    $http.get(canonicalizeServer(newServer) + '/_ping').success(function(data) {
      if (data === "OK") {
        alert_success("Add server " + newServer);

        $scope.servers.push(newServer)
        $scope.currentServer = newServer;
        $rootScope.canonicalServer = canonicalizeServer($scope.currentServer);
        $scope.notCurrentServers = unique($scope.servers.slice(0).remove($scope.currentServer)); // Deep copy

        $route.reload();
      }
    }).error(function(data){alert_error('Can\'t add this server')});

  };

  /* Clear all servers but Local */
  $scope.clearServers = function () {
    var isClear = confirm('Are you sure clear all servers?')
    if (isClear) {
      $scope.currentServer = "Local";
      $scope.servers = ["Local"];
      $rootScope.canonicalServer = canonicalizeServer($scope.currentServer);
      $scope.notCurrentServers = [];

      $route.reload();
    }
  }
});

/* Use angular-translate for i18n and all text should be translated here */
seagull.config(function ($translateProvider) {
  /* Use cookie to store the perference of i18n language */
  $translateProvider.useCookieStorage();

  /* The default language should be English */
  $translateProvider.preferredLanguage('en-us');

  /* Translate into English */
  $translateProvider.translations('en-us', {
    // Index html
    seagull: 'Seagull',
    containers: 'Containers',
    images: 'Images',
    configuration: 'Configuration',
    dockerhub: 'DockerHub',
    more: 'More',
    en_us: 'English',
    zh_cn: '简体中文',
    zh_hant: '繁體中文',
    de_de: 'Deutsch',
    fr_fr: 'Français',
    need_help: 'Need Help',
    // Home page
    error_to_load_data_from_docker_daemon_please_check_seagull_and_configuration: 'Error to load data from docker daemon. Please check seagull and configuration.',
    period: '.',
    the_best_friend_of_docker: 'the best friend of docker',
    im_using: 'I\'m using',
    with_kernel: 'with kernel',
    and_docker: 'and Docker',
    the_docker_daemon_has: 'The docker daemon has',
    running_stopped_containers_and: 'running/stopped containers and',
    images_now: 'images now',
    docker_is_an_open_platform_for_distributed_application_for_developers_and_sysadmins: 'Docker is an open platform for distributed application for developers and sysadmins',
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
    filter: 'Filter',
    all: 'All',
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
    sockets: 'Sockets',
    // Dockerhub page
    search_image: 'Search Image',
    search_no_docker_image: 'Search no docker image',
    description: 'Description',
    star_count: 'StarCount',
    is_official: 'IsOfficial',
    is_automated: 'IsAutomated'
  });

  /* Translate into simplified Chinese */
  $translateProvider.translations('zh-cn', {
    // Index html
    seagull: '海鸥',
    containers: '容器',
    images: '镜像',
    configuration: '配置',
    dockerhub: '仓库',
    more: '更多',
    en_us: 'English',
    zh_cn: '简体中文',
    zh_hant: '繁體中文',
    de_de: 'Deutsch',
    fr_fr: 'Français',
    need_help: '帮助',
    // Home page
    error_to_load_data_from_docker_daemon_please_check_seagull_and_configuration: '从Docker中获取数据失败，请检查Docker和海鸥的配置',
    period: '。',
    the_best_friend_of_docker: 'Docker的最佳小伙伴',
    im_using: '我正在使用',
    with_kernel: '内核版本',
    and_docker: '和Docker',
    the_docker_daemon_has: '目前Docker有',
    running_stopped_containers_and: '个正在运行或者停止的容器和',
    images_now: '个镜像',
    docker_is_an_open_platform_for_distributed_application_for_developers_and_sysadmins: 'Docker是为开发和运维人员设计的分布式应用的开放平台',
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
    filter: '过滤器',
    all: '全部',
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
    sockets: '套接字',
    // Dockerhub page
    search_image: '搜索镜像',
    search_no_docker_image: '搜索不到Docker镜像',
    description: '描述',
    star_count: '关注个数',
    is_official: '官方镜像',
    is_automated: '自动构建镜像'
  });

  /* Translate into traditional Chinese */
  $translateProvider.translations('zh-hant', {
    // Index html
    seagull: '海鷗',
    containers: '容器',
    images: '鏡像',
    configuration: '配置',
    dockerhub: '倉庫',
    more: '更多',
    en_us: 'English',
    zh_cn: '简体中文',
    zh_hant: '繁體中文',
    de_de: 'Deutsch',
    fr_fr: 'Français',
    need_help: '幫助',
    // Home page
    error_to_load_data_from_docker_daemon_please_check_seagull_and_configuration: '從Docker中獲取數據失敗，請檢查Docker和海鷗的配置',
    period: '。',
    the_best_friend_of_docker: 'Docker的最佳小夥伴',
    im_using: '我正在使用',
    with_kernel: '內核版本',
    and_docker: '和Docker',
    the_docker_daemon_has: '目前Docker有',
    running_stopped_containers_and: '個正在運行或者停止的容器和',
    images_now: '個鏡像',
    docker_is_an_open_platform_for_distributed_application_for_developers_and_sysadmins: 'Docker是爲開發和運維人員設計的分佈式應用的開放平臺',
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
    filter: '過濾器',
    all: '全部',
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
    sockets: '套接字',
    // Dockerhub page
    search_image: '搜索鏡像',
    search_no_docker_image: '搜索不到Docker鏡像',
    description: '描述',
    star_count: '關注個數',
    is_official: '官方鏡像',
    is_automated: '自動構建鏡像'
  });

  /* Translate into German */
  $translateProvider.translations('de-de', {
    // Index html
    seagull: 'Seagull',
    containers: 'Container',
    images: 'Images',
    configuration: 'Einstellungen',
    dockerhub: 'DockerHub',
    more: 'Mehr',
    en_us: 'English',
    zh_cn: '简体中文',
    zh_hant: '繁體中文',
    de_de: 'Deutsch',
    fr_fr: 'Français',
    need_help: 'Hilfe',
    // Home page
    error_to_load_data_from_docker_daemon_please_check_seagull_and_configuration: 'Beim Laden von Daten vom Docker-Dienst trat ein Fehler auf. Bitte überprüfe Seagull und die Einstellungen.',
    period: '.',
    the_best_friend_of_docker: 'der beste Freund von Docker',
    im_using: 'Ich nutze',
    with_kernel: 'mit Kernel',
    and_docker: 'und Docker',
    the_docker_daemon_has: 'Der Docker-Dienst hat',
    running_stopped_containers_and: 'laufende/gestoppte Container und aktuell',
    images_now: 'Images',
    docker_is_an_open_platform_for_distributed_application_for_developers_and_sysadmins: 'Docker ist eine offene Plattform für verteilte Anwendungen für Entwickler und Administratoren',
    and_seagull_provides_a_friendly_web_ui_to_monitor_docker: 'und Seagull stellt eine einfach zu bedienende Web-Oberfläche zum Verwalten von Docker zur Verfügung.',
    github: 'Github',
    go_now: 'Hier lang!',
    learn_more: 'Erfahre mehr',
    containers_page_display_all_running_and_stopped_docker_containers: 'Die Container-Seite zeigt alle laufenden und gestoppten Docker-Container an.',
    images_page_display_all_docker_images_to_start_stop_and_delete: 'Die Images-Seite zeigt alle Docker-Images an und ermöglicht das Starten, Stoppen und Löschen von Images.',
    configuration_page_display_all_your_docker_environment_and_settings:'Die Einstellungsseite zeigt die gesamte Docker-Umgebung und deren Einstellungen an.',
    seagull_is_open_source_in_Github_welcome_to_contribution_and_issues: 'Seagull ist Open-Source und auf Github verfügbar. Beteiligung an der Entwicklung und Fehlermeldungen sind gerne gesehen.',
    // Containers page
    search: 'Suche',
    filter: 'Filter',
    all: 'Alle',
    no_docker_container: 'Keine Docker-Container!',
    id: 'ID',
    names: 'Namen',
    image: 'Image',
    command: 'Befehl',
    created: 'Erstellt am',
    status: 'Status',
    ports: 'Ports',
    operation: 'Anweisung',
    // Images page
    no_docker_image: 'Kein Docker-Image!',
    repotags: 'Bezeichnung (Tag)',
    virtualsize: 'Virtuelle Größe',
    delete: 'Löschen',
    // Container page
    container: 'Container',
    start: 'Starten',
    stop: 'Anhalten',
    refresh: 'Aktualisieren',
    no_such_container: 'Kein solcher Container!',
    attribute: 'Attribute',
    value: 'Wert',
    name: 'Name',
    running: 'Laufend',
    startedat: 'Gestartet am',
    publishallports: 'Alle Ports freigeben',
    links: 'Links',
    openstdin: 'Stdin offen halten',
    uid: 'UID',
    pid: 'PID',
    c: 'C',
    stime: 'STIME',
    tty: 'TTY',
    time: 'TIME',
    cmd: 'CMD',
    // Image page
    no_such_image: 'Kein solches Image!',
    author: 'Autor',
    architecture: 'Architektur',
    comment: 'Kommentar',
    dockerversion: 'Docker-Version',
    os: 'Betriebssystem',
    parent: 'Basis',
    size: 'Größe',
    // Configuration page
    no_data_of_version_or_info: 'Keine Versionsinformation.',
    goversion: 'Go-Version',
    version: 'Version',
    gitcommit: 'Git-Commit',
    apiversion: 'API-Version',
    driver: 'Treiber',
    executiondriver: 'Ausführungs-Treiber',
    KernelVersion: 'Kernel-Version',
    debug: 'Debug',
    nfd: 'NFD',
    ngoroutines: 'NGoroutines',
    neventslistener: 'NEventsListener',
    initpath: 'Init-Pfad',
    initsha1: 'Init-Sha1',
    indexserveraddress: 'Index-Server-Adresse',
    memorylimit: 'Speicher-Limit',
    swaplimit: 'Swap-Limit',
    ipv4forwarding: 'IPv4-Weiterleitung',
    sockets: 'Sockets',
    // Dockerhub page
    search_image: 'Suche Image',
    search_no_docker_image: 'Suche: Kein Docker-Image gefunden',
    description: 'Beschreibung',
    star_count: 'Anzahl an Sternen',
    is_official: 'Offiziell',
    is_automated: 'Automatisch erstellt'
  });



  /* Translate into French */
  $translateProvider.translations('fr-fr', {
    // Index html
    seagull: 'Seagull',
    containers: 'Conteneurs',
    images: 'Images',
    configuration: 'Configuration',
    dockerhub: 'DockerHub',
    more: 'Plus',
    zh_cn: '简体中文',
    zh_hant: '繁體中文',
    en_us: 'English',
    fr_fr: 'Français',
    de_de: 'German',
    need_help: 'Assistance',
    // Home page
    error_to_load_data_from_docker_daemon_please_check_seagull_and_configuration: 'Erreur de chargement des données depuis le démon docker. Merci de vérifier la configuration de seagull.',
    period: '.',
    the_best_friend_of_docker: 'le meilleur ami de docker',
    im_using: 'J\'utilise',
    with_kernel: 'avec le noyau',
    and_docker: 'et Docker',
    the_docker_daemon_has: 'Le démon docker a',
    running_stopped_containers_and: 'conteneurs démarrés ou arrêtés, ainsi que',
    images_now: 'images stockées',
    docker_is_an_open_platform_for_distributed_application_for_developers_and_sysadmins: 'Docker est une plateforme ouverte pour partager des applications entre développeurs ou administrateurs système',
    and_seagull_provides_a_friendly_web_ui_to_monitor_docker: 'seagull fournit une interface web pour monitorer docker.',
    github: 'Github',
    go_now: 'Visiter',
    learn_more: 'En savoir plus',
    containers_page_display_all_running_and_stopped_docker_containers: 'La page des conteneurs affiche tous les conteneurs docker démarrés ou arrêtés.',
    images_page_display_all_docker_images_to_start_stop_and_delete: 'La page des images affiche toutes les images docker à démarrer, arrêter ou supprimer.',
    configuration_page_display_all_your_docker_environment_and_settings:'La page de configuration affiche les informations relatives à l\'environment d\'execution de docker.',
    seagull_is_open_source_in_Github_welcome_to_contribution_and_issues: 'Seagull est open source disponible sur Github. Contributions et retours utilisateurs sont les bienvenus.',
    // Containers page
    search: 'Recherche',
    filter: 'Filtre',
    all: 'Tous',
    no_docker_container: 'Aucun conteneur docker !',
    id: 'Id',
    names: 'Noms',
    image: 'Image',
    command: 'Commande',
    created: 'Création',
    status: 'Statut',
    ports: 'Ports',
    operation: 'Opération',
    // Images page
    no_docker_image: 'Aucune image docker !',
    repotags: 'Tag',
    virtualsize: 'Espace disque',
    delete: 'Delete',
    // Container page
    container: 'Conteneur',
    start: 'Démarrer',
    stop: 'Arrêter',
    refresh: 'Rafraîchir',
    no_such_container: 'conteneur non trouvé!',
    attribute: 'Attribut',
    value: 'Valeur',
    name: 'Nom',
    running: 'démarré',
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
    no_such_image: 'Impossible de trouver cette image!',
    author: 'Auteur',
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
    sockets: 'Sockets',
    // Dockerhub page
    search_image: 'Recherche d\'Images',
    search_no_docker_image: 'La recherche n\'a retourné aucun résultat',
    description: 'Description',
    star_count: 'Nombre d\'étoiles',
    is_official: 'Officiel',
    is_automated: 'Automatisé'
  });

});
