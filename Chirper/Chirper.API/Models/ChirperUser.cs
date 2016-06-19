using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Chirper.API.Models
{
    public class ChirperUser : IdentityUser
    {
        public virtual string ChirpName { get; set; }

        // Setup our relationships
        public virtual ICollection<Post> Posts { get; set; } // a user can have many posts
        public virtual ICollection<Comment> Comments { get; set; } // a user can have many comments
    }
}