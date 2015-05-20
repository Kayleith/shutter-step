ShutterStep.Collections.Followers = Backbone.Collection.extend({
  url: "/followers",
  model: ShutterStep.Models.Follower,

  getOrFetch: function(id) {
    var follower = this.get(id),
        followers = this;

    if(!follower) {
      follower = new this.model({ id: id });
      follower.fetch({
        success: function() {
          followers.add(follower);
        }
      });
    } else {
      follower.fetch();
    }

    return follower;
  },

  parse: function(response) {
        this.page = response.page;
        this.total_pages = response.total_pages;
        this.followers_total = response.followers_total;
        // deal with any nested resources on response.models and return
        return response.models;
  }
});
