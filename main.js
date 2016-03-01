'use strict'

$(document).ready(init)
var $Name
var $Year

function init() {
  $Name = $('#IdName')
  $Year = $('#IdYear')

var x = document.getElementById('IdPosterResult')
  $('#IdGetIt').click(getMatches)
}

function getMatches() {
  var cleanName = $Name.val().trim()
  if (cleanName.length === 0) {
    alert('Missing movie to search')
    $Name.focus
  }
  var cleanYear = $Year.val().trim()

  var title = 'http://www.omdbapi.com/?s=' + cleanName + '&y=' + cleanYear + '&plot=short&r=json'
 console.log('title=' + title);
  $.ajax({
    method: 'GET',
    url: title,
    success: function(data) {
      debugger
      if (data.length > 1) {
        alert(data.length)
      }
      insertData(data)

    },
    err: function(data) { console.log('Error:' + err) },
  })
}

function insertData(data) {

  $('#IdActorResult').text(data.Actors)
  $('#IdGenreResult').text(data.Genre)
  $('#IdPlotResult').text(data.Plot)
  $('#IdPosterResult').attr('src', data.Poster)

  $('#IdYearResult').text(data.Year)
  $('#IdImdbResult').text(data.Rating)
  $('#IdAwardsResult').text(data.Awards)
  console.log('Done!!');
}


// by title
//http://www.omdbapi.com/?t=austin+powers&y=&plot=short&r=json

// request poster
// http://img.omdbapi.com/?apikey=[yourkey]&
