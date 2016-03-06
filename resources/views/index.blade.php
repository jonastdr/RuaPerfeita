<!DOCTYPE html>
<html ng-app="app">

<head>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/bootstrap.css">
    <script src="core/dev_deps.js"></script>
    <script src="https://code.angularjs.org/1.3.3/angular.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/lodash.js/2.4.1/lodash.underscore.js"></script>
    <script src="http://cdn.rawgit.com/nmccready/angular-simple-logger/0.0.1/dist/index.js"></script>
    <script src="core/dist/angular-google-maps_dev_mapped.js"></script>
    <script src="js/MainController.js"></script>
    <title>Map</title>
</head>

<body>
    <div data-ng-controller="MainController" class="row">
        <div class="col-lg-10">
            <ui-gmap-google-map id="map"
                                center="map.center"
                                pan="map.pan"
                                zoom="map.zoom"
                                draggable="true"
                                refresh="map.refresh"
                                options="map.options"
                                events="map.events"
                                bounds="map.bounds">


                <ui-gmap-drag-zoom keyboardkey="'alt'"></ui-gmap-drag-zoom>
                <ui-gmap-marker
                  ng-repeat="p in pins" idKey="$index" coords="{latitude:p.lat,longitude:p.lng}" options="{icon:p.icon}">
                    <ui-gmap-window isIconVisibleOnClick="true">
                        <div>
                            <h1 ng-bind="$parent.p.title"></h1>
                            <div>
                                votos: <span ng-bind="$parent.p.voto"></span>
                            </div>
                            <div>
                                <button ng-click="$parent.votar('like')">like</button>
                                <button ng-click="$parent.votar('dislike')">dislike</button>
                            </div>
                        </div>
                    </ui-gmap-window>
                </ui-gmap-marker>

                <!--<ui-gmap-drag-zoom options='map.dragZoom.options'></ui-gmap-drag-zoom>-->
            </ui-gmap-google-map>
        </div>
        <div class="col-lg-2">
            <img ng-class="{'active':stick.icon == 'icon/lombada.png'}" ng-click="select('lombada')" src="icon/lombada.png" alt="lombada">
            <img ng-class="{'active':stick.icon == 'icon/semaforo.png'}" ng-click="select('semaforo')" src="icon/semaforo.png" alt="semaforo">
            <img ng-class="{'active':stick.icon == 'icon/nao_semaforo.png'}" ng-click="select('nao_semaforo')" src="icon/nao_semaforo.png" alt="nao_semaforo">
            <img ng-class="{'active':stick.icon == 'icon/nao_lombada.png'}" ng-click="select('nao_lombada')" src="icon/nao_lombada.png" alt="nao_lombada">
            <img ng-class="{'active':stick.icon == 'icon/nao_estacionamento.png'}" ng-click="select('nao_estacionamento')" src="icon/nao_estacionamento.png" alt="nao_estacionamento">
        </div>
    </div>
</body>

</html>
