var express = require('express');
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page
app.get('/', function(req, res) {
  res.render('pages/index');
});

app.use('/static',express.static(__dirname + '/public'));

app.use(
  express.urlencoded({
    extended: false,
  })
);

app.listen(8080);
console.log('Server is listening on port 8080');

app.post('/coords', function(req, res) {
  const fs = require('fs');

  let rawdata = fs.readFileSync('data.json');
  let data = JSON.parse(rawdata)

  x = req.body.lat
  y = req.body.long

  var sd = 0;
  var sdId = 0;

  for (object in data) {
    let obj = data[object];
    let distance = Math.sqrt((Math.pow(obj.latitude - x, 2)) + (Math.pow(obj.longtitude - y, 2)))
    if (sd == 0) {
      sd = distance;
    } else if (distance < sd) {
      sd = distance;
      sdId = object;
    } else {
      sd == sd
    }
  }

  console.log(sd)
  console.log(sdId)
  console.log(sd)

  let theObj = data[sdId];
  console.log(theObj)
  
  let map = `https://maps.google.com/maps/place/${theObj.latitude},${theObj.longtitude}/@${theObj.latitude},${theObj.longtitude},15z`
  let state = theObj.state;
  let locality = theObj.locality;
  let type = theObj.type;
  let name = theObj.location;
  let nLat = theObj.latitude;
  let nLong = theObj.longtitude;
  res.render('pages/coords', {
    state: state,
    locality: locality,
    type: type,
    name: name,
    lat: nLat,
    long: nLong,
    map: map
  });
});