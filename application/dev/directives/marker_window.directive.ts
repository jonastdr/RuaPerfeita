class MarkerWindowDirective {

    restrict = 'E';

    constructor() {

    }

    link(scope, elem, attrs, controller) {
        scope.like = () => {
            console.log('gostei');
        }

        scope.unlike = () => {
            console.log('desisti');
        }
    }

    static init() {
        return new MarkerWindowDirective();
    }

}

Boot.app.directive('mapsMarkerWindow', MarkerWindowDirective.init);