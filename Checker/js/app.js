angular.module('myApp', [])
.filter('highlight', function($sce) {
  return function(text, phrase) {
    if (phrase) text = text.replace(new RegExp('('+phrase+')', 'gi'),
      '<span class="highlighted">$1</span>')

    return $sce.trustAsHtml(text)
  }
})
.controller('spellController', function($scope,$http) {
    $scope.spell = {};
	$scope.result = null;
	var sendData = {};
	
	$scope.spell.text = "hello whatt are you doin?";
	$('#textarea1').trigger('autoresize');
	
	sendData.text = "This is just a dummy text!";
	sendData.language = "en-US";
	
	$scope.checkSpelling = function(){
	sendData.text = $scope.spell.text;
    $http({
        method : "GET",
        url : "https://languagetool.org/api/v2/check",
		params : sendData
    }).then(function mySucces(response) {
        $scope.result = response.data;
    }, function myError(response) {
        $scope.result = response.statusText;
    });
	}
});