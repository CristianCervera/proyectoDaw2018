function config (ionicConfigProvider) {

    ionicConfigProvider.tabs.position('bottom');
}

config.$inject = ['$ionicConfigProvider'];
app.config(config);