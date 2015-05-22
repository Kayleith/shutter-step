ShutterStep.Views.FilterView = Backbone.CompositeView.extend({
  template: JST['filterView'],

  initialize: function() {
    this._page = 1;
    this._query = "";
  },

  search: function(query) {
    this._query = query;
    this.collection.fetch({
      data: { page: 1,
              search: this._query}
    });
  },

  render: function() {
    var content = this.template();
    this.$el.html(content)
    return this;
  },

  leftPage: function() {
    this._page = this._page - 1;
  },

  rightPage: function() {
    this._page = this._page + 1;
  },

  setPage: function(page) {
    this._page = page;
  },

  updateData: function() {
    this.collection.fetch({
      data: { page: this._page,
              search: this._query}
    });
  }
});
