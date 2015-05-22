ShutterStep.Views.MapView = Backbone.CompositeView.extend({
  attributes: {
    id: "map-canvas"
  },

  initialize: function(options) {
    this._parent = options.parent;
    this._markers = {};
    this.listenTo(this.collection, 'add', this.addMarker);
    this.listenTo(this.collection, 'remove', this.removeMarker);
    this.model = new ShutterStep.Models.Picture();
  },

  initMap: function(event) {
    var mapOptions = {
          center: { lat: 0, lng: 0},
          zoom: 1,
          disableDefaultUI: true,
          minZoom: 1
        };

    this._map = new google.maps.Map(this.el,mapOptions);
    var styles = [
      { "featureType": "landscape",
      "stylers": [
        { "hue": "#F1FF00" },
        { "saturation": -27.4 },
        { "lightness": 9.4 },
        { "gamma": 1 }]},
      { "featureType": "road.highway",
        "stylers": [
        { "hue": "#0099FF"},
        { "saturation": -20 },
        { "lightness": 36.4 },
        { "gamma": 1 }]},
      { "featureType": "road.arterial",
        "stylers": [
        { "hue": "#00FF4F" },
        { "saturation": 0 },
        { "lightness": 0 },
        { "gamma": 1 }]},
      { "featureType": "road.local",
        "stylers": [
        { "hue": "#FFB300" },
        { "saturation": -38 },
        { "lightness": 11.2 },
        { "gamma": 1 }]},
      { "featureType": "water",
        "stylers": [
        { "hue": "#00B6FF" },
        { "saturation": 4.2 },
        { "lightness": -63.4 },
        { "gamma": 1 }]},
      { "featureType": "poi",
        "stylers": [{ "visibility": "off" }]}
        // "stylers": [
        // { "hue": "#9FFF00" },
        // { "saturation": 0 },
        // { "lightness": 0 },
        // { "gamma": 1 }]}
    ];

    this._map.setOptions({styles: styles});

    this._infoWindow;
    this._submitWindow;

    $(".currentView").append("<input id=\"pac-input\" class=\"controls\" type=\"text\" width=300px placeholder=\"Search Box\"/>");

    var input = $('#pac-input')[0];
    this._map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    this._searchBox = new google.maps.places.SearchBox(input);

    this.attachMapListeners();
  },

  attachMapListeners: function () {
    // google.maps.event.addListener(this._map, 'idle', this.search.bind(this));
    google.maps.event.addListener(this._map, 'click', this.createPictureForm.bind(this));
    google.maps.event.addListener(this._searchBox, 'places_changed', this.searchForm.bind(this));
  },

  searchForm: function() {
    var places = this._searchBox.getPlaces();
    var placePosition = places[0].geometry.location;

    this.closeWindows();
    this._submitWindow = new google.maps.InfoWindow({
      content: JST['submitWindow'](),
      position: placePosition
    });
    this.zoom(23);
    this._map.panTo(placePosition);
    this._submitWindow.open(this._map);
  },

  addMarker: function (picture) {
    if (this._markers[picture.id]) { return };

    var image = {
      url: picture.get('thumb_image_url'),
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
    "click #picture-map": "reset",
    "click .favorite-picture": "favoritePicture",
    "change #input-image": "fileInputChange"
  },

  favoritePicture: function(event) {
    var button = $(event.currentTarget);
    if(button.text() === "☆") {
      button.text("★");
    } else if(button.text() === "★") {
      button.text("☆");
    }
  },

  resetMap: function(event) {
    this._map.setOptions({center: { lat: 0, lng: 0}, zoom: 1});
  },

  reset: function(event) {
    if(event.target === $(".favorite-picture")[0]) return;
    var marker = this._markers[$(event.currentTarget).find("article")[0].id];
    this.zoom(23);
    this.showMarkerInfo(event, marker);
  },

  fileInputChange: function(event){
    var that = this;
    var file = event.currentTarget.files[0];
    var reader = new FileReader();

    reader.onloadend = function(){
      that.model._image = reader.result;
    }

    if (file) {
      reader.readAsDataURL(file);
    } else {
      delete that.model._image;
    }
  },

  createPicture: function(event) {
    event.preventDefault();

    var position = this._submitWindow.position;
    var values = $(event.target).serializeJSON();
    this.model.set({
      lat: position.A,
      lng: position.F
    });
    this.model.save(values, {
      success: function () {
        this.collection.add(this.model);
        this.model = new ShutterStep.Models.Picture();
        this.closeWindows();
        this._parent._filterView.updateData();
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
