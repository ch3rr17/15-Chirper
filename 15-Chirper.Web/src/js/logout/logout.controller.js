(function() {
    'use strict';

    angular
        .module('app')
        .controller('LogoutController', LogoutController);

    LogoutController.$inject = ['authService', '$state', 'toastr'];

    /* @ngInject */
    function LogoutController(authService, $state, toastr) {
        var vm = this;
        vm.title = 'LogoutController';

        vm.logout = function(){
        	authService.logout()
                       .then(
                            function(response){
                                $state.go('login')
                            },
                            function(message){
                                toastr.warning(message);
                            }
                        );
        			 
        }//end of logout function
    }
})();