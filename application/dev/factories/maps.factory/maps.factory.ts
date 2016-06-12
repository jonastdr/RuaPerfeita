import IScope = angular.IScope;
import ICompileService = angular.ICompileService;
declare var google;

class MapsFactory {

    /**
     * Escopo do controller que fez a chamada
     */
    scopeCall: IScope;
    
    /**
     * icones
     * @type {{lombada: string, nao_lombada: string, nao_estacionamento: string, nao_semafaro: string, semafaro: string}}
     */
    icones = {
        lombada: 'img/icons/lombada.png',
        nao_lombada: 'img/icons/nao_lombada.png',
        nao_estacionamento: 'img/icons/nao_estacionamento.png',
        nao_semafaro: 'img/icons/nao_semaforo.png',
        semafaro: 'img/icons/semaforo.png',
    };

    /**
     * mapa
     */
    map;

    /**
     * marcadores no mapa
     * @type {Array}
     */
    markers = [];
    
    constructor(private compile: ICompileService) {
        
    }

    click(event) {
        MapsFactory.clickAction({
            position: event.latLng
        });
    }

    /**
     * Adiciona um marcador no mapa
     * @param obj
     */
    addMarker(obj: IMarkerProp) {
        var marker: Marker = new Marker(this.map, obj, this.scopeCall, this.compile);
        
        this.markers.push(marker.get());
    }

    /**
     * Inicializa o maps
     */
    init(scope: IScope) {
        this.scopeCall = scope;
        
        var mapElem = jQuery('#map'),
            self = this;
        
        if(mapElem.length == 0) {
            throw "Não foi localizado o mapa";
        }
        
        this.map = new google.maps.Map(mapElem[0], {
            center: {
                lat: -25.0994250,
                lng: -50.1583220
            },
            zoom: 14,
        });

        google.maps.event.addListener(this.map, 'click', function(event){
            self.click(event);
        });
    }

    /**
     * Ação do click no mapa
     */
    static clickAction(prop) {
        //replace in controller
    }

    /**
     * Inicializa o factory
     * @returns {MapsFactory}
     */
    static init($compile) {
        return new MapsFactory($compile);
    }
    
}

MapsFactory.init.$inject = [
    '$compile'
];

Boot.app
    .factory('Maps', MapsFactory.init);