app.controller('DiasCtrl', function ($scope, EmpresasService, $stateParams, $ionicModal, $q, $window) {

    $scope.dias = [];
    $scope.listarDias = listarDias;
    $scope.datosDia = datosDia;
    $scope.editarDia = editarDia;
    $scope.borrarDia = borrarDia;
    $scope.imprMes = imprMes;

    var id = parseInt($stateParams.id);

    moment.locale('ES');

    /////////////////////////////////////

    function listarDias() {

        EmpresasService.diasMes(id).then(function correcto(resp) {

            for (var i = 0; i < resp[0].workingDays.length; i++) {

                if(resp[0].workingDays[i].inHour1 == ""){

                    var year = resp[0].Year;
                    var month = resp[0].Month;
                    var dayInMonth = resp[0].workingDays[i].idDay;

                    var diaSemanal = moment(month + '/' + dayInMonth + '/' + year).format('dddd');

                    $scope.dias.push({dia: resp[0].workingDays[i], clase: 'numDiaLibre', diaSemana: ucWords(diaSemanal), horasTrabajadas: "0"});

                } else {

                    var year = resp[0].Year;
                    var month = resp[0].Month;
                    var dayInMonth = resp[0].workingDays[i].idDay;

                    var diaSemanal = moment(month + '/' + dayInMonth + '/' + year).format('dddd');

                    if(diaSemanal === 'sábado' || diaSemanal === 'domingo'){

                        var diaa = resp[0].workingDays[i];

                        
                        
                        //////// Calculo diferencia de horas para saber horas trabajadas
                        var horaentrada1temp = diaa.inHour1.split(":");
                        var horaentrada1 = parseFloat(horaentrada1temp[0] + "." + horaentrada1temp[1]);

                        var horasalida1temp = diaa.outHour1.split(":");
                        var horasalida1 = parseFloat(horasalida1temp[0] + "." + horasalida1temp[1]);

                        if(diaa.inHour2 != "" && diaa.outHour2 != ""){

                            var horaentrada2temp = diaa.inHour2.split(":");
                            var horaentrada2 = parseFloat(horaentrada2temp[0] + "." + horaentrada2temp[1]);

                            var horasalida2temp = diaa.outHour2.split(":");
                            var horasalida2 = parseFloat(horasalida2temp[0] + "." + horasalida2temp[1]);

                        } else {

                            var horaentrada2 = 0;
                            var horasalida2 = 0;

                        }

                        if(diaa.pactadas != "" && diaa.voluntarias != ""){

                            var hextra = parseFloat(diaa.pactadas) + parseFloat(diaa.voluntarias);

                        }else{

                            var hextra = 0;

                        }
                        
                        var calculoHoras = (horasalida1 - horaentrada1) + (horasalida2 - horaentrada2) + hextra;
                        //////////////////

                        $scope.dias.push({dia: resp[0].workingDays[i], clase: 'numDiaLibre', diaSemana: ucWords(diaSemanal), horasTrabajadas: calculoHoras});

                    } else {

                        var diaa = resp[0].workingDays[i];

                        //////// Calculo diferencia de horas para saber horas trabajadas
                        var horaentrada1temp = diaa.inHour1.split(":");
                        var horaentrada1 = parseFloat(horaentrada1temp[0] + "." + horaentrada1temp[1]);

                        var horasalida1temp = diaa.outHour1.split(":");
                        var horasalida1 = parseFloat(horasalida1temp[0] + "." + horasalida1temp[1]);

                        if(diaa.inHour2 != "" && diaa.outHour2 != ""){

                            var horaentrada2temp = diaa.inHour2.split(":");
                            var horaentrada2 = parseFloat(horaentrada2temp[0] + "." + horaentrada2temp[1]);

                            var horasalida2temp = diaa.outHour2.split(":");
                            var horasalida2 = parseFloat(horasalida2temp[0] + "." + horasalida2temp[1]);

                        } else {

                            var horaentrada2 = 0;
                            var horasalida2 = 0;

                        }
                        
                        if(diaa.pactadas != "" && diaa.voluntarias != ""){

                            var hextra = parseFloat(diaa.pactadas) + parseFloat(diaa.voluntarias);

                        }else{

                            var hextra = 0;
                            
                        }               
                            
                        
                        var calculoHoras = (horasalida1 - horaentrada1) + (horasalida2 - horaentrada2) + hextra;
                        //////////////////////////

                        /////// comprobación si hace el mismo horario que tiene por defecto

                        var inh1 = resp[0].idEmployee.inHour1;
                        var outh1 = resp[0].idEmployee.outHour1;
                        var inh2 = resp[0].idEmployee.inHour2;
                        var outh2 = resp[0].idEmployee.outHour2;
                        
                        if( inh1 === diaa.inHour1 && outh1 === diaa.outHour1 && inh2 === diaa.inHour2 && outh2 === diaa.outHour2){

                                $scope.dias.push({dia: resp[0].workingDays[i], clase: 'numDia', diaSemana: ucWords(diaSemanal), horasTrabajadas: calculoHoras});

                            } else {

                                $scope.dias.push({dia: resp[0].workingDays[i], clase: 'numDiaAlterado', diaSemana: ucWords(diaSemanal), horasTrabajadas: calculoHoras});

                            }
                        

                        //////////////////////////////////////

                        
                    }

                }

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

    //////// FUNCION PARA EDITAR DIA /////////////////////
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


    ///////////////// GENERAR PDF DEL MES ///////////////////////////
    function imprMes(){

        EmpresasService.imprMes(id).then( function correcto(resp){

            console.log(resp);

        }, function error(error){

            console.log(error);

        });

    }
    /////////////////////////////////////////////////////////////////

    listarDias();

})