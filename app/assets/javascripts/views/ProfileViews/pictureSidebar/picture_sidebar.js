ShutterStep.Views.SidePictureView = Backbone.CompositeView.extend({
  tagName: "section",
  className: "user-pictures",
  template: JST["sidePictureView"],

  render: function() {
    var content = this.template();
    this.$el.html(content);
    this.$(".scroll-pictures").scroll(this.loadNextPage.bind(this));
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
    "mouseover .scroll-pictures": "coolModal",
    "click .user-picture-li": "openPictureInModal"
  },

  coolModal: function() {
    this.subviews(".cool-modal").each(function(subview) { subview.remove();});

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
          }.bind(this));
      }.bind(this)
    );
  }
})
