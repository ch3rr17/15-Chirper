using Chirper.API.Models;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Chirper.API.Infrastructure
{
    public class ChirperDataContext : IdentityDbContext<ChirperUser>
    {
        public ChirperDataContext() : base("Chirper")
        {

        }

        public IDbSet<Post> Posts { get; set; }
        public IDbSet<Comment> Comments { get; set; }

        //maps table names and sets up table names between various user entities - replacing the functionality of function class
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            //Configures the 1-to-many relationship bet post and comment
            //call method - Fluid API syntax
            modelBuilder.Entity<Post>()
                .HasMany(p => p.Comments)
                .WithRequired(c => c.Post)
                .HasForeignKey(c => c.PostId);

            //Configure a 1-* relationship between User and Post
            modelBuilder.Entity<ChirperUser>()
                .HasMany(u => u.Posts)
                .WithRequired(p => p.User)
                .HasForeignKey(p => p.UserId);

            //Configure a 1-* relationship between User and Comment
            modelBuilder.Entity<ChirperUser>()
                .HasMany(u => u.Comments)
                .WithRequired(c => c.User)
                .HasForeignKey(c => c.UserId)
                .WillCascadeOnDelete(false); //tells the db that when a user is deleted it will also delete all its comments

            //Pass in model that was created
            base.OnModelCreating(modelBuilder);
        }
    }
}