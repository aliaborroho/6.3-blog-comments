var Comments = Backbone.Model.extend({
  idAttribte:'_id',
  defaults: {
    email: '',
    comments: '',
    url: 'http:tiny-lr.herokuapp.com/collections/ab-comments',
  }
});

var CommentList = Backbone.Collection.extend({
  model: Comments,
  urlRoot: 'http://tiny-lr.herokuapp.com/collections/ab-comments'
});
