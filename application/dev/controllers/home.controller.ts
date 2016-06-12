class HomeController {

    constructor(GoogleMaps: GoogleMapsFactory) {
        GoogleMaps.clickAction = (mapModel, eventName, originalEventArgs) => {
            GoogleMaps.addMarker({
                position: originalEventArgs[0].latLng,
                icon: GoogleMaps.icones.lombada,
                title: 'Lombada',
                template: MarkerTemplate
            });
        };
    }

    static config(route) {
        route.when('/', {
            template: homeTemplate,
            controller: 'HomeController',
            controllerAs: 'hc'
        });
    }
}

HomeController.$inject = [
    'GoogleMaps'
];

HomeController.config.$inject = [
    '$routeProvider'
];

Boot.app
    .controller('HomeController', HomeController)
    .config(HomeController.config);
