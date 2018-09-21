const Stall = require('../../models/Stall');

module.exports = (app) => {
  app.get('/api/br', (req, res, next) => {
    brs = { 0:'0', 1:'0', 2:'0'}
    Stall.find(function(err, stalls) {
      if (err) {
        next(err);
      }
      for (var i=0; i<3; i++) {
        var stall1 = stalls.find(obj => {
          return obj.id === (i*2);
        });
        var stall2 = stalls.find(obj => {
          return obj.id === (i*2+1);
        });
        console.log(i, stall1, stall2);
        if (stall1 && stall2){
          if (stall1.avail == -1 && stall2.avail == -1) {
            brs[i] = -1;
          } else if (stall1.avail == 1 || stall2.avail == 1) {
            brs[i] = 1;
          }
        }
      }
      res.json(brs);
    })
  });


  app.get('/api/stalls', (req, res, next) => {
    Stall.find()
      .exec()
      .then((stall) => res.json(stall))
      .catch((err) => next(err));
  });

  app.post('/api/stalls/:id', function (req, res, next) {
    const stall = new Stall({id:req.params.id});

    stall.save()
      .then(() => res.json(stall))
      .catch((err) => next(err));
  });

  app.put('/api/stalls/:id', (req, res, next) => {
    Stall.findOne({ id : req.params.id} )
      .exec()
      .then((stall) => {
        stall.avail=req.query.avail;
        stall.lastupdated = Date.now;
        stall.save()
          .then(() => res.json(stall))
          .catch((err) => next(err));
      })
      .catch((err) => next(err));
  });
};
