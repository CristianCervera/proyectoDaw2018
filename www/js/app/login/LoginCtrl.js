angular.module('starter')

    .controller("LoginCtrl", ["$scope", "$http", "LoginService", "$window", "$ionicPopup", "$state", "$ionicModal", function ($scope, $http, LoginService, $window, $ionicPopup, $state, $ionicModal) {

        $scope.user = {};

        $scope.login = login;
        $scope.nuevoUsuario = nuevoUsuario;
        $scope.crearAlert = crearAlert;
        /////////////////////////////////////

        //////////////////////// FUNCION LOGUEAR USUARIO /////////////////////////////////
        function login() {

            LoginService.login($scope.user).then(function (resp) {

                if (resp.success == "Datos de acceso incorrectos.") {

                    crearAlert("Usuario/Contraseña Incorrectos");

                } else {

                    //codigo para redirigir a home
                    $state.go('home.empresas');


                }

            }, function (err) {

                crearAlert("Error al iniciar sesión <br> Por favor vuelva a intentarlo");

            })
        }

        //////////////////////////////////////////////////////////////////////////////////////////////////

        //////////////////////// VENTANA MODAL NUEVO USUARIO ///////////////////////////
        $ionicModal.fromTemplateUrl('registroUsuario.html', {

            scope: $scope,
            animation: 'slide-in-up'

        }).then(function (modal) {

            $scope.modal = modal;

        });

        $scope.openModal = function (id) {


            $scope.dia = {
                day: id
            }

            $scope.modal.show();

        };

        $scope.closeModal = function () {

            $scope.modal.hide();
            //$window.location.reload();

        };

        // Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function () {

            $scope.modal.remove();

        });

        // Execute action on hide modal
        $scope.$on('modal.hidden', function () {
            // Execute action
        });

        // Execute action on remove modal
        $scope.$on('modal.removed', function () {
            // Execute action
        });
        ////////////////////////////////////////////////////////////////////////

        //////////////////////// FUNCION CREAR USUARIO /////////////////////////
        function nuevoUsuario(datos) {

            if(datos === undefined){
                crearAlert("Faltan datos por Rellenar");
            }

            if(datos.name === undefined){
                crearAlert("Usuario no admitido!");
            } else if(datos.email === undefined){
                crearAlert("Email no admitido!");
            } else if(datos.pass === undefined){
                crearAlert("Contraseña no admitida!");
            } else if (datos.email === datos.email2 && datos.pass === datos.pass2) {                
                
                function validateEmail(email) {
                    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return re.test(String(email).toLowerCase());
                }

                if(!validateEmail(datos.email)){
                    crearAlert("Formato de Email incorrecto");
                }

                    var newUser = {
                        name: datos.name,
                        email: datos.email,
                        pass: datos.pass
    
                    }
                
                

                LoginService.createUser(newUser).then(function correcto(resp) {

                    if (resp.success === "El objeto que intentas modificar ya existe en la BD.") {

                        crearAlert("El usuario ya existe!");

                    } else {

                        crearAlert("Usuario Registrado Correctamente!");
                        $window.location.reload();
                    }

                }, function error(error) {

                    console.log("Error: " + error)

                });

            } else {

                crearAlert("Los datos no coinciden!");

            }

        }
        ////////////////////////////////////////////////////////////////////////

        //////////////////////// FUNCION PARA CREAR ALERT //////////////////////
        function crearAlert(string){
            $scope.showPopup = function () {

                var alertPopup = $ionicPopup.alert({
                    title: "",
                    template: string
                });

                alertPopup.then(function (res) {

                })

            };

            $scope.showPopup();
        }
        ////////////////////////////////////////////////////////////////////////

    }]);