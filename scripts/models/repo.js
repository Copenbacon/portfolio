(function(module) {
  var reposObj = {};

  reposObj.requestRepos = function(callback) {
    // NOTE: refactor this request into an $.get call
    $.when(
     $.get('/github/users/copenbacon/repos', function(data){
       reposObj.allRepos = data;
     }),
     $.get('/github/users/copenbacon/followers', function(data){
       reposObj.followers = data;
     })
    ).done(callback);
  };

  reposObj.withTheAttribute = function(attr) {
    return reposObj.allRepos.filter(function(aRepo) {
      return aRepo[attr];
    });
  };

  module.reposObj = reposObj;
})(window);
