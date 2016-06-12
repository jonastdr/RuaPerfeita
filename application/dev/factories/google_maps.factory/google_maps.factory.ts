import IRootScopeService = angular.IRootScopeService;
import IScope = angular.IScope;
import IHttpService = angular.IHttpService;
class GoogleMapsFactory {

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
    
    map = {
        dragZoom: {options: {}},
    
        center: {
            latitude: -25.0994250,
            longitude: -50.1583220
        },
    
        pan: true,
    
        zoom: 14,

        refresh: false,
    
        events: {
            click: (mapModel, eventName, originalEventArgs) => {
                this.clickAction(mapModel, eventName, originalEventArgs);
            }
        },

        bounds: {},
        markers: []
    };

    private scope;
    
    constructor(private uiGmapGoogleMapApi, private $http: IHttpService, private root: IRootScopeService) {
        
    }

    clickAction(mapModel, eventName, originalEventArgs) {
        //replace in controller
    }

    /**
     * Adiciona um marcador no mapa
     * @param props
     */
    addMarker(props: IMarkerProp) {
        var marker = {
            lat: props.position.lat(),
            lng: props.position.lng(),
            icon: props.icon,
            title: props.title
        };

        this.map.markers.push(marker);

        this.scope.$apply();
    }

    getMarkers() {
        this.$http.post('/marker', {}).then(function(result){

        })
    }
    
    /**
     * Inicializa o mapa
     */
    init(scope: IScope) {
        var self = this;

        self.scope = scope;

        this.uiGmapGoogleMapApi.then(function () {
            self.map.dragZoom = {
                options: {
                    visualEnabled: true,
                    visualPosition: google.maps.ControlPosition.LEFT,
                    visualPositionOffset: new google.maps.Size(35, 0),
                    visualPositionIndex: null,
                    visualSprite: "http://maps.gstatic.com/mapfiles/ftr/controls/dragzoom_btn.png",
                    visualSize: new google.maps.Size(20, 20),
                    visualTips: {
                        off: "Turn on",
                        on: "Turn off"
                    }
                }
            }
        });
        
        return this.map;
    }

    /**
     * Configurações do mapa
     * @param uiGmapGoogleMapApiProvider
     */
    static config(uiGmapGoogleMapApiProvider) {
        uiGmapGoogleMapApiProvider.configure({
            key: 'AIzaSyANsZOAF6i4sjdMmfiKO77lnGdh_tfa_so',
            v: '3.20',
            libraries: 'weather,geometry,visualization'
        });
    }

    /**
     * Inicializa a factory
     * @returns {GoogleMapsFactory}
     */
    static init(uiGmapGoogleMapApi, http, root) {
        return new GoogleMapsFactory(uiGmapGoogleMapApi, http, root);
    }
    
}

GoogleMapsFactory.config.$inject = [
    'uiGmapGoogleMapApiProvider',
    '$http',
    '$rootScope'
];

GoogleMapsFactory.init.$inject = [
    'uiGmapGoogleMapApi'
];

Boot.app.factory('GoogleMaps', GoogleMapsFactory.init);