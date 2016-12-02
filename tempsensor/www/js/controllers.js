angular.module('starter.controllers', [])



   
.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', ['$rootScope','$http','$timeout','$scope',
function($scope,$http,$timeout) {
		
  $scope.data = {
    speechText:'Hi! I am Heather, your weather woman for today.To know whether it is hot or cold say WEATHER soon after the beep'
  };
  $scope.recognizedText = '';
   $scope.$on("CallParentMethod", function(){
	  $scope.parentmethod($scope);
  });
 
  $scope.parentmethod = function() {
   window.TTS.speak({
           text: $scope.data.speechText,
           locale: 'en-GB',
           rate: 1.0
       }, function () {
           $timeout(callAtTimeout, 1000);
					function callAtTimeout() {
						$scope.record();
					}
       }, function (reason) {
           // Handle the error case
        //alert(reason+"");
       });
  };
  
 $scope.contains = function (a, b) {
    return a.toLowerCase().indexOf(b) >= 0;	
} 

  $scope.record = function() {
	 

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

	$http.get("http://intercondev.herokuapp.com/sensordata").then(function(response)
	{ 
	$scope.details = response.data;
	$scope.index=0;
	$scope.length = response.data.length;
	////alert($scope.details[$scope.index].temperature);
	$scope.weather();
	});
	//$scope.details = "cold";
	
	
}

$scope.weather = function()
{
	//alert($scope.details);
	if($scope.length>0)
	{
	if($scope.details[$scope.length-1].temperature > "26")
	{	
    $scope.index=$scope.length;
    $scope.data.speechText='It is getting way too hot in here! Turn on the air cooler!';
	$scope.led="green";
	$scope.led_status="0"
	$scope.changeBgImage("url(img/hot-weather.jpg)");
	
	}
	else 
	{
	 $scope.index=$scope.length;	
	 $scope.data.speechText='Time to take out your coat and scarf.It is getting cold! Stay warm my friend!';
     $scope.led = "red";
	 $scope.led_status="1";
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
        //alert(reason+"");
       });
	}
  };
  
  
$scope.changeBgImage = function(strAssign){
	// document.write('<textarea id="text-content">'+strAssign+'</textarea>');
	 document.getElementById('bg_image').style.backgroundImage=strAssign;
	
 }
	
$scope.makePostCall = function()
{ 

 /*var data = angular.element.param({
                led_2_status: "ON"
            });*/
 $scope.date = new Date(); 
//alert("LED thats supposed to glow");
//alert($scope.led);	
//alert("test call");
var req = {
		method: 'POST', 
		url: 'http://intercondev.herokuapp.com/sensordata',
		headers: {
			'Content-Type': 'application/json'
		},
		data: {
    "temperature": $scope.details[$scope.length-1].temperature,
    "system_power": $scope.details[$scope.length-1].system_power,
    "led_status": $scope.led_status,
  
}
		//collection.update({_id:$scope.details[$scope.index]._id},{$set: {led_2_status:"ON"}});
	}
$http(req).then(function (response) {
	//alert("blah");
	}, function (response) {
		//alert("nah");
		// Failure Function
	});

}
  
  
  
 
}])


.controller('myCtrl',['$scope', '$rootScope',
   function($scope,$rootScope) {
             $rootScope.childmethod = function() {
             document.addEventListener("deviceready", function(){	
             $rootScope.onLoad ="onload";			 
             $rootScope.$emit("CallParentMethod", {});		 
			 });
		}
   }	
   ])

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

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
