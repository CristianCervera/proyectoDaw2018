app.controller('MesesCtrl', function ($scope, EmpresasService, $stateParams, $window, $ionicModal, $ionicPopup, $q, $ionicLoading) {

    $scope.meses = [];
    $scope.companies = [];
    $scope.listar = listar;
    $scope.nuevoMes = nuevoMes;
    $scope.ucWords = ucWords;
    $scope.datosEmpleado = datosEmpleado;
    $scope.editarEmpleado = editarEmpleado
    $scope.listarCompanies = listarCompanies;
    $scope.imprMes = imprMes;

    var id = parseInt($stateParams.id);

    //////////////////////////////

    $scope.$on( "$ionicView.enter", function( scopes, states ) {
        
        EmpresasService.trabajadorEmpresa(id).then(function correcto(resp) {

            $scope.thisEmpleado = resp[0].name + " " + resp[0].lastname;

        }, function error(error) {

            console.log(error);

        });

        

    });

    ////// funcion para devolver un texto con la primera mayúscula
    function ucWords(string) {
        var arrayWords;
        var returnString = "";
        var len;
        arrayWords = string.split(" ");
        len = arrayWords.length;
        for (i = 0; i < len; i++) {
            if (i != (len - 1)) {
                returnString = returnString + ucFirst(arrayWords[i]) + " ";
            }
            else {
                returnString = returnString + ucFirst(arrayWords[i]);
            }
        }
        return returnString;
    }
    function ucFirst(string) {
        return string.substr(0, 1).toUpperCase() + string.substr(1, string.length).toLowerCase();
    }
    /////////////////////////////////////////////////////////////////

    function listar() {

        EmpresasService.mesesEmpleado().then(function correcto(resp) {

            var yearMonthListObj = {};
            var daysList = [];

            for (var i = 0; i < resp.length; i++) {

                var respItem = resp[i];

                if (respItem.idEmployee.id === id) {

                    if (yearMonthListObj.hasOwnProperty(respItem.Year) === false) {
                        yearMonthListObj[respItem.Year] = [];
                    }

                    moment.locale('es');
                    result = { id: respItem.id, numMonth: respItem.Month, month: ucWords(moment(respItem.Month).format('MMMM')), dayList: daysList };

                    yearMonthListObj[respItem.Year].push(result);

                }

            }

            for (var yearKey in yearMonthListObj) {
                $scope.meses.push({
                    year: yearKey,
                    monthList: yearMonthListObj[yearKey]
                });
            }

        }, function error(error) {

            console.log(error);

        });

    }

    ////////// FUNCION PARA AÑADIR NUEVO MES /////////////////////////////////////////

    function nuevoMes(datos) {

        var mes = {
            idMonth: datos.idMonth,
            idYear: datos.idYear,
            idEmployee: id
        }

        EmpresasService.nuevoMes(mes).then(function correcto(resp) {

            if (resp.success === "El objeto que intentas modificar ya existe en la BD.") {

                $scope.showPopup = function () {

                    var alertPopup = $ionicPopup.alert({
                        title: "",
                        template: "El Mes que intentas introducir ya existe!"
                    });

                    alertPopup.then(function (res) {
                    })

                };

                $scope.showPopup();

            } else {

                $scope.closeModalNuevoMes();
                $scope.meses = [];
                $scope.listar();

            }

        }, function error(error) {

            console.log(error);

        });

    }

    ////////////////////////////////////////////////////////////////////////////////////

    ///////////////// FUNCION PARA MODAL DE NUEVO MES //////////////////////////////////

    $ionicModal.fromTemplateUrl('modalNuevoMes.html', {

        scope: $scope,
        animation: 'slide-in-up'

    }).then(function (modal) {

        $scope.modalNuevoMes = modal;

    });

    $scope.openModal = function (id) {

        $scope.mes = {
            idMonth: moment().format('M'),
            idYear: moment().format('YYYY')

        }

        $scope.modalNuevoMes.show();

    };

    $scope.closeModalNuevoMes = function () {

        $scope.modalNuevoMes.hide();

    };

    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function () {

        $scope.modalNuevoMes.remove();

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

    $scope.openModalEdit = function (idEmpleado) {

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

            console.log($scope.empleado);

            $scope.modal.show();

        }, function (error) {

        });

    };

    $scope.closeModalEdit = function () {

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
    function editarEmpleado(empleado){

        var data = {
            name: empleado.name,
            lastname: empleado.lastname,
            nif: empleado.nif,
            nAfiliacion: empleado.nAfiliacion,
            inHour1: empleado.inHour1,
            outHour1:empleado.outHour1,
            idCompany: empleado.idCompany.id,
            inHour2: empleado.inHour2,
            outHour2: empleado.outHour2
        };    

        EmpresasService.editarEmpleado(empleado.id, data).then(function(resp){
            
            $scope.closeModalEdit();
            $scope.meses = [];
            $scope.listar();


        }, function(error){

            console.log(error);

        });

    }
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

    $scope.closeModalImprMes = function () {

        $scope.modalImprimirMes.hide();

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
    function imprMes(datos){

        $ionicLoading.show({
            template: 'Imprimiendo... <br><br> <ion-spinner icon="android"></ion-spinner>'
            //duration: 3000
          }).then(function(){
              //?
          });

        EmpresasService.imprMeses(id, datos).then(function correcto(resp){

            if(resp.document){

                $ionicLoading.hide().then(function(){});
                window.open(resp.document, '_blank');

            }else{

                $ionicLoading.hide().then(function(){});
                console.log(resp.document);
                
            }

        }, function error(error){

            crearAlert("Mes no trabajado")
            $ionicLoading.hide().then(function(){});
            console.log(error);

        });

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

    $scope.listarCompanies();

    $scope.listar();

})