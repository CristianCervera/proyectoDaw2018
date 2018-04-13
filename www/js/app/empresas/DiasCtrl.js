app.controller('DiasCtrl', function ($scope, EmpresasService, $stateParams, $ionicModal, $q, $window) {

    $scope.dias = [];
    $scope.listarDias = listarDias;
    $scope.datosDia = datosDia;
    $scope.editarDia = editarDia;
    $scope.borrarDia = borrarDia;

    var id = parseInt($stateParams.id);

    /////////////////////////////////////

    function listarDias() {

        EmpresasService.diasMes(id).then(function correcto(resp) {

            for (var i = 0; i < resp[0].workingDays.length; i++) {

                if(resp[0].workingDays[i].inHour1 == ""){

                    $scope.dias.push({dia: resp[0].workingDays[i], clase: 'numDiaLibre'});

                } else {

                    $scope.dias.push({dia: resp[0].workingDays[i], clase: 'numDia'});

                }
                
                //$scope.dias.push(resp[0].workingDays[i]);
                //console.log(resp[0].workingDays[i].inHour1);

            }

        }, function error(error) {

            console.log("ErrorCtrl: ", error);

        });

    }

    //////////////// CARGAR DATOS DIA //////////////////////
    function datosDia(id) {

        var deferred = $q.defer();

        EmpresasService.diasMes(id).then(function correcto(resp) {

            deferred.resolve(resp[0]);
            console.log(resp[0]);

        }, function error(error) {

            console.log(error);

            deferred.reject(error);

        });

    }
    ////////////////////////////////////////////////////////

    ////////// VENTANA MODAL EDITAR DIA ////////////////////

    $ionicModal.fromTemplateUrl('modalDia.html', {

        scope: $scope,
        animation: 'slide-in-up'

    }).then(function (modal) {

        $scope.modal = modal;

    });

    $scope.openModal = function (day) {

        $scope.dia = {
            day: day.idDay,
            inHour1: day.inHour1,
            outHour1: day.outHour1,
            inHour2: day.inHour2,
            outHour2: day.outHour2,
            pactadas: day.pactadas,
            voluntarias: day.voluntarias
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

    //////// FUNCION PARA EDITAR DIA INTENSIVO /////////////////////
    function editarDia(dia) {

        var data = {

            day: $scope.dia.day,
            inHour1: dia.inHour1,
            outHour1: dia.outHour1,
            inHour2: dia.inHour2,
            outHour2: dia.outHour2,
            pactadas: dia.pactadas,
            voluntarias: dia.voluntarias

        };

        console.log(data);

        EmpresasService.editarHoras(id, data).then(function correcto(resp) {

            if (resp) {

                $scope.closeModal();
                $window.location.reload();

            } else {

                console.log(resp);

            }

        }, function error(error) {

            Console.log(error);

        });

    }
    ////////////////////////////////////////////////////////

    ///////////// FUNCION PARA BORRAR DIA //////////////////
    function borrarDia(dia) {

        var data = {
            day: dia
        }

        EmpresasService.editarHoras(id, data).then(function correcto(resp) {

            if (resp) {

                $scope.closeModal();
                $window.location.reload();

            } else {

                console.log(resp);

            }

        }, function error(error) {

            Console.log(error);

        });

    }
    ////////////////////////////////////////////////////////

    listarDias();

})