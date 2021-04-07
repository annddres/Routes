var app = angular.module('myApp', []);

app.directive('popover', function() { return function(scope, elem) { elem.popover(); } }); // Fix

app.controller('formCtrl', function($scope, $http) {

    $scope.tipo = localStorage.getItem('tipo')*1;
    $scope.serviciosusuario = [];
    $scope.serviciousuario = {};
    $scope.usuarios = [];
    $scope.usuario = {};

    $scope.consultarUsuarios = function(){

        if(cordova.plugin.http){
            cordova.plugin.http.get(urlapi + "Usuario", {}, {}, function(response) {
                $scope.usuarios = JSON.parse(response.data);
                $scope.$apply(); // plugin+angular

                // TO-DO: Validar mejor lugar para este llamado, al final de onDeviceReady no funciona
                // Regresar (Mapa)
                var su = localStorage.getItem('serviciousuario');
                if(su != null && su != ''){
                    $scope.consultarSeleccion(JSON.parse(su));
                }

            }, function(response) {
                alert(response.error);
            });
        }

    };


    $scope.consultarServiciosUsuario = function(){

        if(cordova.plugin.http){
            var data = { };
            if ($scope.tipo==1) data = { operacion:"Consultar", estado: 0 };
            if ($scope.tipo==2) data = { operacion:"Consultar", estado: 0, celular: $scope.usuario.celular };
            cordova.plugin.http.post(urlapi + "ServicioUsuario", data, {}, function(response) {
                $scope.serviciosusuario = JSON.parse(response.data);
                $scope.$apply(); // plugin+angular
            }, function(response) {
                alert(response.error);
            });
        }

    };

    $scope.editarServicioUsuario = function(su) {
        $scope.serviciousuario = angular.copy(su);
        $('#modalServicioUsuario').modal('toggle');

    };

    $scope.finalizarServicioUsuario = function(su) {

        if(confirm('¿Desea continuar?')){
            if(cordova.plugin.http){
                $scope.serviciousuario = angular.copy(su);
                $scope.serviciousuario.operacion = "Registrar";
                $scope.serviciousuario.estado = 1;
                cordova.plugin.http.post(urlapi + "ServicioUsuario", $scope.serviciousuario, {}, function(response) {
                    $scope.consultarServiciosUsuario();
                }, function(response) {
                    alert(response.error);
                });
            }
        }

    };

    $scope.agregarServicioUsuario = function() {

        $scope.serviciousuario = {};

    };

    $scope.editarServicioUsuario = function(su) {

        $scope.serviciousuario = angular.copy(su);
        if(su.usuario != "0"){
            $scope.usuario = $scope.usuarios.filter(u => u.celular == su.celular)[0];
        }
        $('#modalServicioUsuario').modal('toggle');

    };

    $scope.guardarServicioUsuario = function() {

        if(cordova.plugin.http){
            $scope.serviciousuario.operacion = "Registrar";
            $scope.serviciousuario.celular = $scope.usuario.celular;
            $scope.serviciousuario.estado = 0;
            if($scope.serviciousuario.coordenadas == undefined) $scope.serviciousuario.coordenadas = "(0, 0)";
            cordova.plugin.http.post(urlapi + "ServicioUsuario", $scope.serviciousuario, {}, function(response) {
                $('#modalServicioUsuario').modal('toggle');
                $scope.consultarServiciosUsuario();
            }, function(response) {
                alert(response.error);
            });
        }

    };

    $scope.eliminarServicioUsuario = function(su) {

        if(confirm('¿Desea continuar?')){
            if(cordova.plugin.http){
                su.operacion = "Eliminar";
                su.celular = $scope.usuario.celular;
                cordova.plugin.http.post(urlapi + "ServicioUsuario", su, {}, function(response) {
                    $scope.consultarServiciosUsuario();
                }, function(response) {
                    alert(response.error);
                });
            }
        }

    };

    $scope.seleccionarMapa = function() {
        // Guardar seleccion
        localStorage.setItem('serviciousuario', JSON.stringify($scope.serviciousuario));
        location.href = 'maps.html';
    };

    $scope.rutaMapa = function() {
        // Guardar seleccion
        localStorage.setItem('serviciosusuario', JSON.stringify($scope.serviciosusuario));
        location.href = 'maps2.html';
    };

    $scope.consultarSeleccion = function(su) {
        $scope.serviciousuario = su;
        $('#modalServicioUsuario').modal('toggle');
        localStorage.setItem('serviciousuario', '');
        $scope.$apply(); // plugin+angular
    };

});

$(document).ready(function() {
    
    loadNav();
    loadPopover();
    $('#fecha').datetimepicker({ format: 'YYYY-MM-DD' });
    $('#hora').datetimepicker({ format: 'HH:mm A' });

    document.addEventListener("deviceready", onDeviceReady, false);

});

function onDeviceReady() {
    
    var $scope = angular.element($('#myApp')).scope();
    $scope.usuario = JSON.parse(localStorage.getItem("usuario"));
    $scope.consultarServiciosUsuario(); 
    $scope.consultarUsuarios();

    window.open = cordova.InAppBrowser.open;

}