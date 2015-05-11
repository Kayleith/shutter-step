ShutterStep.Views.MapView = Backbone.View.extend({
  initialize: function() {
    this.setElement(".root-map");
    var mapOptions = {
          center: { lat: 40.72506754286412, lng: -73.99687752127647},
          zoom: 12
        };
    this._map = new google.maps.Map(this.el,mapOptions);
  }
});
