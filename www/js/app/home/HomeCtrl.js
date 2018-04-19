app.controller('HomeCtrl', function ($scope, $ionicSideMenuDelegate, LoginService, $state, $window, $ionicLoading) {

            $scope.crearAlert = crearAlert;
            $scope.logout = logout;

            ///////////////////////////////////////////
    
            function logout() {

                // ventana spinner cerrando sesion
                $ionicLoading.show({
                    template: 'Cerrando sesión... <br><br> <ion-spinner icon="android"></ion-spinner>'
                    //duration: 3000
                }).then(function(){
                    //?
                });

                LoginService.logout().then(function correcto(resp){

                    $state.go('login');

                }, function error(error){



                });

                $ionicLoading.hide().then(function(){
                });
    
            }

            $scope.name = window.localStorage.getItem('user');

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