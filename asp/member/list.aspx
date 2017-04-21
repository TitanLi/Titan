<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="list.aspx.cs" Inherits="WebApplication1.list" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <table border="1" style="margin:100px auto">
            <tr><th colspan="4" align="center">會員列表</th></tr>
            <tr><th colspan="4" align="right"><a href="insert.aspx">新增會員</a></th></tr>
            <tr><td>帳號</td><td>姓名</td><td>修改</td><td>刪除</td></tr>
            <asp:Literal ID="Literal1" runat="server"></asp:Literal>
        </table>
    </div>
    </form>
</body>
</html>
