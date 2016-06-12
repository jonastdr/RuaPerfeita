class Marker {

    marker;
    window;

    constructor(private map, private props: IMarkerProp, private scopeCall: IScope, private compile: ICompileService) {
        var self = this;

        this.marker = new google.maps.Marker({
            position: props.position,
            map: this.map,
            icon: props.icon
        });

        /**
         * Se existir conteudo insere uma janela
         */
        if(props.template) {
            compile(props.template)(scopeCall);

            self.window = new google.maps.InfoWindow({
                content: props.template
            });

            self.marker.addListener('click', function() {
                self.click();
            });
        }
    }
    
    click() {
        var self = this;

        this.window.open(this.map, this.marker);

        this.scopeCall.$apply(function () {
            self.compile(jQuery('maps-marker-window'))(self.scopeCall);
        });
    }

    get() {
        return this.marker;
    }
}