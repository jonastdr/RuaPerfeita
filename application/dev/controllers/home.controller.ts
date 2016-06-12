class HomeController {

    public map;
    
    constructor(scope: IScope, Maps: MapsFactory) {
        this.map = Maps.map;

        MapsFactory.clickAction = function (obj: IMarkerProp) {
            Maps.addMarker({
                position: obj.position,
                icon: Maps.icones.nao_semafaro,
                template: MarkerTemplate,
                title: 'Lombada'
            });
        }

        Maps.init(scope);
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
    '$scope',
    'Maps'
];

HomeController.config.$inject = [
    '$routeProvider'
];

Boot.app
    .controller('HomeController', HomeController)
    .config(HomeController.config);
