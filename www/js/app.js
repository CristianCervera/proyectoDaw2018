var app = angular.module('starter', ['ionic'])

  .config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
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

      .state('home.perfil', {
        url: '/perfil/:name',
        views: {
          'content': {
            templateUrl: 'templates/menu/perfil.html',
            controller: 'PerfilCtrl'
          }
        }
      })

      .state('home.empresas', {
        url: '/empresas',
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
      });

    $urlRouterProvider.otherwise('login');
  })