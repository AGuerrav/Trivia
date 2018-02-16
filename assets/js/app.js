// $(document).ready(() =>{
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
      // $('.category').append(`<div class='title_movie'><p>Category: ${el.category}</p><p>Difficulty: ${el.difficulty}</p><h2>${el.question}</h2><ul><li>${el.correct_answer}</li><li>${el.incorrect_answers[1]}</li><li>${el.incorrect_answers[0]}</li><li>${el.incorrect_answers[2]}</li></ul>
      // </div>`);
      let pos = 0, test, test_status, question, choice, chA, chB, chC, correct = 0;
      let questions = [
        [ el.question, el.incorrect_answers[0], el.incorrect_answers[1], el.incorrect_answers[2], el.correct_answer ],
        [ el.question, el.incorrect_answers[0], el.incorrect_answers[1], el.incorrect_answers[2], el.correct_answer ],
        [ el.question, el.incorrect_answers[0], el.incorrect_answers[1], el.incorrect_answers[2], el.correct_answer ],
        [ el.question, el.incorrect_answers[0], el.incorrect_answers[1], el.incorrect_answers[2], el.correct_answer ],
        [ el.question, el.incorrect_answers[0], el.incorrect_answers[1], el.incorrect_answers[2], el.correct_answer ],
        [ el.question, el.incorrect_answers[0], el.incorrect_answers[1], el.incorrect_answers[2], el.correct_answer ],
        [ el.question, el.incorrect_answers[0], el.incorrect_answers[1], el.incorrect_answers[2], el.correct_answer ],
        [ el.question, el.incorrect_answers[0], el.incorrect_answers[1], el.incorrect_answers[2], el.correct_answer ],
        [ el.question, el.incorrect_answers[0], el.incorrect_answers[1], el.incorrect_answers[2], el.correct_answer ],
        [ el.question, el.incorrect_answers[0], el.incorrect_answers[1], el.incorrect_answers[2], el.correct_answer ],

      ];
      console.log(questions);
      function _(x) {
        return document.getElementById(x);
      }
      test = _('test');
      _('test_status').innerHTML = 'Question ' + (pos + 1) + 'of ' + questions.length;
      question = questions[pos][0];
      chA = questions[pos][1];
      chB = questions[pos][2];
      chC = questions[pos][3];
      test.innerHTML = '<h3>' + question + '</h3>';
      test.innerHTML += "<input type='radio' name='choices' value='A'>" + chA + "<br>" ;
      test.innerHTML += "<input type='radio' name='choices' value='B'>" + chB + "<br>" ;
      test.innerHTML += "<input type='radio' name='choices' value='C'>" + chC + "<br><br>" ;
      test.innerHTML += "<button onClick='checkAnswer()' >Submit Answer</button> " ;

    });
  }
  function checkAnswer() {
    alert('ok');
          }
// });
