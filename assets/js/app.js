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
      $('.category').append(`<div class='title_movie'><p>Category: ${el.category}</p><p>Difficulty: ${el.difficulty}</p><h2>${el.question}</h2><ul><li></li><li></li><li></li><li></li></ul>
      </div>`);
    });
  }
});
