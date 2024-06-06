using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace MoOnlineStore.Core.DTO.identity
{
   public class RegisterDto
    {
        [Required]
        [EmailAddress]
        public string  Email { get; set; }
        [Required]
        [MinLength(6,ErrorMessage = "Password must have 6 digits" )]
        public string  Password { get; set; }
        [Required]
        public string  DisplayName { get; set; }
    }
}
