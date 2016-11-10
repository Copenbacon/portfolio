(function(module) {
  var repos = {};

  repos.allRepos = [];

  repos.requestRepos = function(callback) {
    $.when(
     $.get('/github/users/copenbacon/repos', function(data){
       reposObj.allRepos = data;
     }),
     $.get('/github/users/copenbacon/followers', function(data){
       reposObj.followers = data;
     })
    ).done(callback);
  };

  repos.withTheAttribute = function(myAttr) {
    return repos.allRepos.filter(function(aRepo) {
      return aRepo[myAttr];
    });
  };

  module.repos = repos;
})(window);
