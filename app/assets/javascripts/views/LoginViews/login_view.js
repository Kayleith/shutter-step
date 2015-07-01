ShutterStep.Views.SignIn = Backbone.View.extend({

  initialize: function(options){
    this.callback = options.callback;
    $(window).on("scroll", this.header.bind(this));
    // this.listenTo(ShutterStep.currentUser, "signIn", this.signInCallback);
  },

  events: {
    "submit .landing-page-sign-in-part-form": "signIn",
    "submit .landing-page-sign-up-part-form": "signUp",
    "submit .demo-form": "demo",
    "click .landing-page-text1": "home",
    "click .landing-page-text2": "feature",
    "click .landing-page-text3": "ourteam",
  },
  home: function() {
    $(window).scrollTop(0);
  },
  feature: function() {
    $(window).scrollTop(951);
  },

  ourteam: function() {
    $(window).scrollTop(1751);
  },

  header: function() {
    this.$(".landing-page-text").removeClass("selected-text");
    if($(window).scrollTop() >= 1400) {
      this.$(".landing-page-text3").addClass("selected-text");
    } else if($(window).scrollTop() > 600) {
      this.$(".landing-page-text2").addClass("selected-text");

    } else if($(window).scrollTop() < 600) {
      this.$(".landing-page-text1").addClass("selected-text");
    }
    if($(window).scrollTop() > 2) {
      this.$(".landing-page-logo").removeClass("add-border");
      this.$(".landing-page-logo").addClass("remove-border");
      this.$(".landing-page").addClass("landing-page-fixed animationbackground");
      this.$(".landing-page").removeClass("landing-page animationbackground-r");
      this.$(".landing-page-ul label").removeClass("animationcolor-r");
      this.$(".landing-page-ul label").addClass("animationcolor");
    } else if($(window).scrollTop() === 0) {
      this.$(".landing-page-logo").removeClass("remove-border");
      this.$(".landing-page-logo").addClass("add-border");
      this.$(".landing-page-fixed").addClass("landing-page animationbackground-r");
      this.$(".landing-page-fixed").removeClass("landing-page-fixed animationbackground");
      this.$(".landing-page-ul label").removeClass("animationcolor");
      this.$(".landing-page-ul label").addClass("animationcolor-r");
    }
  },

  template: JST["loginWindow"],

  render: function(){
    this.$el.html(this.template());

    return this;
  },

  signUp: function(event){
    event.preventDefault();
    var $form = $(event.currentTarget);
    var userData = $form.serializeJSON();
    var that = this;
    this.model.set(userData);

    this.model.save({}, {
      success: function(){
        ShutterStep.currentUser.fetch();
        that.collection.add(that.model, { merge: true });
        this.cameraTransition();
      }.bind(this),
      error: function(data){
        alert("Form invalid. Let the user know what went wrong.");
        console.log(data);
      }
    });
  },
  demo: function(event) {
    event.preventDefault();
    ShutterStep.currentUser.signIn({
      name: "robot1",
      password: "robotsrule",
      success: this.cameraTransition.bind(this),
      error: function(){
        alert("Wrong username/password combination. Please try again.");
      }
    });
  },

  signIn: function(event){
    event.preventDefault();
    var $form = $(event.currentTarget);
    var formData = $form.serializeJSON().user;

    ShutterStep.currentUser.signIn({
      name: formData.name,
      password: formData.password,
      success: this.cameraTransition.bind(this),
      error: function(){
        alert("Wrong username/password combination. Please try again.");
      }
    });
  },

  cameraTransition: function() {

    $(".top-block").addClass("off-stage-top");
    $(".bottom-block").addClass("off-stage-bottom");

    $(".top-block").addClass("animation-slidedown-start");
    $(".bottom-block").addClass("animation-slideup-start");

    $(".top-block").bind("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd",
      function () {
        $(".top-block").removeClass("animation-slidedown-start");
        $(".top-block").addClass("animation-slideup");
        $(".top-block").bind("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd",
          function () {
            $(".top-block").removeClass("animation-slideup");
          }
        );
      }
    );

    $(".bottom-block").bind("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd",
      function () {
        Backbone.history.navigate("home", {trigger: true});
        $(".bottom-block").removeClass("animation-slideup-start");
        $(".bottom-block").addClass("animation-slidedown");
        $(".bottom-block").bind("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd",
          function () {
            $(".bottom-block").removeClass("animation-slidedown");
          }
        );
      }
    );
  },

  signInCallback: function(event){
    if(this.callback) {
      this.callback();
    } else {
      Backbone.history.navigate("home", { trigger: true });
    }
  }
});
