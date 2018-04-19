app.value('empresaApiUrl', 'http://192.168.1.109/hojasseguimiento/company');
app.value('empleadosApiUrl', 'http://192.168.1.109/hojasseguimiento/employees');
app.value('mesesApiUrl', 'http://192.168.1.109/hojasseguimiento/month');

function EmpresasService(q, http, empresaApiUrl, window, empleadosApiUrl, mesesApiUrl) {

    var self = this;
    self.listar = listar;

    self.nuevaEmpresa = nuevaEmpresa;
    self.trabajadoresEmpresa = trabajadoresEmpresa;
    self.trabajadorEmpresa = trabajadorEmpresa;

    self.editarEmpleado = editarEmpleado;
    self.borrarEmpleado = borrarEmpleado;
    self.nuevoEmpleado = nuevoEmpleado;
    self.mesesEmpleado = mesesEmpleado;

    self.diasMes = diasMes;
    self.editarHoras = editarHoras;
    self.nuevoMes = nuevoMes;

    var token = window.localStorage.getItem('token');
    var user = window.localStorage.getItem('user');

    var config = {
        headers: {
            'x-api-key': token,
            'x-api-user': user
        }
    };
    ////////////////////////////////////////////////////////////////////////


    ///////////////// FUNCION PARA LISTAR TODOS LAS EMPRESAS ///////////////
    function listar() {

        return q(function (resolve, reject) {

            http.get(empresaApiUrl, config).then(function correcto(resp) {

                if (resp.data) {
                    resolve(resp.data);
                } else {
                    reject(resp);
                    console.log("Fallo " + resp);
                }

            }, function error(error) {

                reject(error);
                console.log("Error ", resp);

            });

        })
    }
    ////////////////////////////////////////////////////////////////////////


    ///////////////// FUNCION PARA AÑADIR NUEVAS EMPRESAS //////////////////
    function nuevaEmpresa(datos) {

        return q(function (resolve, reject) {

            http.post(empresaApiUrl, datos, config).then(function correcto(resp) {

                if (resp.data) {
                    resolve(resp.data);
                } else {
                    reject(resp);
                    console.log("Error: " + resp);
                }

            }, function error(error) {

                reject(error);
                console.log("Error: " + error);

            });

        })

    }
    ////////////////////////////////////////////////////////////////////////


    ////////////// FUNCION PARA LISTAR TODOS LOS TRABAJADORES //////////////
    function trabajadoresEmpresa() {

        return q(function (resolve, reject) {

            http.get(empleadosApiUrl, config).then(function correcto(resp) {

                if (resp.data) {
                    resolve(resp.data);
                    //console.log(resp.data);
                } else {
                    reject(resp);
                    console.log("Fallo " + resp);
                }

            }, function error(error) {

                reject(error);
                console.log("Error ", error);

            });

        })

    }
    ////////////////////////////////////////////////////////////////////////

    /////// FUNCION PARA LISTAR UN TRABAJADOR RECIBIENDO UN ID /////////////
    function trabajadorEmpresa(id) {

        return q(function (resolve, reject) {

            http.get(empleadosApiUrl + "/" + id, config).then(function correcto(resp) {

                if (resp.data) {
                    resolve(resp.data);
                } else {
                    reject(resp);
                    console.log("Fallo " + resp);
                }

            }, function error(error) {

                reject(error);
                console.log("Error ", error);

            });

        })

    }
    ////////////////////////////////////////////////////////////////////////

    ////////////////// FUNCION PARA EDITAR UN EMPLEADO /////////////////////
    function editarEmpleado(id, data) {

        return q(function (resolve, reject) {

            http.put(empleadosApiUrl + "/" + id, data, config).then(function (resp) {

                if (resp.data) {

                    resolve(resp.data);

                } else {

                    reject(resp);
                    console.log("Fallo " + resp);

                }

            }, function (error) {

                reject(error);
                console.log("Error ", error);

            });

        })

    }
    ////////////////////////////////////////////////////////////////////////

    ///////////////// FUNCION PARA AÑADIR NUEVOS EMPLEADOS //////////////////
    function nuevoEmpleado(datos) {

        return q(function (resolve, reject) {

            http.post(empleadosApiUrl, datos, config).then(function correcto(resp) {

                if (resp.data.success) {

                    resolve(resp.data);

                } else {

                    reject(resp);
                    console.log("Error: " + resp);

                }

            }, function error(error) {

                reject(error);
                console.log("Error: " + error);

            });

        })

    }
    ////////////////////////////////////////////////////////////////////////

    ///////////////// FUNCION PARA BORRAR EMPLEADOS ////////////////////////
    function borrarEmpleado(datos) {

        console.log(datos);

        return q(function (resolve, reject) {

            http.delete(empleadosApiUrl + "/" + datos, config).then(function correcto(resp) {

                if (resp.data) {
                    resolve(resp.data);
                } else {
                    reject(resp);
                    console.log("Error: " + resp);
                }

            }, function error(error) {

                reject(error);
                console.log("Error: " + error);

            });

        })

    }
    ////////////////////////////////////////////////////////////////////////

    /////////////////// FUNCION PARA SACAR LOS MESES ///////////////////////
    function mesesEmpleado() {

        return q(function (resolve, reject) {

            http.get(mesesApiUrl, config).then(function correcto(resp) {

                if (resp.data) {
                    resolve(resp.data);
                    //console.log(resp.data);
                } else {
                    reject(resp);
                    console.log("Fallo " + resp);
                }

            }, function error(error) {

                reject(error);
                console.log("Error ", error);

            });

        })

    }
    ////////////////////////////////////////////////////////////////////////

    ////////// FUNCION PARA SACAR LOS DIAS TRABAJADOS DEL MES //////////////
    function diasMes(id) {

        return q(function (resolve, reject) {

            http.get(mesesApiUrl + "/" + id, config).then(function correcto(resp) {

                if (resp.data) {
                    resolve(resp.data)
                } else {
                    reject(resp);
                    console.log("Fallo: ", resp);
                }

            }, function error(error) {

                reject(error);
                console.log("Error: ", error);

            });

        })

    }
    ////////////////////////////////////////////////////////////////////////

    ////////// FUNCION PARA EDITAR LOS HORARIOS DEL DIA ////////////////////

    function editarHoras(mes, data) {

        return q(function (resolve, reject) {

            http.put(mesesApiUrl + "/" + mes, data, config).then(function correcto(resp) {

                if (resp.data) {

                    resolve(resp.data);

                } else {

                    reject(resp);
                    console.log("Fallo " + resp);

                }

            }, function error(error) {

                console.log("Error: ", error);

            });

        })

    }

    ////////////////////////////////////////////////////////////////////////

    //////////////////// FUNCION PARA CREAR MES ////////////////////////////
    function nuevoMes(data) {

        return q(function (resolve, reject) {

            http.post(mesesApiUrl, data, config).then(function correcto(resp) {

                if (resp.data) {

                    resolve(resp.data);

                } else {

                    reject(resp);
                    console.log("Fallo " + resp);

                }

            }, function error(error) {

                console.log(error);

            });

        })

    }
    ////////////////////////////////////////////////////////////////////////

    ///////////////// FUNCION PARA IMPRIMIR MES ////////////////////////////
    function imprMes(data) {

        return q(function (resolve, reject) {

            http.get(mesesApiUrl + "/" + data, config).then(function correcto(resp) {

                console.log(resp);
                
                /*if (resp.data) {

                    resolve(resp.data);

                } else {

                    reject(resp);
                    console.log("Fallo " + resp);

                }*/

            }, function error(error) {

                console.log(error);

            });

        })

    }
    ////////////////////////////////////////////////////////////////////////

    return self;

}

EmpresasService.$inject = ['$q', '$http', 'empresaApiUrl', '$window', 'empleadosApiUrl', 'mesesApiUrl'];
app.factory('EmpresasService', EmpresasService);