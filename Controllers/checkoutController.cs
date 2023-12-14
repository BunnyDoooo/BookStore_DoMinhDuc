using Dapper;
using System;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Web.Http;
using WebApplication3.Models;

namespace WebApplication3.Controllers
{
    public class checkoutController : ApiController
    {
        private DapperRepository _repository;

        public checkoutController()
        {
            // Khởi tạo DapperRepository với chuỗi kết nối của bạn
            string connectionString = "Server=LAPTOP-A63LTACB\\SQLEXPRESS;Database=BookStoreDB;Integrated Security=True;";
            _repository = new DapperRepository(connectionString);
        }

        // GET api/checkout
        public IHttpActionResult Get()
        {
            var checkouts = _repository.GetAllCheckouts();
            return Ok(checkouts);
        }

        //GET api/checkout/5
        public IHttpActionResult Get(int id)
        {
            var checkout = _repository.GetCheckoutsByuserID(id);
            if (checkout == null)
            {
                return NotFound();
            }
            return Ok(checkout);
        }




        [HttpPost]
        [Route("api/checkouts")]

        public IHttpActionResult CreateCheckout([FromBody] checkouts checkout)
        {
            if (checkout == null)
            {
                return BadRequest("Invalid checkout data.");
            }

            try
            {
                using (IDbConnection dbConnection = new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
                {
                    dbConnection.Open();
                    //Thực hiện thêm dữ liệu vào cơ sở dữ liệu bằng Dapper
                    string insertQuery = "INSERT INTO Checkouts (UserID,Username, FirstName, LastName, Email, Address, PhoneNumber, Orderday,StatusId, totalAmount)" +
                                         "VALUES (@UserID, @Username, @FirstName, @LastName, @Email, @Address, @PhoneNumber,@Orderday,@StatusId, @totalAmount)";
                    dbConnection.Execute(insertQuery, checkout);

                    return Ok("Checkout created successfully.");
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        // DELETE api/checkout/5
        public IHttpActionResult Delete(int id)
        {
            var checkout = _repository.GetCheckoutByid(id);
            if (checkout == null)
            {
                return NotFound();
            }

            _repository.DeleteCheckout(id);
            return Ok("Checkout Delete successfully.");
        }
    }
}
