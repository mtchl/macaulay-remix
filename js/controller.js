

function mcAulayController($scope,$http,$sce){
	// runs on startup
	$scope.about = true;
	$scope.terms = [];
	$scope.track = {};
	$scope.relatedterms = [];

	$http.get("mcaulay-titleterms.json").success(function(data){
		$scope.terms = data;
	});



	$scope.clickTerm = function(term){

		$scope.about = false;

		$scope.playing = term.term;

		var rnd = Math.random()*term.items.length;
		var random = Math.floor(rnd);

		var trackID = term.items[random]; // random track
		//console.log("trackID " + trackID);
		var prefix = Math.floor(trackID / 10000);
        var url = "http://animalrecordings.org/Audio/" + prefix + "/" + trackID + ".mp3";
        //console.log("url " + url);
        $scope.playerurl = $sce.trustAsResourceUrl("http://macaulaylibrary.org/audio/" + trackID + "/autoplay/600");

   //      $http.get("items/"+prefix+"/"+trackID+".json").success(function(data){
   //      	//console.log("getting " + trackID);
			// $scope.track = data;
			// $scope.track.audioURL = $sce.trustAsResourceUrl(url);
			// $scope.track.id = trackID;
   //      });

        $scope.relatedterms = term.relatedterms;

        // $scope.terms.forEach(function(t){ // build list of related terms
        // 	for(var ti=0; ti<t.items.length; ti++){
        // 		if (term.items.indexOf(t.items[ti]) > -1){
        // 			$scope.relatedterms.push(t.term);
        // 			break;
        // 		}
	       //  }		
        // });

         console.log($scope.relatedterms);

	}

	$scope.termClass = function(term){

		var style = {};
		if ($scope.playing == term.term) return {playing:true};
		if ($scope.relatedterms.indexOf(term.term) > -1) return {related:true};

	}

	$scope.termFontSize = function(t){
		var sz = 0.2 + 0.08*Math.sqrt(t.items.length) + 'em';
		return {'font-size': sz };
	}

	$scope.showAbout = function(){
		$scope.about = true;
	}


}
