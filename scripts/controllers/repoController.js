(function(module) {
  var repoController = {
    index: function() {
      $('.contentBtn-content').hide();
      $('#blog-stats').hide();
      $('#home-bottom-third').fadeIn();
    }
  };

  module.repoController = repoController;
})(window);
