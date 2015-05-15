ShutterStep.Views.MapView = Backbone.CompositeView.extend({
  initialize: function(options) {
    this._markers = {};
    this.listenTo(this.collection, 'add', this.addMarker);
    this.listenTo(this.collection, 'remove', this.removeMarker);
    google.maps.event.addDomListener(window, 'load', this.initMap.bind(this));
    this.parent = options.parent;
  },

  initMap: function(event) {
    this.setElement(".root-map");
    var mapOptions = {
          center: { lat: 0, lng: 0},
          zoom: 2,
          disableDefaultUI: true,
          minZoom: 2
        };
    this._map = new google.maps.Map(this.el,mapOptions);
    var styles = [{
       "featureType": "poi",
       "stylers": [{ "visibility": "off" }]
      }];
    this._map.setOptions({styles: styles});

    this._infoWindow;
    this._submitWindow;

    this.parent.updateData();
    this.attachMapListeners();
  },

  attachMapListeners: function () {
    // google.maps.event.addListener(this._map, 'idle', this.search.bind(this));
    google.maps.event.addListener(this._map, 'click', this.createPictureForm.bind(this));
  },

  addMarker: function (picture) {
    if (this._markers[picture.id]) { return };

    var image = {
      url: picture.get('url'),
      size: new google.maps.Size(30, 30),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(0, 30),
      scaledSize: new google.maps.Size(30, 30)
    };

    var view = this;

    var marker = new google.maps.Marker({
      position: { lat: picture.get('lat'), lng: picture.get('lng') },
      map: this._map,
      title: picture.id.toString(),
      icon: image
    });

    google.maps.event.addListener(marker, 'click', function (event) {
      view.zoom(23);
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
    "submit": "createPicture",
    "click #picture-map": "reset"
  },
  resetMap: function(event) {
    this._map.setOptions({center: { lat: 0, lng: 0}, zoom: 2});
  },
  reset: function(event) {
    var marker = this._markers[$(event.currentTarget).find("article")[0].id];
    this.zoom(23);
    this.showMarkerInfo(event, marker);
  },

  createPicture: function(event) {
    event.preventDefault();

    var position = this._submitWindow.position;
    var values = $(event.target).serializeJSON();
    var picture = new ShutterStep.Models.Picture({
      lat: position.A,
      lng: position.F
    });

    picture.save(values, {
      success: function () {
        this.collection.add(picture);
        this.closeWindows();
      }.bind(this),
      error: function(error) {
        alert(error);
      }
    });
  },

  search: function () {
    var bounds = this._map.getBounds();
    var southWest = bounds.getSouthWest();
    var northEast = bounds.getNorthEast();

    this.collection.fetch({
       traditional: true,
       data: { lat1: southWest.lat(),
               lat2: northEast.lat(),
               lng1: southWest.lng(),
               lng2: northEast.lng()
             }
    });
  },

  removeMarker: function (picture) {
    var marker = this._markers[picture.id];
    marker.setMap(null);
    google.maps.event.clearInstanceListeners(marker);
    delete this._markers[picture.id];
  },

  showMarkerInfo: function (event, marker) {
    var picture = this.collection.get(parseInt(marker.title));
    var user = new ShutterStep.Models.User({id: picture.get("user_id")});
    user.fetch({
      success: function() {
        this.closeWindows();
        this._infoWindow = new google.maps.InfoWindow({
          content: JST['infoWindow']({picture: picture, user: user})
        });
        this._map.panTo(marker.position);
        this._infoWindow.open(this._map, marker);
      }.bind(this)
    });
  },

  showPicture: function(event, id) {
    var marker = this._markers[id];
    this.showMarkerInfo(event, marker);
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
  },

  zoom: function(num) {
    this._map.setZoom(num);
  }
});
