ShutterStep.Views.SidePictureView = Backbone.CompositeView.extend({
  tagName: "section",
  className: "user-pictures",
  template: JST["sidePictureView"],

  render: function() {
    var content = this.template();
    this.$el.html(content);
    this.$("#scroll-pictures").scroll(this.loadNextPage.bind(this));
    this.collection.each(function(model) {
      var pictureView = new ShutterStep.Views.PictureView({model: model});
      this.addSubview(".user-pictures-ul", pictureView);
    }.bind(this));
    return this;
  },

  loadNextPage: function(event) {
    if($("#scroll-pictures").height() + $("#scroll-pictures").scrollTop() >= $(".user-pictures-ul").height() - 100) {
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
  }
})
