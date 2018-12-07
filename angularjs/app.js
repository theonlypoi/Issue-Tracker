var app = angular.module("myModule", ["ngRoute"]);//ngRoure is used for setting the routing concept

//Create a service to pass the data from one page to another page---start
app.service('nameService', function () {
    var self = this;
    this.mobile = '';
    this.umid='';
    this.city='bbsr';

});
//Create a service to pass the data from one page to another page---End


//For the WebConfig  (set the pages and the controller for each page)------Start
app.config(function ($routeProvider) {
    $routeProvider.caseInsensitiveMatch = true;
    $routeProvider
        .when("/home", {
            templateUrl: "pages/home.html",
            controller: "homeController"
        })
        .when("/login", {
            templateUrl: "pages/login.html",
            controller: "loginController"
        })
         .when("/OTP", {
            templateUrl: "pages/OTP.html",
            controller: "OTPController"
        })
       .when("/details", {
            templateUrl: "pages/details.html",
            controller: "detailsController"
        })
      .when("/profile", {
            templateUrl: "pages/profile.html",
            controller: "profileController"
        })
        .when("/register", {
            templateUrl: "pages/register.html",
            controller: "registerController"
        }).otherwise({
            redirectTo: "/home"
        })

})
//For the WebConfig  (set the pages and the controller for each page)------End


//For the Home  page------Start
app.controller("homeController", function ($scope) {
    var homeObject = {
        title: "About QRCODE",
        image: './images/download.jpg',
        content: "Fitastik app can be a replacement for paper records and helps manage the medical information in one single place. It also digitizes the medical information and presents them in easy to understand health charts. The data is hosted in secure cloud servers with 256-bit transfer encryption.There is also a website that can be used to access information from the desktop and other computer devices: www.fitastik.com.onitoring health reports of family members and friends.The user can also create a personalized emergency profile for crucial medical needs to be shared with the heath care provider. Though there is option for unlimited storage for medical records and 24X7service, the paid membership of the app provides option for unlimited digitization of medical records, pick up of medical records for scanning, storage and drop of medical records to the pick-up point, and health analytics of medical records. Post the digitization process, the app displays vital health parameters in graphical format which makes them easier to track, view, and understand both for the user, their friends and family, and the medical practitioner."
    }
    $scope.homeObj = homeObject;
});
//For the Home  page------End


//For the Login  page------start
app.controller("loginController", function ($scope) {
    var consoleObject = {
        title: "Login Here"
    }
   
    $scope.consoleObj = consoleObject;
});
//For the Login  page------End


//For the Details  page------start
app.controller("detailsController", function ($scope,$http,nameService) {
     $scope.mobile=nameService.mobile;
    var consoleObject = {
        title: "Details Here"
    }  
    $scope.consoleObj = consoleObject;
     $scope.DetailsSave= function(){     
     $http.post('http://localhost:52427/api/ProfileApi',{'UMId':'36046475-a1ec-4269-99b5-50c59f59a350','Name': $scope.name,'Task':'Profile','Age':$scope.age,'BloodGroup':$scope.bloodgroup,
    'EmergencyContact':$scope.emergencycontact,'Address':$scope.address})
     .success(function(data)
    {
     alert('Your Data Saved and Your  QRCode also generatted');
         
    }); 
    };   
    
    
    
});
//For the Details  page------end


//For the OTP Send page------start
app.controller("OTPController", function ($scope,$http,nameService) {

    $scope.mobile=nameService.mobile;
 //if you want to pass data from otp page to other page then use the $watch blog here 
//$scope.$watch('mobile', function () {
//
//    nameService.mobile= $scope.mobile;
//        });
    
     $scope.$watch('mobile', function () {
   
              nameService.mobile= $scope.mobile;
     
        });
    
    var consoleObject = {
        title: "OTP Verification"
    }
   
    $scope.consoleObj = consoleObject;
    
     $scope.OTP='';
    
     //Function to call in the registerpage to pick data from each field
      $scope.OTPVerification= function(){ 
          alert('hii');
     $http.post('http://localhost:52427/api/MobileVerifyApi',{'OTP':$scope.otp,'Mobile': $scope.mobile,'Task':'Profile'})
     .success(function(data)
    {
     alert('OTP verification over');
         
    }); 
    };   
});
//For the OTP Send page------end

//For the Registration  page------start
 app .controller("registerController", function ($scope,$http,$filter,$location,nameService) {

    
     //Here watch helps to transe for the data 
    $scope.$watch('mobile', function () {
   
              nameService.mobile= $scope.mobile;
             
        });
      $scope.$watch('umid', function () {

              nameService.umid=$scope.umid;
        });
    
    $scope.gameObject = {
        title: "Register Here",
    };
     
    
    $http.get('http://localhost:52427/api/TestingApi')
    .success(function(data)
    {
         $scope.object=data;
    });
     
      $scope.password='';
      $scope.mobile='';
     //Function to call in the registerpage to pick data from each field
      $scope.addRule= function(){  
     $http.post('http://localhost:52427/api/RegistrationApi',{'Password':$scope.password,'Mobile': $scope.mobile,'Task':'Registration'})
     .success(function(data)
    {
   // console.log(data);
    //console.log(data.Items[0].UMId);
         $scope.objectforumid=data;
         //$scope.umid=data.Items[0].UMId;
     alert('OTP Send to your mobile');
         
    }); 
    };   
    
})
 //For the Registration  page------end

    
