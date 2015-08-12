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
