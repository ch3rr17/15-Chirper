using Chirper.API.Infrastructure;
using Chirper.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace Chirper.API.Controllers
{
    public class AccountsController : ApiController
    {
        private AuthorizationRepository _repo = new AuthorizationRepository();

        //AllowAnonymous - means locking down users; Anyone can register
        [AllowAnonymous]

        //Opens this register function
        [Route("api/accounts/register")]
        //register and dispose method
        public async Task<IHttpActionResult> Register(RegistrationModel model)
        {
            //validate incoming information
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _repo.RegisterUser(model);

            if (result.Succeeded)
            {
                return Ok();
            }
            else
            {
                return BadRequest("Registration form was invalid");
            }
        }

        //override the dispose method after the request has been fulfilled
        protected override void Dispose(bool disposing)
        {
            _repo.Dispose();
        }

    }
}
