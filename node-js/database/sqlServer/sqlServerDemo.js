var koa = require('koa');
var Router = require('koa-router');
var sql = require('mssql');

var app = koa();
var router = new Router();

var config = {
  user:'sa',
  password:'Lisheng0706',
  server:'127.0.0.1',
  port:1433,
  database: 'demo'
}

router.get('/',function * (){
  try {
        const pool = yield sql.connect('mssql://sa:Lisheng0706@localhost:1433/demo')
        const result = yield sql.query`select * from apple`
        console.dir(result);
        sql.close();
        this.body = result;
    } catch (err) {
        // ... error checks
    }
});

router.get('/select',function * (){
  try {
    var pool = yield sql.connect(config);
    var result = yield pool.request()
                      .query('select * from apple order by id ASC');
    console.dir(result.recordset.sort());
    sql.close();
    this.body = result.recordset;
  }catch(err){
    this.body = 'select fail';
  }
});

router.get('/insert',function * (){
  try{
    var pool = yield sql.connect(config);
    var result = yield pool.request().query("insert into apple(apple,apple1,id) values('8','apple',8)");
    console.log(result);
    sql.close();
    this.body = 'ok';
  }catch(err){
    this.body = 'insert fail';
  }
});

router.get('/update',function * (){
  try{
    var pool = yield sql.connect(config);
    var result = yield pool.request().query("update apple set apple='6' where id=6");
    console.log(result);
    sql.close();
    this.body = 'ok';
  }catch(err){
    this.body = 'update fail';
  }
});

router.get('/delete',function * (){
  try{
    var pool = yield sql.connect(config);
    var result = yield pool.request().query("delete from apple where id=8");
    console.log(result);
    sql.close();
    this.body = 'ok';
  }catch(err){
    this.body = 'delete fail';
  }
});

app.use(router.middleware());
app.listen(3000);
