class HomeComponent {

    map;

    constructor(GoogleMaps: GoogleMapsFactory, scope: IScope) {
        this.map = GoogleMaps.init(scope);
    }

    votar(marcador, like: boolean) {
        console.log(1);
    }
}

HomeComponent.$inject = [
    'GoogleMaps',
    '$scope'
];

Boot.app.component('home', {
    controller: HomeComponent,
    template: `
    <ui-gmap-google-map id="map"
                        center="$ctrl.map.center"
                        pan="$ctrl.map.pan"
                        zoom="$ctrl.map.zoom"
                        draggable="true"
                        refresh="$ctrl.map.refresh"
                        options="$ctrl.map.options"
                        events="$ctrl.map.events"
                        bounds="$ctrl.map.bounds">
    
        <ui-gmap-drag-zoom keyboardkey="'alt'"></ui-gmap-drag-zoom>
        <ui-gmap-marker
                ng-repeat="marker in $ctrl.map.markers" idKey="$index" coords="{latitude:marker.lat,longitude:marker.lng}" options="{icon:marker.icon}">
            <ui-gmap-window isIconVisibleOnClick="true">
                <div>
                    <h1 ng-bind="$parent.marker.title"></h1>
                    <div>
                        votos: <span ng-bind="$parent.marker.voto"></span>
                    </div>
                    <div ng-show="!$parent.$ctrl.marker.hideButton">
                        <button ng-click="$parent.$ctrl.votar($ctrl.marker,true)">like</button>
                        <button ng-click="$parent.$ctrl.votar($ctrl.marker,false)">dislike</button>
                    </div>
                </div>
            </ui-gmap-window>
        </ui-gmap-marker>
    </ui-gmap-google-map>
    `
});