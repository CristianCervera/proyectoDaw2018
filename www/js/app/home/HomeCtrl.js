app.controller('HomeCtrl', function ($scope, $ionicSideMenuDelegate, $ionicPopup, LoginService, $state, $window, $ionicLoading, EmpresasService) {

            $scope.crearAlert = crearAlert;
            $scope.logout = logout;

            ///////////////////////////////////////////

            $scope.$on( "$ionicView.enter", function( scopes, states ) {
                $scope.name = window.localStorage.getItem('user');
            });

            //////////////////////// FUNCION LOGUEAR USUARIO /////////////////////////////////
            function logout() {

                // inicio
                $ionicLoading.show({
                    template: 'Cerrando Sesión... <br><br> <ion-spinner icon="android"></ion-spinner>'
                    //duration: 3000
                }).then(function(){
                    //?
                });

                LoginService.logout().then(function (resp) {

                    console.log(resp);

                    $ionicLoading.hide().then(function(){
                    });

                    $state.go('login');
                    

                }, function (err) {

                    // final
                    $ionicLoading.hide().then(function(){
                    });
                    console.log(err);

                })

            }

            //////////////////////////////////////////////////////////////////////////////////////////////////
            

            //////////////////////// FUNCION PARA CREAR ALERT //////////////////////
            function crearAlert(string){
                $scope.showPopup = function () {

                    var alertPopup = $ionicPopup.alert({
                        title: "",
                        template: "<p class=textCenter>" + string + "</p>"
                    });

                    alertPopup.then(function (res) {

                    })

                };

                $scope.showPopup();
            }
            ////////////////////////////////////////////////////////////////////////
            

    })