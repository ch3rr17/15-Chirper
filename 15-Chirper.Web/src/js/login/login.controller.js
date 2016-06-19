(function() {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['authService', '$state', 'toastr'];

    /* @ngInject */
    function LoginController(authService, $state, toastr) {
        var vm = this;
        vm.title = 'LoginController';

        vm.login = function() {
                authService.login(vm.username, vm.password)
                    .then(
                        function(response) {
                            $state.go('posts');
                        },
                        function(message) {
                            toastr.warning(message);
                        }
                    );

            } //end of login function
    }
})();
