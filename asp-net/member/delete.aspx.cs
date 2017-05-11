using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.SqlClient;

namespace WebApplication1
{
    public partial class delete : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                using (SqlConnection oConn = new SqlConnection("Data Source=(LocalDB)\\v11.0;AttachDbFilename=\"c:\\users\\user\\documents\\visual studio 2013\\Projects\\WebApplication1\\WebApplication1\\App_Data\\Database1.mdf\";Integrated Security=True"))
                {
                        //資料庫連線開啟
                        oConn.Open();
                        //建立資料庫命令物件
                        SqlCommand oCmd = oConn.CreateCommand();
                        //設定SQL命令
                        oCmd.CommandText = "DELETE FROM Member WHERE Id=@ID";
                        oCmd.Parameters.AddWithValue("@ID", Request["ID"]);
                        //執行命令
                        oCmd.ExecuteNonQuery();

                        Response.Redirect("list.aspx");
                  }
              }
          }
      }
}
