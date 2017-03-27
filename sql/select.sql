select a, b, c, '資工一' as 班級
from stu
where c is null

select *
from stu
where c like '04________'

select *
from 學生
where  住址 like '%台中市%'

select 科目名稱, 學分
from 科目
where 科目名稱='國文'

Select *
from 成績 s, 科目 c
where s.科目代碼=c.科目代碼 and s.學號='S001'

Select *
from 學生 a, 成績 s, 科目 c
where a.學號=s.學號 and s.科目代碼=c.科目代碼

Select *
from 學生 a inner join 成績 s on a.學號=s.學號

Select *
from 學生 a left outer join 成績 s on a.學號=s.學號

Select *
from 成績 s inner join  科目 c on s.科目代碼=c.科目代碼

Select *
from 成績 s right outer join  科目 c on s.科目代碼=c.科目代碼

Select *
from (學生 a inner join  成績 s on  a.學號=s.學號) inner join 科目 c on s.科目代碼=c.科目代碼

Select *
from (學生 a left join  成績 s on  a.學號=s.學號) full join 科目 c on s.科目代碼=c.科目代碼


select count(*)
from 學生

select max(學分)
from 科目

Select sum(學分),  sum(時數), avg(學分*1.0),  avg(時數*1.0)
from 學生 a, 成績 s, 科目 c
where a.學號=s.學號 and s.科目代碼=c.科目代碼 and s.學號='S001'
