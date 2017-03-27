insert into stu values ('001','taichung','04-123456')
insert into stu(a, c, b) values ('002','04-987654','taipei')
insert into stu(a, c, b) values ('003','04-987654','taipei'), ('004','04-987654','taipei'), ('005','04-987654','taipei')
insert into stu(a) values ('000')
insert into stu values ('010', null, null)

delete
from stu
where a='002' or c='04-123456'

update stu set c='02-123456', b='999', a='009' where a='004'
