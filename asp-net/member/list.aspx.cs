using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.SqlClient;
namespace WebApplication1
{
    public partial class list: System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                using (SqlConnection oConn = new SqlConnection("Data Source=(LocalDB)\\v11.0;AttachDbFilename=\"c:\\users\\user\\documents\\visual studio 2013\\Projects\\WebApplication1\\WebApplication1\\App_Data\\Database1.mdf\";Integrated Security=True"))
                {
                    try
                    {
                        //資料庫連線開啟
                        oConn.Open();
                        //建立資料庫命令物件
                        SqlCommand oCmd = oConn.CreateCommand();
                        //設定SQL命令
                        oCmd.CommandText = "SELECT * FROM  Member";

                        using (SqlDataReader oReader = oCmd.ExecuteReader())
                        {
                            string s = "";

                            while (oReader.Read())
                            {
                                s += "<tr><td>" + oReader["Account"] + "</td><td>" + oReader["Name"] + "</td><td><a href='edit.aspx?ID=" + oReader["Id"] + "'>修改</a></td><td><a href='delete.aspx?ID=" + oReader["Id"] + "'>刪除</a></td></tr>";
                            }

                            Literal1.Text = s;
                        }
                    }
                    catch (Exception ex)
                    {
                        throw ex;
                    }
                }
            }
        }
    }
}
