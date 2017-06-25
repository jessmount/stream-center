var getStreams = {


    stream(episode, season, showName){
      //"keyword host:youtube.com,vimeo.com"
       var encoded = encodeURIComponent(showName);
       //build query
       //spaces need a plus sign, season: s01 espisode e01 = game+of+thrones+s01e01
       function pad(n) {
          return (n < 10) ? ("0" + n) : n;
          }

      var epiFormat = pad(episode);
      var seasonFormat = pad(season);
      var query = encoded +"+s"+seasonFormat+"e"+epiFormat;


        var url ="https://www.alluc.ee/api/search/stream/?apikey=786208f5c96ec9bece4703d3a1daf3db&query=" + query +"host%3Avidzi.tv%2Copenload.co%2Cvidup.me%2Cvidbull.com%2Cvidlox.tv+&lang=en&getmeta=0"

      

        return fetch(url).then((response)=> response.json());
    }


}


module.exports = getStreams;
