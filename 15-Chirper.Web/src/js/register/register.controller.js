(function() {
    'use strict';

    angular
        .module('app')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['authService', '$state', 'toastr'];

    /* @ngInject */
    function RegisterController(authService, $state, toastr) {
        var vm = this;
        vm.title = 'RegisterController';
        
        vm.register = function(){
        	authService.register(vm.registration)
        		        .then(
        		        	function(response){
        		        		toastr.success('Registration succeeded!');
                                console.log(vm.registration);
        		        		$state.go('login');

        		        	},
        		        	function(error){
        		        		toastr.warning(message);
        		        	}
        		        );

        }// end of register function       

    }//end of RegisterController function
})();