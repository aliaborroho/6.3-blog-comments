var Comments = Backbone.Model.extend({
  idAttribte:'_id',
  defaults: {
    email: '',
    comments: ''
    url: http://tiny-lr.herokuapp.com/collections/ab-comments
  }
});

var CommentList = Backbone.Collection.extend({
  model: Comments,
  url-root: 'http://tiny-lr.herokuapp.com/collections/ab-comments'
});
