var AppTemplates = {};

AppTemplates['app'] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<section class=\"commentsapp\">\n    <header class=\"header\">\n    <h1>Blog Comments</h1>\n    <button class=\"toggle-comment\">Add Comment</button>\n    <form class=\"comments-form\">\n        <textarea name=\"email\" id=\"email\" placeholder=\"Email\" ></textarea>\n        <textarea name=\"comments\" id=\"comments\" placeholder=\"Comments\" ></textarea>\n        <button class=\"submit-button\">Submit</button>\n    </form>\n    </header>\n    <section class=\"main\">\n        <ul class=\"blog-list\"></ul>\n </section>\n\n";
},"useData":true});
AppTemplates['comments'] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<section class=\"previous-comments\">\n    <div class=\"logged\">\n        <h3 class=\"email-label\">Email:</h3>\n        "
    + alias3(((helper = (helper = helpers.email || (depth0 != null ? depth0.email : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"email","hash":{},"data":data}) : helper)))
    + "\n        <h3 class=\"comments-label\">Comments:</h3>\n        "
    + alias3(((helper = (helper = helpers.comments || (depth0 != null ? depth0.comments : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"comments","hash":{},"data":data}) : helper)))
    + "\n    </div>\n</section>\n";
},"useData":true});
var Comments = Backbone.Model.extend({
  idAttribte:'_id',
  defaults: {
    email: '',
    comments: ''
  }
});

var CommentList = Backbone.Collection.extend({
  model: Comments,
  url: 'http://tiny-lr.herokuapp.com/collections/ab-comments'
});

var CommentsView = Backbone.View.extend ({
  tagName: 'li',
  template: AppTemplates.comments,

  initialize: function() {
  this.listenTo(this.model, 'change', this.render);

},

  // events: {
  //   'click .dropdown-toggle': 'dropdownToggle',
  //   'click .destroy': 'burnItWithFire'
  // },

  render: function() {
     var html = this.template(this.model.toJSON());
     this.$el.html(html);

     return this;
   }

  // toggleDone: function() {
  //   this.model.set('done', !this.model.get('done'));
  //   this.model.save();
  // },

  // burnItWithFire: function() {
  //   var _this = this;
  //   this.$el.slideup(function() {
  //     _this.model.destroy();
  //     _this.remove();
  //   });
  // }
});

var AppView = Backbone.View.extend({
  template: AppTemplates.app,

  el: '#target',

  initialize: function() {
    this.listenTo(this.collection, 'add reset sync', this.render);

    this.render();
    this.collection.fetch();
  },

  events: {
    'click .toggle-comment': 'showForm',
    'click .submit-button': 'addComments'
  },

  showForm: function() {
    this.$('.comments-form').slideDown();
  },

  render: function() {
    var html = this.template(this.collection);
    var _this = this;

    this.$el.html(html);
    this.collection.sortBy('title').slice(0, 10).forEach(function(comments) {
      var childView = new CommentsView({model: comments});

      _this.$el.find('.comments-list')
        .append(childView.render().$el);
    });

    console.info('render');

    this.$('.comments-form').focus();
    return this;
  },

  addComments: function(ev) {
    ev.preventDefault();

    var email = this.$el.find('#email').val();
    var comments = this.$el.find('#comments').val();

    this.collection.create({email: email, comments: comments});
  }
});

var comments = new CommentList();
var app = new AppView({collection: comments});
//# sourceMappingURL=app.map