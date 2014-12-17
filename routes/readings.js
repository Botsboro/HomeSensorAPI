var Reading = require('../models/reading');
var express = require('express');
var router = express.Router();  // get an instance of the express Router

// set up the routes themselves
router.route('/readings')
    
    .get(function(req, res, next) {
        if (Object.keys(req.query).length > 0) {
            var filter = {};
            for ( var param in req.query ) {
                filter[param] = req.sanitize(req.query[param]);
            }
            
            Reading.find(filter, function(err, readings) {
                if (err)
                    res.send(err);
            
                res.json({ meta: { query: filter }, readings: readings });
            });
        } else {
            Reading.find(function(err, readings) {
                if (err)
                    red.send(err);
            
                res.json(readings);
            });
        }
    })
    .post(function(req, res, next) {
        var reading = new Reading();
        
        reading.sensor = req.body.sensor;
        reading.value = req.body.value;
        reading.room = req.body.room;
        if (req.body.recordedAt)
            reading.recordedAt = req.body.recordedAt;
        
        reading.save(function(err) {
            if (err)
                res.json({ error: true, message: 'Unable to save the reading. Please check the format of your data.' })
            
            res.json({ message: 'Reading has been saved.', error: false, reading: reading, body: req.body }); 
        });
    });
    
module.exports = router;