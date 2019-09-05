// function myFunction() {
// var data = "{}";

// var xhr = new XMLHttpRequest();

// xhr.onreadystatechange = function() {
//     if (this.readyState == 4 && this.status == 200) {
//         console.log(this.responseText);
//     }
//   };

// xhr.open("GET", "https://api.themoviedb.org//3/movie/popular?page=1&language=en-US&api_key=4bb78427622b52b4a580fe4ebb973c44");
// xhr.send(data);
// }




function myFunction() {
let url = 'https://api.themoviedb.org/3/movie/popular?page=1&language=id-ID&api_key=4bb78427622b52b4a580fe4ebb973c44';
let listMovies = '';
let elmListMovies = document.getElementById('list_movies');
let elmDiv = document.createElement('div');
fetch(url)
.then(res => res.json())
.then((out) => {
//   console.log('Checkout this JSON! ', out.results);
let movies = 
  out.results.forEach(element => {
      // console.log(element);
      let poster = 'https://image.tmdb.org/t/p/w500'+element.poster;
      let title = element.original_title;
      

      if(element.backdrop_path !== null) {
        let backdrop = 'https://image.tmdb.org/t/p/w500'+element.backdrop_path;
        let img = document.createElement('img');
       img.src = backdrop;
       img.style.width = '100%';
       elmDiv.appendChild(img);
      }
       
  });
})
.catch(err => { throw err });

elmListMovies.appendChild(elmDiv);

}


myFunction();