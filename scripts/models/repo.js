(function(module) {
  var repos = {};

  repos.allRepos = [];

  repos.requestRepos = function(callback) {
    $.ajax({
      url:'https://api.github.com/users/copenbacon/repos',
      type:'GET',
      headers:{'Authorization': 'token ' + githubToken},
      success:function(data, message, xhr){
        console.log(data);
        repos.allRepos = data;
        callback();
      }
    });
  };

  repos.withTheAttribute = function(myAttr) {
    return repos.allRepos.filter(function(aRepo) {
      return aRepo[myAttr];
    });
  };

  module.repos = repos;
})(window);
