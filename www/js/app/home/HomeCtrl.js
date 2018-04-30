app.controller('HomeCtrl', function ($scope, $ionicSideMenuDelegate, $ionicPopup, LoginService, $state, $window, $ionicLoading, EmpresasService) {

            $scope.crearAlert = crearAlert;
            $scope.logout = logout;

            ///////////////////////////////////////////

            $scope.$on( "$ionicView.enter", function( scopes, states ) {
                $scope.name = window.localStorage.getItem('user');
            });

            //////////////////////// FUNCION LOGUEAR USUARIO /////////////////////////////////
            function logout() {

                $scope.showConfirm = function() {
                    var confirmPopup = $ionicPopup.confirm({
                      template: 'Está seguro de cerrar la sesión?',
                      buttons:[
                          {text: 'Cancelar',
                          type: 'button-positive'},
                          {text: '<p class="salir">Salir</p>',
                        onTap: function(){return true}}
                      ]
                    });
                 
                    confirmPopup.then(function(res) {
                      if(res) {

                        console.log(res);
                        // inicio
                        $ionicLoading.show({
                            template: 'Cerrando Sesión... <br><br> <ion-spinner icon="android"></ion-spinner>'
                            //duration: 3000
                        }).then(function(){
                            //?
                        });

                        LoginService.logout().then(function (resp) {

                            $ionicLoading.hide().then(function(){
                            });

                            $state.go('login');
                            

                        }, function (err) {

                            // final
                            $ionicLoading.hide().then(function(){
                            });
                            console.log(err);

                        })

                      } else {
                        
                      }
                    });
                  };

                  $scope.showConfirm();

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