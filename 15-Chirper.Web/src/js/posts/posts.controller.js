(function() {
    'use strict';

    angular
        .module('app')
        .controller('PostsController', PostsController);

    PostsController.$inject = ['PostsFactory', '$state', 'toastr', 'authService', 'localStorageService'];

    /* @ngInject */
    function PostsController(PostsFactory, $state, toastr, authService, localStorageService) {
        var vm = this;
        vm.title = 'PostsController';
        vm.posts = []; //creates an array to hold posts
        vm.post = {}; //creates an object to hold a post for a user
        vm.showComment = false;
        vm.comments = []; //creates an object to hold a comment of a post
        vm.authData = {};

        //Get posts
        vm.grabPosts = function() {
            var authData = localStorageService.get('authorizationData');
            vm.chirpuser = authData.username;
            console.log('data', authData);
            console.log(vm.chirpuser);
            PostsFactory.getPosts(vm.posts,authData)
                .then(
                    function(response) {
                        console.log('Status: We got posts!', response); //console response
                        vm.posts = response.data;
                        console.log('Received posts data', vm.posts); //console data
                    },
                    function(message) {
                        toastr.warning(message);
                    }
                );
        }; //end of get posts

        //Call back get post function
        vm.grabPosts();



        //Post new Chirps
        vm.newPosts = function(post) {
            PostsFactory.addPosts(post)
                .then(
                    function(response) {
                        vm.posts.push(response.data);
                        
                        console.log('chirp post works!', post); //console data

                    },
                    function(message) {
                        toastr.warning(message);
                    }
                );
        }; //end of new posts

        // end of new comments function


        //Get Comments
        vm.grabComments = function() {
            PostsFactory.getComments(vm.post.comments)
                .then(
                    function(response) {
                        console.log('Status: We got comments!', response); //console response
                        vm.posts.comments = response.data;
                        console.log('Received comments', vm.posts.comments); //console data
                    },
                    function(message) {
                        toastr.warning(message);
                    }
                );
        }; //end of get comments




        //Create a new comment and pass the data into the service
        vm.newComments = function(id, post) {
            vm.newComment.PostId = id;
            var data = vm.newComment;
            PostsFactory.addComments(data)
                .then(
                    function(response) {
                        vm.posts[vm.posts.indexOf(post)].Comments.push(response.data);
                        console.log('chirp comment works!', response.data);
                    },
                    function(message) {
                        toastr.warning(message);
                    }
                );
        };

        //Logs out the user
        vm.logout = function() {
            authService.logout()
        };


    } //end of PostsController function
})();
