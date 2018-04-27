function appRoute (stateProvider, urlRouterProvider) {

    stateProvider

    .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
      })

      .state('home', {
        url: '/home',
        abstract: true,
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl'
      })

      .state('home.empresas', {
        url: '/empresas',
        cache: false,
        views: {
          'content': {
            templateUrl: 'templates/menu/empresas.html',
            controller: 'EmpresasCtrl'
          }
        }
      })

      .state('home.empleados-empresa', {
        url: '/empleados-empresa/:id',
        views: {
          'content': {
            templateUrl: 'templates/menu/empleados-empresa.html',
            controller: 'EmpleadoCtrl'
          }
        }
      })

      .state('home.meses-empleado', {
        url: '/meses-empleado/:id',
        views: {
          'content': {
            templateUrl: 'templates/menu/meses-empleado.html',
            controller: 'MesesCtrl'
          }
        }
      })

      .state('home.meses-detail', {
        url: '/meses-detail/:id',
        views: {
          'content': {
            templateUrl: 'templates/menu/meses-detail.html',
            controller: 'DiasCtrl'
          }
        }
        })

      .state('home.acercade', {
        url: '/acercade',
        cache: false,
        views: {
          'acercade': {
            templateUrl: 'templates/menu/acercade.html',
            controller: 'EmpresasCtrl'
          }
        }
      })

        urlRouterProvider.otherwise('/login');

}

appRoute.$inject = ['$stateProvider', '$urlRouterProvider'];
app.config(appRoute);