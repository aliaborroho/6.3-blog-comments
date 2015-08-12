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
