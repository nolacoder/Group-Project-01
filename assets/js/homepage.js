// Global variable capturing elements in html
var searchFormEl = $('#search-form');
var centuryButtonsEl = $('#century-buttons');
var artistInputEl = $('#artist');
var artworkContainerEl = $('#artwork-container');
var artistSearchTerm = $('#artist-search-term');


var formSubmitHandler = function (event) {
  event.preventDefault();

  var artist = $("#artist").val().trim();

  if (artist) {
    getArtist(artist);

    artworkContainerEl.textContent = '';
    artistInputEl.value = '';
  } else {
    alert('Please enter an artist name');
  }
};

var buttonClickHandler = function (event) {
  var century = event.target.getAttribute('data-century');

  if (century) {
    getCentury(century);

    artworkContainerEl.textContent = '';
  }
};

var getArtist = function (artist) {
  var apiUrl = "https://openaccess-api.clevelandart.org/api/artworks?artists=" + artist;

  var artistInput = {
    savedArtist: artist,
  }
  var savedArtist = JSON.parse(localStorage.getItem("savedArtist")) || [];

  savedArtist.push(artistInput);
  localStorage.setItem("savedArtist", JSON.stringify(savedArtist));
  renderSearches();

fetch(apiUrl)
  .then(function (response) {
    if (response.ok) {
      console.log(response);
      response.json().then(function (data) {
        console.log(data);
        displayArtwork(data, artist);
      });
    } else {
      alert('Error: ' + response.statusText);
    }
  })
  .catch(function (error) {
    alert('Unable to connect to Cleveland API');
  });
};

var getCentury = function (century) {
  var twentyOneUrl = 'https://openaccess-api.clevelandart.org/api/artworks?created_before=2021&created_after=2000';
  var twentyUrl = 'https://openaccess-api.clevelandart.org/api/artworks?created_before=2000&created_after=1900';
  var nineteenUrl = 'https://openaccess-api.clevelandart.org/api/artworks?created_before=1900&created_after=1800';
  var eighteenUrl = 'https://openaccess-api.clevelandart.org/api/artworks?created_before=1800&created_after=1700';
  if (century === "21st Century") {
    fetch(twentyOneUrl).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          displayArtwork(data, century);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    });
  } else if (century === "20th Century") {
    fetch(twentyUrl).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          displayArtwork(data, century);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    });
  } else if (century === "19th Century") {
    fetch(nineteenUrl).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          displayArtwork(data, century);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    });
  } else if (century === "18th Century") {
    fetch(eighteenUrl).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          displayArtwork(data, century);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    });
  }
}

var displayArtwork = function (artwork, searchTerm) {
  artworkContainerEl.html('');
  console.log(artwork.data.length);
  if (artwork.data.length === 0) {
    artworkContainerEl.text('No artwork found. Check your spelling or try another artist!');
    return;
  }

  artistSearchTerm.text(searchTerm);



  for (var i = 0; i < artwork.data.length; i++) {
    var artworkName = artwork.data[i].title;

    var artWorkEl = $('<a>');
    var favBtn = $('<button>');
    //to do change the heart button inline with the title name and paste to the right of artEl
    favBtn.addClass('btn btn-success');
    favBtn.text(`❤️`);
    // add materialize to these <a> elements
    artWorkEl.addClass('list-item flex-row justify-space-between align-center d-flex');
    //  add links to <a> elements

    var titleEl = $('<span>');
    titleEl.text(artworkName);
    
    titleEl.append(favBtn);
    artWorkEl.append(titleEl);
    artworkContainerEl.append(artWorkEl);
  }
};

searchFormEl.on('submit', formSubmitHandler);
centuryButtonsEl.on('click', buttonClickHandler);

// Puts search history into the page
var renderSearches = function () {
  // This line grabs the searchhistory ID and clears the element
  $('#searchHistory').html("");
  // This creates a variable that either stores the local "savedArtist" item or creates an empty array
  var savedArtist = JSON.parse(localStorage.getItem("savedArtist")) || [];

  for (i = 0; i < savedArtist.length; i++) {
      var savedArtistListItem = $('<button>');
      savedArtistListItem.addClass("btn btn-secondary")
      savedArtistListItem.text(savedArtist[i].savedArtist);
      $('#searchHistory').append(savedArtistListItem);
  }
}

$('#searchHistory').on("click", "button", function (e){
  var historyEl = e.target
  getArtist($(historyEl).text())
})

$('#artwork-container').on("click", "button", function(e){
  var favoriteEl = e.target;
  var favTitle = $(favoriteEl).parent().text();
  // var artistName = $(this).parent().text();
  
  var favInput = {
    savedArt: favTitle,
  }
  var savedArt = JSON.parse(localStorage.getItem("savedArt")) || [];

  savedArt.push(favInput);
  localStorage.setItem("savedArt", JSON.stringify(savedArt));
})

var renderFavorites = function () {
  $('#Favorites').html("");
  var savedFavorites = JSON.parse(localStorage.getItem("savedArt")) || [];

  for (i = 0; i < savedFavorites.length; i++) {
      var savedArtListItem = $('<button>');
      savedArtListItem.addClass("btn btn-secondary")
      savedArtListItem.text(savedFavorites[i].savedArt);
      $('#Favorites').append(savedArtListItem);
  }
}


renderSearches();

// This function happens second
renderFavorites();
