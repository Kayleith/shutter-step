ShutterStep.Collections.Following = Backbone.Collection.extend({
  url: "/following",
  model: ShutterStep.Models.Follow,

  getOrFetch: function(id) {
    var follow = this.get(id),
        following = this;

    if(!follow) {
      follow = new this.model({ id: id });
      follow.fetch({
        success: function() {
          following.add(follow);
        }
      });
    } else {
      follow.fetch();
    }

    return follow;
  },

  parse: function(response) {
        this.page = response.page;
        this.total_pages = response.total_pages;
        this.following_total = response.following_total;
        // deal with any nested resources on response.models and return
        return response.models;
  }
});
