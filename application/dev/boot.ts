declare var google;

class Boot {
    
    public static app;
    
    constructor() {
        Boot.app = angular.module('app', [
            'ngRoute',
            'uiGmapgoogle-maps'
        ]);
    }
    
}

new Boot();