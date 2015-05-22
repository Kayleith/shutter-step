ShutterStep.Views.SidePictureView = Backbone.CompositeView.extend({
  tagName: "section",
  className: "user-pictures",
  template: JST["sidePictureView"],

  render: function() {
    var content = this.template();
    this.$el.html(content);
    this.collection.each(function(model) {
      var pictureView = new ShutterStep.Views.PictureView({model: model});
      this.addSubview(".user-pictures-ul", pictureView);
    }.bind(this));
    return this;
  },

  loadNextPage: function(event) {
    if($(".scroll-pictures").height() + $(".scroll-pictures").scrollTop() >= $(".user-pictures-ul").height() - 100) {
      if(this._page <= this.collection.total_pages) {
        this._page = this._page + 1;
        this.loadData();
      }
    }
  },

  initialize: function() {
    this.collection = new ShutterStep.Collections.UserPictures();
    this._page = 1;
    this.loadData();
    this.$(".scroll-pictures").scroll(this.loadNextPage.bind(this));
    this.listenToOnce(this.collection, 'sync', this.render);
    this.listenTo(this.collection, "add", this.addpicture);
    this.listenTo(this.collection, "remove", this.removepicture);
  },

  addpicture: function(model) {
    var pictureView = new ShutterStep.Views.PictureView({model: model});
    this.addSubview(".user-pictures-ul", pictureView);
  },

  removepicture: function(model) {
    this.removeModelSubview(".user-pictures-ul", model);
  },

  loadData: function() {
    this.collection.fetch({
              remove: false,
              data: { page: this._page,
              id: this.model.id}
    });
  },

  events: {
    "mouseenter .scroll-pictures": "coolModal",
    "click .user-picture-li": "openPictureInModal",
    "click .picture-user-thumb": "closeModal"
  },

  closeModal: function () {
    // this.subviews(".cool-modal").each(function(subview) { subview.remove();});
    $(".cool-modal").empty();
    $(".cool-modal").removeClass("coolmodalslide");
    $(".cool-modal").removeClass("open");
    $(".scroll-pictures").removeClass("coolscrollslide");
    $(".scroll-pictures").removeClass("left");
    $(".user-picture-li").removeClass("invisible");
  },

  coolModal: function() {
    this.$(".cool-modal").addClass("coolmodalslide");
    this.$(".cool-modal").addClass("open");
    this.$(".scroll-pictures").addClass("coolscrollslide");
    this.$(".scroll-pictures").addClass("left");
  },

  openPictureInModal: function(event) {
    if(this.$(".modal-picture-container").length != 0) {

      this.$(".modal-picture-container").addClass("shrinkPicture");
      this.$(".modal-picture-container").addClass("animateShrink");

      this.$(".modal-picture-container").bind("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd",
        function () {
          this.animationPictureCleanup(event);
        }.bind(this)
      );
    } else {
      this.animationPictureCleanup(event);
    }
  },

  animationPictureCleanup: function(event) {
    this.$(".user-picture-li").removeClass("invisible");


    var offset = event.currentTarget.offsetTop;
    var picture1 = $(event.currentTarget);
    picture1.addClass("invisible");
    var image = $(picture1.html())
    var id = image.data("id");
    var picture_obj = this.collection.getOrFetch(id);

    this.$(".cool-modal").html(JST["modalPicture"]({picture: picture_obj}));
    var picture = this.$(".modal-picture-container")
    picture.css("top", offset);


    picture.addClass("slideRight");
    picture.addClass("animateRight");

    picture.bind("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd",
      function () {
        picture.addClass("growPicture");
        picture.addClass("animateGrow");
        picture.bind("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd",
          function () {
            picture.css("top", 0);

            this.subviews(".cool-modal").each(function(subview) { subview.remove();});

            var pictureInfo = new ShutterStep.Views.PictureInfo({model: picture_obj, user: this.model});
            this.addSubview(".cool-modal", pictureInfo);
            this.$(".user-picture-description").addClass("slideDown");
            this.$(".picture-user-thumb").addClass("zoomOut");
          }.bind(this));
      }.bind(this)
    );
  }
})
