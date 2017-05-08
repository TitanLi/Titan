#
SQL語法
## insert
```sql
insert into 表格 values ()
insert into 表格(cols) value ()
insert into 表格 value (),()
insert into 表格 select 子句
```
## delete
```sql
delete
from 表格
where 條件式
```
## update
```sql
update 表格 set 更改資料,更改資料 where 條件式
```
## select
```sql
select <欄位>,<欄位> //select <欄位> 新增欄位資料 as <資料表名稱>
from <資料表名稱>
where <條件>

1.決定查詢需要的表格 => 1 or 多（FROM)
if 多 goto 2. eles goto 3
2. 設定join 條件 (WHERE)
3.設定where篩選條件(WHERE)
4.設定顯示欄位(SELECT)
5.執行

搜尋全部select *
where 如果資料為null 使用 <欄位> is null
查詢任意字元 <欄位> like %固定資料
```
## select例外
```sql
select count(*)
from <資料表名稱>

select mix(<欄位>)
from <資料表名稱>

select sum(<欄位>)
from <資料表名稱>
where <條件>
```
## 預存程序
```sql
建立
create proc myproc as
select *
from table
where apple='Titan'

執行
exec myproc
```
## 預存程序 + 參數
```sql
建立
create proc myproc @id char(6) as
select *
from table
where id=@id

執行
exec myproc '123456'
```
## 更新預存程序
```sql
建立
alter proc myproc @id char(6) as
select *
from table
where id=@id

執行
exec myproc '123456'
```
## 刪除預存程序
```sql
drop proc myproc
```
## 檢視表/虛擬資料表
```sql
建立
create view myview as
select *
from table

執行
select * from myview
```
## 檢視表 + 更改欄位名稱
```sql
建立
create view myview(a,b,c,d,e) as
select *
from table

執行
select * from myview
```
## 更改檢視表
```sql
建立
alter view myview(a,b,c,d,e) as
select *
from table

執行
select * from myview
```
## function
```sql
建立
create function funName(@value1 int,@value2 int,@value3 int)
returns table
as retutn(
select語法
)

執行
select *
from funName(100,100,100)
```
## group by
```sql
select col,max(apple)
from table
group by col
```
## 排序
```sql
select *
from table
order by col DESC

--ASC 代表結果會以由小往大的順序列出
--DESC 代表結果會以由大往小的順序列出
```
## 取前幾比資料
```sql
select top 1 *
from table
```
## 資料型態
```
nchar會自動補滿
varchar不會自動補滿
nvarchar國際字元
```
## 名詞解釋
1. inner join 兩個表格有互相匹配的才拿出來
2. outer join 選擇表格全部顯示有互相匹配的再拿進來
