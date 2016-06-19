(function() {
    'use strict';

    angular
        .module('app')
        .factory('PostsFactory', PostsFactory);

    PostsFactory.$inject = ['$http', 'apiUrl', '$q', 'toastr'];

    /* @ngInject */
    function PostsFactory($http, apiUrl, $q, toastr) {
        var service = {
            getPosts: getPosts,
            addPosts: addPosts,
            getComments: getComments,
            addComments: addComments
        };
        return service;

        ////////////////

        //Grabs the posts from a database and display the main posts page
        function getPosts(){
            var defer = $q.defer();

            $http.get(apiUrl + 'posts')
                 .then(
                    function(response){
                        defer.resolve(response);
                    },
                    function(err){
                        defer.reject(err.data.message);
                    }
                );
                return defer.promise;
        }//end of getPosts function

        //Adds a posts to the database
        function addPosts(post){
            var defer = $q.defer();

            $http.post(apiUrl + 'posts', post)
                 .then(
                    function(response){
                        defer.resolve(response);
                    },
                    function(err){
                        defer.reject(err.data.message);
                    }
                 );
                 return defer.promise;
        }

        //Grabs comments from a post and display the main posts page
        function getComments(comments){
            var defer = $q.defer();

            $http.get(apiUrl + 'comments')
                 .then(
                    function(response){
                        console.log('Get Factory for comments', response);
                        defer.resolve(response);
                    },
                    function(err){
                        defer.reject(err.data.message);
                    }
                );
                return defer.promise;
        }

        //Adds a comment to a posts to the database
        function addComments(data){
            var defer = $q.defer();
            //var data = {PostId: PostId, Text: Text}
            $http.post(apiUrl + 'comments', data)
                 .then(
                    function(response){
                        defer.resolve(response);
                    },
                    function(err){
                        defer.reject(err.data.message);
                    }
                 );
                 return defer.promise;
        }
    }
})();