/*// inicio sesión con firebase
$(document).ready(function() {
  // para que siempre esté deslogeado
  firebase.auth().signOut();
  $('#start').hide();
  $('button').hide();
});
// Al hacer click en el boton de registro con google:
document.getElementById('btnsignUp').addEventListener('click', GoogleSignUp, false);
// Initialize Firebase
var config = {
    apiKey: "AIzaSyA9kHhoH3jqulXjnO3I3zMYu64lkV_9dUs",
    authDomain: "trivia-69c2b.firebaseapp.com",
    databaseURL: "https://trivia-69c2b.firebaseio.com",
    projectId: "trivia-69c2b",
    storageBucket: "trivia-69c2b.appspot.com",
    messagingSenderId: "489651669941"
};
firebase.initializeApp(config);
// función de ingreso con google
var token = 'none';
var user = 'none';
var email = 'none';
// guardar los usuarios que se registren
var userData = firebase.database().ref('users');
function GoogleSignUp() {
  if (!firebase.auth().currentUser) {
    // para saber si el usuario se ha conectado
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    firebase.auth().signInWithPopup(provider).then(function(result) {
      token = result.credential.accessToken;
      user = result.user;
      email = user.email;
      $('.google-sign').hide() && $('#start').show();
      // guardar el nombre de usuario en firebase
      userData.orderByChild('email').equalTo(user.email).on('value', function(snapshot) {
        // console.log(snapshot.val());
        if (snapshot.val() === null) {
          // console.log('Nuevo Usuario');
          userData.push({
            photo: user.photoURL,
            name: user.displayName,
            email: user.email
          });
        } else {
          // console.log('Usuario Existente');
        }
      });
    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      var errorEmail = error.email;
      var credencial = error.credencial;
      // console.log(errorCode);
      if (errorCode === 'auth/account-exists-with-different-credential') {
        alert('Es el mismo usuario');
      }
    });
  } else {
    firebase.auth().signOut();
  }
} */


//TRABAJO CON API

$('#setQuestions').click(function() {
  $('#configuration').toggle();
});

function configTrivia() {
  let pickNumber = $('#pickNumber').val();
  let pickCategory = $('#pickCategory').val();
  let pickDifficulty = $('#pickDifficulty').val();
  let pickType = $('#pickType').val();
  function setCategory() {
    let category;
    if (pickCategory === '') {
      return category = '';
    } else {
      return category = '&category=' + pickCategory;
    }
  }
  function setDifficulty() {
    let difficulty;
    if (pickDifficulty === '') {
      return difficulty = '';
    } else {
      return difficulty = '&difficulty=' + pickDifficulty;
    }
  }
  function setType() {
    let type;
    if (pickType === '') {
      return type = '';
    } else {
      return type = '&type=' + pickType;
    }
  }
  triviaCall = fetch('https://opentdb.com/api.php?amount=' + pickNumber + setCategory() + setDifficulty() + setType());

  return triviaCall;
}

configTrivia();
let multipleAnswers;
let booleanAnswers;
let correct = [];

function setQuestions() {
  let multipleOrder;
  let booleanOrder;
  configTrivia().then(function(response) {
    return response.json();
  })
  .then(function(data) {
    // console.log(data);
    $('#questions').empty();

    data.results.forEach(element => {
      let configurationDiv = $('#configuration');

      if (element.type === 'multiple') {
        multipleOrder = [element.correct_answer, element.incorrect_answers[0], element.incorrect_answers[1], element.incorrect_answers[2]];
        multipleAnswers = multipleOrder;
        correct.push(multipleOrder[0]);

        let multipleQuestion= `<div class=" multiple divQuestion next">
        <div class="row">
          <div class="col-10">
            <h5>${element.question}</h5>
          </div>
        </div>
        <div class="row">
          <div class="col-10">
            <p><label><input type="checkbox" class="checkAnswer">${multipleOrder.splice((parseInt(Math.random() * (4 -0) + 0)),1)}</label></p>
            <p><label><input type="checkbox" class="checkAnswer">${multipleOrder.splice((parseInt(Math.random() * (3 -0) + 0)),1)}</label></p>
            <p><label><input type="checkbox" class="checkAnswer">${multipleOrder.splice((parseInt(Math.random() * (2 -0) + 0)),1)}</label></p>
            <p><label><input type="checkbox" class="checkAnswer">${multipleOrder.splice((parseInt(Math.random() * (1 -0) + 0)),1)}</label></p>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <button type="button" class="btn sendAnswer" >Let's Check!</button>
          </div>
        </div>
      </div>`;

      $('#questions').append(multipleQuestion);

      } else {
        booleanOrder = [element.correct_answer, element.incorrect_answers[0]];
        booleanAnswers = booleanOrder;
        correct.push(booleanOrder[0]);

        let booleanQuestion = `<div class=" boolean divQuestion next">
        <div class="row">
          <div class="col-10">
            <h5>${element.question}</h5>
          </div>
        </div>
        <div class="row">
          <div class="col-10">
          <p><label><input type="checkbox" class="checkAnswer">${booleanOrder.splice((parseInt(Math.random() * (2 -0) + 0)),1)}</label></p>
          <p><label><input type="checkbox" class="checkAnswer">${booleanOrder.splice((parseInt(Math.random() * (1 -0) + 0)),1)}</label></p>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <button type="button" class="btn sendAnswer" >Next question</button>
          </div>
        </div>
      </div>`;
      $('#questions').append(booleanQuestion);

      }
    });
    $('.divQuestion').first().toggle();

    $('.divQuestion').find('button').click(function() {
      let divQ = $(this).parent().parent().parent();
      divQ.toggle();
      divQ.next().toggle();

      if(divQ.last().css('display', 'none')){
        // let hola = $('#questions').append(`<p> holi holi</>`);
        return prizes();
       }
    })
    // console.log(correct);
  });
}

function countingPoints() {
  let counter = 0;
  let check = $('.checkAnswer');
  for(let i = 0; i < check.length; i++) {
    for(let j = 0; j < correct.length; j++) {
    if ( check[i].checked === true && check[i].parentNode.innerText === correct[j]) {
      counter++;
      }
    }
  }
  return counter;
};

function prizes() {
  let points = countingPoints();
  let rangeA = correct.length;
  let rangeB = correct.length - 1 ;
  let rangeC = parseInt(correct.length/2);
  let prize;
  if ( points === rangeA) {
    prize = `<h2>CONGRATULATIONS!!!</h2>
    <h3>You are the best!</h3>`
  }
  if (points < rangeA && points >= rangeB) {
    prize = `<h2>CONGRATULATIONS!
    <p>You almost win!!!</p>`
  }
  if(points < rangeB && points >= rangeC) {
    prize = `<h2>You're close</h2>
    <p>Keep trying :D !</p>`
  }
  if(points < rangeC) {
    prize = '<h2>Noup :(</h2>'
  }

  let message = `<section id="finish"><div class="row"><div class="col-12">${prize}</div></div></section>`
  $('#questions').after(message);
}
