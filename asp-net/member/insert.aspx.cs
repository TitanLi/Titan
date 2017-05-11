using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.SqlClient;
namespace WebApplication1
{
    public partial class insert : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            //Account.Attributes.Add("style", "background:red");
            if (IsPostBack)
            {
                //建立資料庫連線物件
                SqlConnection oConn = new SqlConnection("Data Source=(LocalDB)\\v11.0;AttachDbFilename=\"c:\\users\\user\\documents\\visual studio 2013\\Projects\\WebApplication1\\WebApplication1\\App_Data\\Database1.mdf\";Integrated Security=True");
                //建立資料庫命令物件
                SqlCommand oCmd = oConn.CreateCommand();
                //設定SQL命令
                oCmd.CommandText = "INSERT INTO Member(Account,Password,Name) VALUES(@Account,@Password,@Name)";

                oCmd.Parameters.AddWithValue("@Account", Request["Account"]);
                oCmd.Parameters.AddWithValue("@Password", Request["Password"]);
                oCmd.Parameters.AddWithValue("@Name", Request["Name"]);

                //資料庫連線開啟
                oConn.Open();
                //執行命令
                oCmd.ExecuteNonQuery();

                Response.Redirect("list.aspx");
            }
        }
    }
}
