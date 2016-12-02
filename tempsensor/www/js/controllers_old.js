angular.module('starter.controllers', [])
   
.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', ['$rootScope','$scope','$http','$timeout',
function($rootScope,$scope,$http,$timeout){
	alert("in controller");
  $scope.data = {
    speechText:'Hi! I am Heather, your weather woman for today.To know whether it is hot or cold say WEATHER soon after the beep'
  }; 
  alert( $scope.data.speechText);
  $scope.recognizedText = '';
  alert($scope.recognizedText);
  
  $scope.parentmethod = function() {
 alert("parent method called");	  
   window.TTS.speak({
           text: $scope.data.speechText,
           locale: 'en-GB',
           rate: 1.0
       }, function () {
           /*$timeout(callAtTimeout, 1000);
					function callAtTimeout() {
						$scope.record();
					}*/
					$scope.record();
       }, function (reason) {
           // Handle the error case
        alert(reason+"");
       });
  }; 
 document.addEventListener("deviceready", function(){
 $scope.onLoad = "onLoad";	
if($scope.onLoad=="onLoad")
{	
 $scope.parentmethod();
 $scope.onLoad="";
}
  });
 $scope.contains = function (a, b) {
    return a.toLowerCase().indexOf(b) >= 0;	
} 

  $scope.record = function() {
	 
    alert("recrd called");
    var recognition = new SpeechRecognition();
	recognition.continuous = true;
	recognition.interimResults =true;
    recognition.onresult = function(event) {
        if (event.results.length) {
			var lastResultIdx = event.results.resultIndex;
            $scope.recognizedText = event.results[0][0].transcript;
			if($scope.contains($scope.recognizedText.toLowerCase(),"weather"))
			{
				$scope.fetch();
				
				
			}
            //$scope.$apply();
			
        }
    };
    recognition.start();
	
  };
  
  
  
 $scope.fetch = function()
{ 
	var url = "http://intercondev.herokuapp.com/sensordata";

$http.get(url)
    .success(function(data){
        console.log(data.found);
    });
	//$scope.details = "cold";
	//$scope.weather();
	
	//http://intercondev.herokuapp.com/sensordata
}

$scope.weather = function()
{
	alert($scope.details);
	if($scope.details == "hot")
	{	
    $scope.data.speechText='It is getting way too hot in here! Turn on the air cooler!';
	$scope.led = "green";
	$scope.changeBgImage("url(img/hot-weather.jpg)");
	}
	else if($scope.details == "cold")
	{
	 $scope.data.speechText='Time to take out your coat and scarf.It is getting cold! Stay warm my friend!';
     $scope.led = "red";
     $scope.changeBgImage("url(img/cold-weather.jpg)");	 
	}

	window.TTS.speak({
           text: $scope.data.speechText,
           locale: 'en-GB',
           rate: 1.0
       }, function () {
           $timeout(callAtTimeout, 1000);
					function callAtTimeout() {
						$scope.makePostCall();
					}
       }, function (reason) {
           // Handle the error case
        alert(reason+"");
       });
  };
  
  
$scope.changeBgImage = function(strAssign){
	// document.write('<textarea id="text-content">'+strAssign+'</textarea>');
	 document.getElementById('bg_image').style.backgroundImage=strAssign;
	
 }
	
/*$scope.makePostCall = function()
{ 

alert("LED thats supposed to glow");
alert($scope.led);	
alert("in post call");
////////alert("test call");
	/*var req = {
		method: 'POST',
		url: 'http://lexico.pythonanywhere.com/vocabsession/api/userprog/',
		headers: {
			'Content-Type': 'application/json'
		},
		data: {"user":"riddhima", "word":$scope.word, "level":$scope.newLevel}
	}

	$http(req).then(function (response) {
		////////alert("blah");
	}, function (response) {
		////////alert("nah");
		// Failure Function
	});

}*/
  
  
  
 
}]);


/*.controller('myCtrl',['$rootScope','$scope',
   function($rootScope,$scope) {
	   alert("in child ctrl")
             $rootScope.childmethod = function() {
             document.addEventListener("deviceready", function(){	
			 alert("deviceready");			 
             $rootScope.$emit("CallParentMethod", {});		 
			 });
		}
   }	
   ]);*/

//.controller('DashCtrl', function($scope) {})

/*.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})*/




