app.controller('EmpleadoCtrl', function ($scope, $q, $stateParams, EmpresasService, $ionicModal, $window, $ionicPopup) {

    $scope.empleados = [];
    $scope.companies = [];
    $scope.listar = listar;
    $scope.datosEmpleado = datosEmpleado;
    $scope.editarEmpleado = editarEmpleado;
    $scope.nuevoEmpleado = nuevoEmpleado;
    $scope.listarCompanies = listarCompanies;
    var id = $stateParams.id;

    ////////////////////////////////////////////////////////////////////////


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
                nif: resp.nif,
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

    $scope.closeModal = function () {

        $scope.modal.hide();
        $window.location.reload();

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
    function editarEmpleado(empleado){

        var data = {
            name: empleado.name,
            nif: empleado.nif,
            inHour1: empleado.inHour1,
            outHour1:empleado.outHour1,
            idCompany: empleado.idCompany.id,
            inHour2: empleado.inHour2,
            outHour2: empleado.outHour2
        };

        EmpresasService.editarEmpleado(empleado.id, data).then(function(resp){
            
            $scope.closeModal();
            $window.location.reload();

        }, function(error){

            console.log(error);

        });

    }
    ////////////////////////////////////////////////////////////////////////

    /////////////////// FUNCION PARA AÑADIR EMPELADOS //////////////////////
    function nuevoEmpleado(datos){

        var empleado = {
            name: datos.name,
            nif: datos.nif,
            lastname: datos.lastname,
            afiliacion: datos.afiliacion,
            inHour1: datos.inHour1,
            outHour1: datos.outHour1,
            idCompany: id
        }

        console.log(empleado);

        EmpresasService.nuevoEmpleado(empleado).then( function correcto(resp){

            if(resp.success === "El objeto que intentas modificar ya existe en la BD."){

                crearAlert("El NIF que intentas usar ya esta registrado");

            } else {

                crearAlert("Empleado creado con éxito");
                $scope.closeModal();
                $window.location.reload();


            }
            
        }, function error(error){

            console.log("No insertado" + error);

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

    $scope.closeModal = function () {

        $scope.modal2.hide();
        $window.location.reload();

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

    $scope.listar(id);
    $scope.listarCompanies();

});