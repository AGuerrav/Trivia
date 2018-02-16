$(document).ready(() =>{
  $('#start').on('click', function(enter) {
    $.ajax({
      url: 'https://opentdb.com/api.php?amount=10&category=27&type=multiple',
      type: 'GET', // aca va si sube o baja get o post
      datatype: 'json'
    })
      .done(function(response) { // parametro
        // console.log(response);
        showInfo(response);
      })
      .fail(function() {
        console.log('error en conexión a API');
      });
  });
  function showInfo(info) {
    let search = info.results;
    console.log(search);
    search.forEach(el => {
      $('.category').append(`<div class='title_movie'><p>${el.category}</p></div>`);
    });
  }
});
//     if (info.Response === 'false') {
//       alert('Pelicula no encontrada');
//     } else {
//       // crea un div por cada resultado
//       $('.preview, #title, #year, #runtime, #img').empty();
//       search.forEach(el => {
//         $('.preview').append(`<div class='title_movie'><p>${el.Title}</p><img src='${el.Poster}'></div>`);
//       });
//       $('.title_movie').click(function() {
//         let newTitle = ($(this).text()); // obtiene el titulo de la pelicula al ser clickeada
//         // console.log(newTitle);
//         $.ajax({
//           url: `http://www.omdbapi.com/?t=${newTitle}&apikey=fed8ba13`,
//           type: 'GET', // aca va si sube o baja get o post
//           datatype: 'json'
//         })
//           .done(function(response) {
//             console.log(response);
//             showMovie(response);
//           })
//           .fail(function() {
//             console.log('error en conexión a API');
//           });
//       });
//     // }
//   }
//   function showMovie(info) {
//     if (info.Response === 'false') {
//       alert('Palicula no encontrada');
//     } else {
//       $('.preview, #title, #year, #runtime, #img').empty();
//       $('#title').append(`Titulo: ${info.Title}`);
//       $('#year').append(`Año: ${info.Year}`);
//       $('#runtime').append(`Duración: ${info.Runtime}`);
//       $('#img').append(`<img src='${info.Poster}'>`);
//     };
//   }
// });
