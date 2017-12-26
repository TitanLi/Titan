db.testData.aggregate([
  {
    $group:{
      _id:null,old:{$sum:1}
    }
  }
])

db.testData.aggregate([
  {
    $group:{
      _id:null,
      old_total:{$sum:"$old"}
    }
  }
])

db.testData.aggregate([
  {
    $group:{
      _id:{
        name_id:"$name",
        sex_id:"$sex"
      },
      old_total:{$sum:"$old"}
    }
  }
])

db.testData.aggregate([
  {
    $group:{
      _id:"$name",
      old_total:{$sum:"$old"}
    }
  },
  {
    $match:{
      count:{$gt:100}
    }
  }
])

db.testData.mapReduce([
  function(){
    emit(this.name,this.old);
  },
  function(key,values){
    return Array.sum(values);
  },
  {
    query:{status:"normal"},
    outresult:"old"
  }
])
