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

function getMatches() { // Needs better UX
  var cleanName = $Name.val().trim()
  if (cleanName.length === 0) {
    alert('Missing movie to search')
    $Name.focus
    return
  }

  var cleanYear = $Year.val().trim()

  var title = 'http://www.omdbapi.com/?s=' + cleanName + '&y=' + cleanYear + '&plot=short&r=json'
  console.log('title=' + title);
  $.ajax({
    method: 'GET',
    url: title,
    success: function(data) {

      if (data.Response === 'False') { // Needs better UX
        alert('Unable to locate any movies with that name')
        $Name.focus()
        return
      }

      if (data.Search.length > 1) {
        insertData(data)
      }
    },
    err: function(data) { console.log('Error:' + err) },
  })
}

function insertData(data) {
  var movies = []
  var $movie
  var i = 0
  while (i < data.Search.length) {


    $movie = $('#IdResults').clone()

    // Need to finish removing old attributes and inserting new
    $('#IdTitleResult').text(data.Search[i].Title)
    $('#IdYearResult').text(data.Search[i].Year)
    $('#IdPosterResult').attr('src', data.Search[i].Poster)

    movies.push($movie)
    //console.log('data.Search[i]:' + data.Search[i].Year);
    /*$('#IdActorResult').text(data.Search.Actors)
    $('#IdGenreResult').text(data.Genre)
    $('#IdPlotResult').text(data.Plot)


    $('#IdYearResult').text(data.Year)
    $('#IdImdbResult').text(data.Rating)
    $('#IdAwardsResult').text(data.Awards)*/
    i++
  }
  $('#IdDest').append(movies)
}


// by title
//http://www.omdbapi.com/?t=austin+powers&y=&plot=short&r=json

// request poster
// http://img.omdbapi.com/?apikey=[yourkey]&
