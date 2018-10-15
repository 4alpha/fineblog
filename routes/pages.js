var express = require('express');
var router = express.Router();
var showdown = require('showdown'),
  converter = new showdown.Converter();
var fs = require('fs');
var { from } = require('rxjs')
/* GET users listing. */
router.get('/:pageId', function(req, res, next) {
  //res.send(converter.makeHtml(fs.readFile('pages/' + req.params['pageId'] + '.md')));
  var fsPromises = fs.promises;
  var read = from(fsPromises.readFile('public/pages/' + req.params['pageId'] + '.md'));
  // Wrap fs.exists
  //var exists = Rx.Observable.fromCallback(fs.exists);

  // Check if file.txt exists
  //var source = read('pages/' + req.params['pageId'] + '.md');

  var subscription = read.subscribe(
    function(data) {
      console.log("adata" + data);
      res.send(converter.makeHtml(data.toString()))
    },
    function(err) {
      res.send(converter.makeHtml("# blog not found!'"));
      console.log(err);
    },
    function(complete) { console.log(complete); });
});
module.exports = router;
