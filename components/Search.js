var searchShows = {


    search(query){
       var encoded = encodeURIComponent(query);
        var url ="https://api.themoviedb.org/3/search/tv?api_key=765d2e3d0c88d33d579c8ef1484befed&language=en-US&query=" + encoded;
        //console.log(url);
        return fetch(url).then((response)=> response.json());
    }


}


module.exports = searchShows;
