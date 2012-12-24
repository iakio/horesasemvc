var MeigenController = function ($scope, meigens, sampler) {
  $scope.meigens = meigens;

  $scope.query = "";
  $scope.resetQuery = function() {
    $scope.query = "";
  };

  $scope.character = "";
  $scope.resetCharacter = function() {
    $scope.character = "";
  };

  $scope.hits = function () {
      return 0;
  };

  $scope.isSearchWorking = function () {
    return $scope.query !== "" || $scope.character !=="";
  };

  $scope.entryUrl = function (meigen) {
    return "http://jigokuno.com/?eid=" + meigen.eid;
  };

  $scope.found = function () {
    return $scope.hits() > 0;
  };

  $scope.sample = sampler.sample($scope.meigens);

};

angular.module('myApp', [])
  .value('meigens', window.meigens)
  .factory('sampler', function (meigens) {
    return {
      sample: function (meigens) { return meigens.slice(0, 3); }
    }
  });
