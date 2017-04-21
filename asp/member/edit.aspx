<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="edit.aspx.cs" Inherits="WebApplication1.edit" %>

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
            <tr><th colspan="2" align="center">新增會員</th></tr>
            <tr><td>帳號</td><td><input type="text" name="Account" id="Account" runat="server" /></td></td></tr>
            <tr><td>密碼</td><td><input type="password" name="Password" /></td></td></tr>
            <tr><td>姓名</td><td><input type="text" name="Name" id="Name" runat="server" /></td></td></tr>
            <tr><td colspan="2" align="center"><input type="submit" value="立即送出" /></td></tr>
        </table>
    </div>
    </form>
</body>
</html>
