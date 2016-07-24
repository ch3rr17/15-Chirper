(function() {
    'use strict';

    angular
        .module('app')
        .factory('authService', authService);

    authService.$inject = ['$http', '$q', 'localStorageService', '$location', 'apiUrl'];

    /* @ngInject */
    function authService($http, $q, localStorageService, $location, apiUrl) {
    	var state ={
    		isLoggedIn: false

    	};
        var service = {
            state: state,
            register: register,
            login: login,
            logout: logout,
            init: init
        };
        return service;

        ////////////////

        function register(registration){
        	var defer = $q.defer();

        	$http.post(apiUrl + 'accounts/register', registration)
        	     .then(
        	     	function(response){
        	     		defer.resolve(response.data);
        	     	},
        	     	function(err){
        	     		defer.reject(err.data.message);
        	     	}
        	     );

        	   return defer.promise;
        }//end of register function


        function login(username, password){
        	logout();

        	var defer = $q.defer();

        	var data = 'grant_type=password&username=' + username + '&password=' + password;

        	$http.post(apiUrl + 'token', data, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
        	     .then(
        	     	function(response){
        	     		localStorageService.set('authorizationData', response.data); //include api token (access and expiration)

        	     		state.isLoggedIn = true;

        	     		defer.resolve(response.data);
                        console.log(response.data);
        	     	},
        	     	function(err){
        	     		defer.reject(err);
        	     	}
        	     );

        	  return defer.promise;
        }//end of login function


        function logout(){
        	localStorageService.remove('authorizationData');

        	state.isLoggedIn = false;

        	$location.path('#/login');
        }//end of logout function

        function init(){
        	var authData = localStorageService.get('authorizationData');

        	if(authData){
        		state.isLoggedIn = true;

        		$location.path('#/posts');
        	}

        }//end of init function


    }
})();