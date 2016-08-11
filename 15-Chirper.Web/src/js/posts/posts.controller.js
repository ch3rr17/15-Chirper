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

        //Get posts and passes on the username to view on the page
        vm.grabPosts = function() {
            var authData = localStorageService.get('authorizationData');
            vm.chirpuser = authData.username;
            PostsFactory.getPosts(vm.posts, vm.chirpuser)
                .then(
                    function(response) {
                        vm.posts = response.data;
                    },
                    function(message) {
                        toastr.error(message);
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
                    },
                    function(message) {
                        toastr.error(message);
                    }
                );
        }; //end of new posts


        //Get Comments
        vm.grabComments = function() {
            PostsFactory.getComments(vm.post.comments)
                .then(
                    function(response) {
                        vm.posts.comments = response.data;
                    },
                    function(message) {
                        toastr.error(message);
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
                        toastr.success('You have added a new comment');
                    },
                    function(message) {
                        toastr.error(message);
                    }
                );
        };

        //Logs out the user
        vm.logout = function() {
            authService.logout()
            toastr.success('Logout successful');
        };
    } //end of PostsController function
})();
