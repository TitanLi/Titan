var mongodb = require('mongodb');



var mongodbServer = new mongodb.Server('211.23.50.130', 55700, {
});
var db = new mongodb.Db('cardiago', mongodbServer);



db.open(function(err, db) {
  db.authenticate('cardiagoUser', 'cardiagoReader_iii_05076416', function(err, res) {
    // callback
    if (!err) {
        console.log('mongodb are connected');
        db.collection('clientGroup', function(err, collection) {
          if(!err){
            console.log('ok');
            var data = {
               "info" : {
                          "totalVehicles" : 625,
                          "totalMileage" : 369287.428,
                          "totalDriving" : 95205022,
                          "avgConsumption" : 3.93341,
                          "avgMalfunction" : 341,
                          "avgRisk" : 0.20452316,
                          "avgEmission" :2092.628,
                        },
               "performance" : {
                          "risk" : 1,
                          "consumption" : 4,
                          "malfunction" : 4,
                          "effectiveness" : 2,
                          "emission" : 1
                        },
               "risk" : {
                          "day" : {
                                     "xAxis" : [1,2,3,4,5,6,7],
                                     "yAxis" : [1,2,1,0,0,1,3]
                                   },
                          "week" : {
                                     "xAxis" : [1,2,3,4,5,6,7],
                                     "yAxis" : [1,2,1,0,0,1,3]
                                   },
                          "month" : {
                                     "xAxis" : [1,2,3,4,5,6,7,8,9,10,11,12],
                                     "yAxis" : [1,1,2,1,1,1,1,1,2,1,1,1]
                                   },
                          "year" : {
                                     "xAxis" : [2015,2016],
                                     "yAxis" : [5,1]
                                   }
                         },
               "consumption" : {
                 "day" : {
                            "xAxis" : [1,2,3,4,5,6,7],
                            "yAxis" : [1,2,1,0,0,1,3]
                          },
                 "week" : {
                            "xAxis" : [1,2,3,4,5,6,7],
                            "yAxis" : [1,2,1,0,0,1,3]
                          },
                 "month" : {
                            "xAxis" : [1,2,3,4,5,6,7,8,9,10,11,12],
                            "yAxis" : [35,13,21,385,736,692,1284,116,20,49,201,103]
                          },
                 "year" : {
                            "xAxis" : [2015,2016],
                            "yAxis" : [2516,5099]
                          }
                },
               "malfunction" : {
                 "day" : {
                            "xAxis" : [1,2,3,4,5,6,7],
                            "yAxis" : [1,2,1,0,0,1,3]
                          },
                 "week" : {
                            "xAxis" : [1,2,3,4,5,6,7],
                            "yAxis" : [1,2,1,0,0,1,3]
                          },
                 "month" : {
                            "xAxis" : [1,2,3,4,5,6,7,8,9,10,11,12],
                            "yAxis" : [291,363,296,410,460,260,301,167,432,316,403,393]
                          },
                 "year" : {
                            "xAxis" : [2015,2016],
                            "yAxis" : [4139,3968]
                          }
                },
               "effectiveness" : {
                 "day" : {
                            "xAxis" : [1,2,3,4,5,6,7],
                            "yAxis" : [1,2,1,0,0,1,3]
                          },
                 "week" : {
                            "xAxis" : [1,2,3,4,5,6,7],
                            "yAxis" : [1,2,1,0,0,1,3]
                          },
                 "month" : {
                            "xAxis" : [1,2,3,4,5,6,7,8,9,10,11,12],
                            "yAxis" : [ 10347.596994886275,
                                        1649.1677706792493,
                                        178.50597884790542,
                                        10832.038769026103,
                                        28284.527078674917,
                                        23826.360489796036,
                                        43373.17286350141,
                                        2281.895676549179,
                                        291.9458186959886,
                                        7732.847145721013,
                                        47277.58100877947,
                                        40239.89181633363 ]
                          },
                 "year" : {
                            "xAxis" : [2015,2016],
                            "yAxis" : [ 99841.25152042726, 120439.27989106369 ]
                          }
                },
               "emission" : {
                 "day" : {
                            "xAxis" : [1,2,3,4,5,6,7],
                            "yAxis" : [1,2,1,0,0,1,3]
                          },
                 "week" : {
                            "xAxis" : [1,2,3,4,5,6,7],
                            "yAxis" : [1,2,1,0,0,1,3]
                          },
                 "month" : {
                            "xAxis" : [1,2,3,4,5,6,7,8,9,10,11,12],
                            "yAxis" : [ 1759.091489130666,
                                        281.18852101547236,
                                        32.00601640414393,
                                        1843.9365907344375,
                                        4811.68960337474,
                                        4054.6312832653316,
                                        7378.419386795237,
                                        393.7322650133605,
                                        56.270789178318054,
                                        1322.0540147725721,
                                        8045.488771492515,
                                        6849.911608776721 ]

                          },
                 "year" : {
                            "xAxis" : [2015,2016],
                            "yAxis" : [ 18645.46275847265, 22147.957581480765 ]
                          }
                }
            };
            collection.insert(data, function(err, data) {
                if (err) {
                    console.log('mqtt data insert failed');
                } else {
                    console.log('mqtt data insert successfully');
                }
            });
          }
        });
    } else {
        console.log('mongodb open error');
    }
  });
});
