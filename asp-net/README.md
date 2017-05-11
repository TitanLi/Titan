#asp.net

安裝mono
```
$sudo apt-get install mono-complete
$sudo apt-get install mono-runtime
```
安裝XSP
[Install Mono on Linux](http://www.mono-project.com/docs/getting-started/install/linux/)
```
$sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 3FA7E0328081BFF6A14DA29AA6A19B38D3D831EF

$echo "deb http://download.mono-project.com/repo/debian wheezy main" | sudo tee /etc/apt/sources.list.d/mono-xamarin.list

$sudo apt-get update

$sudo apt-get install mono-devel mono-complete referenceassemblies-pcl
```

測試mono是否正常執行(hello.cs)
``` C#
using System;
public class HelloWorld
{
static public void Main ()
{
Console.WriteLine ("Hello Mono World");
}
}
```

編譯cs檔
```
$ mcs hello.cs
```

測試執行
``` html
$ mono hello.exe
```

安裝xsp4
```
$ sudo apt-get install mono-xsp4
```

建立test.aspx
```xsp4
<%@ Page Language="C#" %>
<html>
<head>
<title>Sample Calendar</title>
</head>
<asp:calendar showtitle="true" runat="server">
</asp:calendar>
```

執行test.aspx
```
$ xsp4 test.aspx
```
