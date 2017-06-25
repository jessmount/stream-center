var getShows = {


    favs(showId){
       //var encoded = encodeURIComponent(showId);
        var url ="https://api.themoviedb.org/3/tv/" + showId + "?api_key=765d2e3d0c88d33d579c8ef1484befed&language=en-US";
        console.log(url);
        return fetch(url).then((response)=> response.json());
    }


}


module.exports = getShows;
