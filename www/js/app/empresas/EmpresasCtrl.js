app.controller('EmpresasCtrl', function ($scope, $http, EmpresasService, $ionicModal, $window, $ionicLoading) {

    $scope.empresas = [];
    $scope.listarempresas = listarempresas;
    $scope.nuevaEmpresa = nuevaEmpresa;

    ////////////////////////////////////

    /////////////// FUNCION LISTAR EMPRESAS //////////////////////////////
    function listarempresas() {

        EmpresasService.listar().then(function correcto(resp) {

            for (var i = 0; i < resp.length; i++) {

                $scope.empresas = resp;
            }

        }, function error(error) {

            console.log(error);

        })

    }
    ////////////////////////////////////////////////////////////////////////

    //////////////// FUNCION NUEVA EMPRESA /////////////////////////////////
    function nuevaEmpresa(datos){
        
        var empresa = {

            name: datos.name,
            cif: datos.cif,
            centroTrabajo: datos.centroTrabajo,
            location: datos.location,
            ccc: datos.CCC

        }

        // inicio
        $ionicLoading.show({
            template: '<ion-spinner icon="android"></ion-spinner>'
            //duration: 3000
          }).then(function(){
              //?
          });

        EmpresasService.nuevaEmpresa(empresa).then( function correcto(resp){
            $ionicLoading.hide().then(function(){});

            $scope.closeModalNuevaEmpresa();
            $scope.empresas = [];
            $scope.listarempresas();

        }, function error(error){

            console.log("No Insertada" + error);

        });

    }
    ////////////////////////////////////////////////////////////////////////

    //////////////////////// VENTANA NUEVA MODAL ///////////////////////////
    $ionicModal.fromTemplateUrl('modalNuevaEmpresa.html', {

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

    $scope.closeModalNuevaEmpresa = function () {

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

})