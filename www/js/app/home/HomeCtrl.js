app.controller('HomeCtrl', function ($scope, $ionicSideMenuDelegate, LoginService, $state, $window) {

            $scope.logout = function () {

                LoginService.logout();
                $state.go('login');
    
            }

            $scope.name = window.localStorage.getItem('user');

            

    })