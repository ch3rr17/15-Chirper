(function() {
    'use strict';

    angular
        .module('app')
        .factory('authInterceptor', authInterceptor);

    authInterceptor.$inject = ['$q', '$location', 'localStorageService'];

    /* @ngInject */
    function authInterceptor($q, $location, localStorageService) {
        var service = {
            request: request,
            response: response,
            requestError: requestError,
            responseError: responseError
        };
        return service;

        ////////////////

        function request(config){
        	//grabs the headers if they exist
        	//or assigns an empty object if they don't
        	config.headers = config.headers || {};

        	var authData = localStorageService.get('authorizationData');

        	if(authData){
        		config.headers.Authorization = "Bearer " + authData.access_token;
        	}

        	return config;


        }//end of function request

        function response(response){
        	//if it exist return otherwise return promise with an empty object
        	return response || $q.when(response);

        }//end of function response

        function requestError(rejection){
        	return $q.reject(rejection);
        }//end of function requestError

        function responseError(rejection){
        	if(rejection.status===401){
        		localStorageService.remove('authorizationData');
        		$location.path('#/login');
        	}

        	return $q.reject(rejection);

        }//end of function responseError


    }//end of authInterceptor function
})();