ShutterStep.Views.MapView = Backbone.View.extend({
  initialize: function() {
    this._markers = {};
    this.listenTo(this.collection, 'add', this.addMarker);
    this.listenTo(this.collection, 'remove', this.removeMarker);
    google.maps.event.addDomListener(window, 'load', this.initMap.bind(this));
  },

  initMap: function() {
    this.setElement(".root-map");
    var mapOptions = {
          center: { lat: 40.72506754286412, lng: -73.99687752127647},
          zoom: 12
        };
    this._map = new google.maps.Map(this.el,mapOptions);
    this._infoWindow;
    this._submitWindow;
    this.collection.each(this.addMarker.bind(this));
    this.attachMapListeners();
  },

  attachMapListeners: function () {
    google.maps.event.addListener(this._map, 'idle', this.search.bind(this));
    google.maps.event.addListener(this._map, 'click', this.createPictureForm.bind(this));
  },

  addMarker: function (picture) {
    if (this._markers[picture.id]) { return };

    var image = {
      url: picture.url,
      size: new google.maps.Size(30, 30),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(0, 30),
      scaledSize: new google.maps.Size(30, 30)
    };

    var view = this;

    var marker = new google.maps.Marker({
      position: { lat: picture.get('lat'), lng: picture.get('lng') },
      map: this._map,
      title: picture.get('name')
    });

    google.maps.event.addListener(marker, 'click', function (event) {
      view.showMarkerInfo(event, marker);
    });

    this._markers[picture.id] = marker;
  },

  createPictureForm: function (event) {
    var clickPosition = event.latLng;
    this.closeWindows();
    this._submitWindow = new google.maps.InfoWindow({
      content: JST['submitWindow'](),
      position: clickPosition
    });
    this._map.panTo(clickPosition);
    this._submitWindow.open(this._map);
  },

  events: {
    "submit": "createPicture"
  },

  createPicture: function() {

  },

  search: function () {
    var bounds = this._map.getBounds();
    var southWest = bounds.getSouthWest();
    var northEast = bounds.getNorthEast();

    var filterData = {
      lat: [southWest.lat(), northEast.lat()],
      lng: [southWest.lng(), northEast.lng()]
    };

    this.collection.fetch({
       traditional: true,
       data: { filter_data: filterData }
    });
  },

  removeMarker: function (picture) {
    var marker = this._markers[picture.id];
    marker.setMap(null);
    google.maps.event.clearInstanceListeners(marker);
    delete this._markers[picture.id];
  },

  showMarkerInfo: function (event, marker) {
    // This event will be triggered when a marker is clicked. Right now it
    // simply opens an info window with the title of the marker. However, you
    // could get fancier if you wanted (maybe use a template for the content of
    // the window?)
    this.closeWindows();
    this._infoWindow = new google.maps.InfoWindow({
      content: marker.title
    });

    infoWindow.open(this._map, marker);
  },

  closeWindows: function (id) {
    if(this._infoWindow) {
      this._infoWindow.close();
      google.maps.event.clearInstanceListeners(this._infoWindow);
    }
    if(this._submitWindow) {
      this._submitWindow.close();
      google.maps.event.clearInstanceListeners(this._submitWindow);
    }
  },

  startBounce: function (id) {
    var marker = this._markers[id];
    marker.setAnimation(google.maps.Animation.BOUNCE);
  },

  stopBounce: function (id) {
    var marker = this._markers[id];
    marker.setAnimation(null);
  }
});
