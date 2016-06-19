(function() {
    'use strict';

    angular
        .module('app')
        .controller('PostsController', PostsController);

    PostsController.$inject = ['PostsFactory', '$state', 'toastr', 'authService'];

    /* @ngInject */
    function PostsController(PostsFactory, $state, toastr, authService) {
        var vm = this;
        vm.title = 'PostsController';
        vm.posts = []; //creates an array to hold posts
        vm.post = {}; //creates an object to hold a post for a user
        vm.comments = {}; //creates an object to hold a comment of a post

        //Get posts
        vm.grabPosts = function() {
            PostsFactory.getPosts(vm.posts)
                        .then(
                            function(response) {
                                console.log('Status: We got posts!', response); //console response
                                vm.posts = response.data;
                                console.log('Received posts data',vm.posts); //console data
                            },
                            function(message) {
                                toastr.warning(message);
                            }
                        );
        } //end of get posts

        //Call back get post function
        vm.grabPosts();



        //Post new Chirps
        vm.newPosts = function(post) {
            PostsFactory.addPosts(post)
                        .then(
                            function(response) {
                                /*for(var i = 0; i < response.data.length; i++) {
                                    response.data[i].newComment = {};
                                }*/
                                vm.posts.push(response.data);
                                console.log('chirp post works!', post); //console data

                            },
                            function(message) {
                                toastr.warning(message);
                            }
                        );
        } //end of new posts

        //Get Comments
        vm.grabComments = function(comments) {
            PostsFactory.getComments(vm.post.comments)
                        .then(
                            function(response) {
                                console.log('Status: We got comments!', response); //console response
                                vm.posts.comments = response.data;
                                console.log('Received comments data', vm.posts.comments); //console data
                            },
                            function(message) {
                                toastr.warning(message);
                            }
                        );
        } //end of get comments

       

        //Create a new comment and pass the data into the service
        vm.newComments = function(id){
            /*vm.UserId = 'c215ea03-e047-40d1-85a6-f204553204e8';
            vm.PostId = 15;*/
            vm.newComment.PostId = id;
            var data = vm.newComment;
            PostsFactory.addComments(data)
                        .then(
                            function(response){
                                vm.comments.push(response.data);
                                console.log('chirp comment works!', comment)
                            },
                            function(message){
                                toastr.warning(message);
                            }
                        );
        }// end of new comments function

        
        //Call back get comment function
        //vm.grabComments();
        
        //Logs out the user
        vm.logout = function(){
            authService.logout()
        }

    } //end of PostsController function
})();
