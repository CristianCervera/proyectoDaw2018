app.controller('EmpleadoCtrl', function ($scope, $q, $stateParams, EmpresasService, $ionicModal, $window, $ionicPopup, $ionicLoading) {

    $scope.empleados = [];
    $scope.companies = [];
    $scope.listar = listar;
    $scope.datosEmpleado = datosEmpleado;
    $scope.editarEmpleado = editarEmpleado;
    $scope.nuevoEmpleado = nuevoEmpleado;
    $scope.listarCompanies = listarCompanies;
    $scope.imprMes = imprMes;
    var id = $stateParams.id;

    ////////////////////////////////////////////////////////////////////////

    $scope.$on( "$ionicView.enter", function( scopes, states ) {
        
        $scope.empleados = [];
        $scope.listar(id);

    });

    ///// FUNCION PARA LISTAR LOS EMPLEADOS SEGÚN ID DE EMPRESA ///////////
    function listar(id) {

        EmpresasService.trabajadoresEmpresa().then(function correcto(resp) {

            for (var i = 0; i < resp.length; i++) {

                if (resp[i].idCompany.id == id) {

                    $scope.empleados.push(resp[i]);

                }

            }


        }, function error(error) {

            console.log(error);

        });

    }
    ////////////////////////////////////////////////////////////////////////

    /////// FUNCTION PARA LISTAR UN EMPLEADO RECIBIENDO UN ID /////////////

    function datosEmpleado(id) {

        var deferred = $q.defer();

        EmpresasService.trabajadorEmpresa(id).then(function correcto(resp) {

            deferred.resolve(resp[0]);

        }, function error(error) {

            console.log(error);

            deferred.reject(error);

        });

        return deferred.promise;
    }
    ////////////////////////////////////////////////////////////////////////

    ///////////////// FUNCION PARA MODAL DE EDITAR EMPLEADO ///////////////

    $ionicModal.fromTemplateUrl('modal.html', {

        scope: $scope,
        animation: 'slide-in-up'

    }).then(function (modal) {

        $scope.modal = modal;

    });

    $scope.openModalEdit = function (id) {

        $scope.datosEmpleado(id).then(function (resp) {

            $scope.empleado = {
                id: resp.id,
                name: resp.name,
                lastname: resp.lastname,
                nif: resp.nif,
                nAfiliacion: resp.nAfiliacion,
                inHour1: resp.inHour1,
                outHour1: resp.outHour1,
                idCompany: resp.idCompany,
                inHour2: resp.inHour2,
                outHour2: resp.outHour2
            };

            $scope.modal.show();

        }, function (error) {

        });

    };

    $scope.closeModalEditEmpleado = function () {

        $scope.modal.hide();

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

    ////////////////// FUNCION PARA EDITAR UN EMPLEADO /////////////////////
    function editarEmpleado(empleado) {

        var data = {
            name: empleado.name,
            nif: empleado.nif,
            nAfiliacion: empleado.nAfiliacion,
            lastname: empleado.lastname,
            inHour1: empleado.inHour1,
            outHour1: empleado.outHour1,
            idCompany: empleado.idCompany.id,
            inHour2: empleado.inHour2,
            outHour2: empleado.outHour2
        };

        EmpresasService.editarEmpleado(empleado.id, data).then(function (resp) {

            $scope.closeModalEditEmpleado();
            $scope.empleados = [];
            $scope.listar(id);

        }, function (error) {

            console.log(error);

        });

    }
    ////////////////////////////////////////////////////////////////////////

    /////////////////// FUNCION PARA AÑADIR EMPELADOS //////////////////////
    function nuevoEmpleado(datos) {

        var empleado = {
            name: datos.name,
            nif: datos.nif,
            lastname: datos.lastname,
            afiliacion: datos.afiliacion,
            inHour1: datos.inHour1,
            outHour1: datos.outHour1,
            inHour2: datos.inHour2,
            outHour2: datos.outHour2,
            idCompany: id
        }

        // inicio
        $ionicLoading.show({
            template: '<ion-spinner icon="android"></ion-spinner>'
            //duration: 3000
          }).then(function(){
              //?
          });

        EmpresasService.nuevoEmpleado(empleado).then(function correcto(resp) {
            
            $ionicLoading.hide().then(function(){});
            $scope.closeModalNuevoEmpleado();
            $scope.empleados = [];
            $scope.listar(id);

        }, function error(error) {

            console.log(error);

            if(error.data.success === "El objeto que intentas modificar ya existe en la BD."){

                $ionicLoading.hide().then(function(){});
                crearAlert("El Empleado ya existe");

            }

        });

    }
    ////////////////////////////////////////////////////////////////////////

    ///////////////// FUNCION PARA MODAL DE AÑADIR EMPLEADO ////////////////

    $ionicModal.fromTemplateUrl('modalNuevoEmpleado.html', {

        scope: $scope,
        animation: 'slide-in-up'

    }).then(function (modal) {

        $scope.modal2 = modal;

    });

    $scope.openModalNew = function (id) {

        $scope.modal2.show();

    };

    $scope.closeModalNuevoEmpleado = function () {

        $scope.modal2.hide();

    };

    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function () {

        $scope.modal2.remove();

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

    /////////////// FUNCION LISTAR EMPRESAS //////////////////////////////
    function listarCompanies() {

        EmpresasService.listar().then(function correcto(resp) {

            for (var i = 0; i < resp.length; i++) {

                $scope.companies = resp;
            }

        }, function error(error) {

            console.log(error);

        })

    }
    ////////////////////////////////////////////////////////////////////////

    //////////////////////// FUNCION PARA CREAR ALERT //////////////////////
    function crearAlert(string) {
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

    ///////////////// FUNCION PARA MODAL DE IMPRIMIR MES //////////////////////////////////

    $ionicModal.fromTemplateUrl('modalImprimirMes.html', {

        scope: $scope,
        animation: 'slide-in-up'

    }).then(function (modal) {

        $scope.modalImprimirMes = modal;

    });

    $scope.openModalImpr = function (id) {

        $scope.mes = {
            idMonth: moment().format('M'),
            idYear: moment().format('YYYY')

        }

        $scope.modalImprimirMes.show();

    };

    $scope.closeModal = function () {

        $scope.modalImprimirMes.hide();
        $scope.empleados = [];
        $scope.listar();
    };

    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function () {

        $scope.modalImprimirMes.remove();

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

    //////////////////// FUNCION IMPRIMIR MESES //////////////////////////
    function imprMes(datos) {

        if ($scope.empleados.length == 0) {

            crearAlert("No existen empleados asignados a esta empresa");

        } else {

            $ionicLoading.show({
                template: 'Imprimiendo... <br><br> <ion-spinner icon="android"></ion-spinner>'
                //duration: 3000
            }).then(function () {
                //?
            });

            for (var x = 0; x < $scope.empleados.length; x++) {

                var idUsuario = $scope.empleados[x].id;

                EmpresasService.imprMeses(idUsuario, datos).then(function correcto(resp) {

                    if (resp.document) {

                        $ionicLoading.hide().then(function () { });
                        window.open(resp.document, '_blank');

                    } else {

                        $ionicLoading.hide().then(function () { });
                        console.log(resp.document);
                        crearAlert(resp);

                    }

                }, function error(error) {

                    $ionicLoading.hide().then(function () { });
                    console.log(error);

                });



            }

        }

    }


    ////////////////////////////////////////////////////////////////////////

    $scope.listarCompanies();

});