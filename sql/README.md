# SQL語法
## insert
```
insert into 表格 values ()
insert into 表格(cols) value ()
inster into 表格 value (),()
insert into 表格 select 子句
```
## delete
```
delete
from 表格
where 條件式
```
## update
```
update 表格 set 更改資料,更改資料 where 條件式
```
## select
```
select <欄位>,<欄位>        //select <欄位> 新增欄位資料 as <資料表名稱>
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
```
select count(*)
from <資料表名稱>

select mix(<欄位>)
from <資料表名稱>

select sum(<欄位>)
from <資料表名稱>
where <條件>
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





