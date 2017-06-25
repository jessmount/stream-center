var popular ={
    
    getPopular(){
        var url="https://api.themoviedb.org/3/tv/popular?api_key=765d2e3d0c88d33d579c8ef1484befed&language=en-US";
        
        return fetch(url).then((response)=> response.json());
        
        
    }
    
    

    
  
};

module.exports = popular;