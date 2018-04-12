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
/*
  function orderObjectBy() {
    return function(items, field, reverse) {
        var filtered = [];
        angular.forEach(items, function(item) { filtered.push(item); });

        if(reverse) {
            filtered.sort(function (a, b) { return (b[field] > a[field] ? 1 : -1); });
        } else {
            filtered.sort(function (a, b) { return (a[field] > b[field] ? 1 : -1); });
        }

        return filtered;
    }
}
orderObjectBy.$inject = [];
app.filter('orderObjectBy', orderObjectBy);

function toArray() {
  return function (obj, addKey) {
      if (!angular.isObject(obj)) return obj;
      if ( addKey === false ) {
          return Object.keys(obj).map(function(key) {
              return obj[key];
          });
      } else {
          return Object.keys(obj).map(function (key) {
              var value = obj[key];
              console.log(value);
              return angular.isObject(value) ? Object.defineProperty(value, '$key', { enumerable: false, value: key}) : { $key: key, $value: value };
          });
      }
  };
}
toArray.$inject = [];
app.filter('toArray', toArray);
*/