Select a.學號, sum(學分) as a,  sum(時數) as b, avg(學分*1.0) as c,  avg(時數*1.0) as d
from 學生 a, 成績 s, 科目 c
where a.學號=s.學號 and s.科目代碼=c.科目代碼
group by a.學號 having sum(學分) > 9
