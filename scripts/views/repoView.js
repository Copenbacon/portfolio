(function(module) {
  var repoView = {};
  var repoCompiler = Handlebars.compile($('#repo-template').html());

  repoView.renderRepos = function() {
    $('#home-bottom-third').append(
      reposObj.withTheAttribute('name')
      .map(repoCompiler)
    );
  };

  reposObj.requestRepos(repoView.renderRepos);

  module.repoView = repoView;
})(window);
