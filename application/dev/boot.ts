class Boot {
    
    public static app;
    
    constructor() {
        Boot.app = angular.module('app', [
            'ngRoute',
        ]);
    }
    
}

new Boot();