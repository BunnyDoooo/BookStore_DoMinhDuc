using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication3.Models
{
    public class Order
    {
        public int ID { get; set; }
        public int UserID { get; set; }
        public DateTime Orderdate { get; set; }
        public int StatusId { get; set; }
        public decimal totalAmount { get; set; }
    }
}