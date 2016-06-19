using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Chirper.API.Models
{
    public class Post
    {
        //Primary Key(s)
        public int PostId { get; set; }
        public string UserId { get; set; } // UserId is grabbed from IdentityUser class

        // Fields relevant to a Post
        public DateTime CreatedDate { get; set; }
        public string Text { get; set; }
        public int LikeCount { get; set; }

        //Relationship fields - Foreign Keys
        public virtual ChirperUser User { get; set; }
        public virtual ICollection<Comment> Comments { get; set; }
    }
}