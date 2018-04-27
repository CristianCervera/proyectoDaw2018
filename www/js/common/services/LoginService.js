app.value('baseApiUrl', 'http://192.168.1.109/hojasseguimiento/auth.php/');
app.value('usersApiUrl', 'http://192.168.1.109/hojasseguimiento/public.php/user');
app.value('logoutApiUrl', 'http://192.168.1.109/hojasseguimiento/user/logout');

function LoginService(q, http, baseApiUrl, usersApiUrl, logoutApiUrl) {

    var self = this;
    var authenticated = false;
    var myUser;
    var authToken;
    var config = {
        'x-api-key': window.localStorage.getItem('token'),
        'x-api-user': window.localStorage.getItem('user')
    };

    self.loadUserCredentials = loadUserCredentials;
    self.login = login;
    self.logout = logout;
    self.isAuthenticated = isAuthenticated;
    self.createUser = createUser;
    self.userName = userName;

    /////////////////////////////////////////////////

    function userName(){
        return window.localStorage.getItem('user');
    }
    
    function loadUserCredentials() {
        
        var token = window.localStorage.getItem('token');
        var user = window.localStorage.getItem('user');

        if (token && user) {
            useCredentials(token, user);
        }

    }

    function storeUserCredentials(token, user) {

        window.localStorage.setItem('token', token);
        window.localStorage.setItem('user', user);

        useCredentials(token, user);
    }

    function useCredentials(token, user) {

        authenticated = true;
        authToken = token;
        myUser = user;

        //Establecer cabeceras con Token y Usuario.
        http.defaults.headers.common['x-api-key'] = authToken;
        http.defaults.headers.common['x-api-user'] = myUser;
    }

    function destroyUserCredentials() {
        
        myUser = undefined;
        authToken = undefined;
        authenticated = false;
        
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('user');

        http.defaults.headers.common['x-api-key'] = undefined;
        http.defaults.headers.common['x-api-user'] = undefined;
    }

    function login(user) {

        return q(function (resolve, reject) {
            http.post(baseApiUrl + 'login', user).then(function (result) {
                
                if (result) {

                    storeUserCredentials(result.data.token, user.name);
                    resolve(result);

                } else {

                    reject(result);

                }

            }, function (error) {

                console.log(error);

                if(error.data){

                    reject(error.data.message);

                } else{

                    reject(error.data.message);

                }

            });
        })
    };

    function logout() {

        return q(function (resolve, reject) {

            http.get(logoutApiUrl, config).then(function correcto(resp) {

                destroyUserCredentials();
                resolve(resp.data);

            }, function error(error) {

                reject(error.data.message);

            });

        })
    }

    function isAuthenticated() {
        return authenticated;
    }

    /////////////// FUNCION CREAR USUARIO ////////////////////////////
    function createUser(datos){

        return q(function (resolve, reject){

            http.post(usersApiUrl, datos).then(function correcto(resp){

                if(resp.data){
                    resolve(resp.data);
                } else{
                    reject(resp);
                    console.log("Error: " + resp);
                }

            }, function error(error){

                reject(error);
                console.log("Error: " + error);

            });

        })

    }
    //////////////////////////////////////////////////////////////////

    loadUserCredentials();

    return self;

}

LoginService.$inject = ['$q', '$http', 'baseApiUrl', 'usersApiUrl', 'logoutApiUrl'];
app.factory('LoginService', LoginService);