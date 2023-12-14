using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication3.Models
{
    public class checkouts
    {
        public int id { get; set; }
        public int UserID { get; set; }
        public string Username { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public int PhoneNumber { get; set; }
        public DateTime Orderday { get; set; }
        public int StatusId { get; set; }
        public decimal totalAmount { get; set; }
    }
}