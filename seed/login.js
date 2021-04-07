var app = angular.module('myApp', []);

app.controller('formCtrl', function($scope, $http) {

    $scope.consultarUsuario = function(){

        if(cordova.plugin.http){

            cordova.plugin.http.get(urlapi + "Usuario/" + $scope.usuario.celular, {}, {}, function(response) {
                $scope.usuario = JSON.parse(response.data);
                localStorage.setItem("usuario", JSON.stringify($scope.usuario));
                location.href = 'main.html';
            }, function(response) {
                alert(response.error);
            });
        }

    };

});

$(document).ready(function() {
    
    document.addEventListener("deviceready", onDeviceReady, false);

});

function onDeviceReady() {

    // Testing
    if(true){
        var tipo = localStorage.getItem('tipo')*1;
        var $scope = angular.element($('#myApp')).scope();
        if(tipo == 1) $scope.usuario = { "celular": "3000000000" }; // Admin
        if(tipo == 2) $scope.usuario = { "celular": "3146454465" }; // Usuario
        $scope.$apply();
    }

}