var app = angular.module('myApp', []);

app.controller('formCtrl', function($scope, $http) {

    $scope.indicadores = {};

    $scope.consultarIndicadores = function(){

        if(cordova.plugin.http){
            /*
            cordova.plugin.http.get(urlapi + "Indicadores", {}, {}, function(response) {
                $scope.indicadores = JSON.parse(response.data);
                $scope.$apply(); // plugin+angular
            }, function(response) {
                alert(response.error);
            });
            */
        }

    };

});

$(document).ready(function() {
    
    loadNav();
    document.addEventListener("deviceready", onDeviceReady, false);

});

function onDeviceReady() {

    var $scope = angular.element($('#myApp')).scope();
    $scope.consultarIndicadores(); 

}