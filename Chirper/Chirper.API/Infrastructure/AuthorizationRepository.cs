using Chirper.API.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace Chirper.API.Infrastructure
{
    //Think of this as an angular factory. Your controller deals with APIs from the factory
    public class AuthorizationRepository : IDisposable
    {
        /*
            //Provided by ASP.NET Identity. Deals with users in a secure way. '->' means dependent on
            UserManager ->  UserStore -> DataContext
         */

        private UserManager<ChirperUser> _userManager;
        private ChirperDataContext _chirperDataContext;

        public AuthorizationRepository()
        {
            _chirperDataContext = new ChirperDataContext();
            var userStore = new UserStore<ChirperUser>(_chirperDataContext);
            _userManager = new UserManager<ChirperUser>(userStore);
        }

        //function method to register users
        public async Task<IdentityResult> RegisterUser(RegistrationModel model)
        {
            var user = new ChirperUser
            {
                ChirpName = model.ChirpName,
                UserName = model.EmailAddress,
                Email = model.EmailAddress
            };

            var result = await _userManager.CreateAsync(user, model.Password);

            return result;
        }

        //find users
        public async Task<ChirperUser> FindUser(string username, string password)
        {
            return await _userManager.FindAsync(username, password);
        }

        //dispose method
        public void Dispose()
        {
            _userManager.Dispose();
        }
    }
}