
/*
 * GET home page.
 */

exports.item = function(req, res){
  console.log('ciao', req.params.gist_id);

  request(
    {
      url: 'https://api.github.com/gists/' + req.params.gist_id,
      headers:{
        'User-Agent' : 'Mozilla/5.0'
      }
    }, function callback(error, response, body) {
      
      var data = JSON.parse(response.body),
          files = {
          };

      // filter file to be put somewhere
      for( var i in data.files) {
        if(i == 'README.md')
          files.readMe = data.files[i]
        if(data.files[i].type == 'text/tab-separated-values') { // tsv files
          files.tsv = files.tsv || [];
          files.tsv.push(data.files[i]);
        }
      }

      console.log(data);
      res.render('gist', { title: 'Express GIST', data:data, files:files });
    }
  );

};
