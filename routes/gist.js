
/*
 * GET home page.
 */

exports.item = function(req, res){
  console.log('importing', req.params.gist_id);

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

      // if there is an inde.html,

      // filter file to be put somewhere
      for( var i in data.files) {
        if(i == 'index.html')
          files.index =  data.files[i].raw_url;// https://gist.githubusercontent.com/mbostock/7882658/raw/109aa7cffcc9996d510fe70e1d65e5fd4489415c/index.html ;
        if(i == 'README.md')
          files.readMe = data.files[i]
        if(data.files[i].type == 'text/tab-separated-values') { // tsv files
          files.tsv = files.tsv || [];
          files.tsv.push(data.files[i]);
        }
      }
      console.log("has index", files.index);

      // if there is an index.html
      if (files.index){
        request({
          url: files.index,
          headers:{'User-Agent' : 'Mozilla/5.0'
          }
        }, function callback(error, response, body) {
          // full body here
          var style = body.match(/<style[^>]*>(.*?)<\/style[^>]*>/m);
          console.log('style', style)
          body = body.split(/\<\/body[^>]*>/).shift().split(/\<body[^>]*>/).pop();
          //console.log("file hj")
          //console.log(body)
          res.render('gist', { title: 'Express GIST', data:data, files:files, body:body, style:style? style.pop():'' });
        });
      } else {
        
        res.render('gist', { title: 'Express GIST', data:data, files:files });
      }
      
    }
  );

};
