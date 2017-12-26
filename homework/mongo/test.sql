select count(*) as count
from testData

select sum(old) as old_total
from testData

select name,sex,sum(old) as old_total
from testData
group by name,sex

select name , sum(old)
from testData
group by name
having sum(old)>100

select name as _id,sum(old) as old
from testData
where status = "normal"
group by name
