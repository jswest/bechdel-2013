BCDL.sections[3] = function ( data ) {

  var width = ( ( $(window).height() / 2 ) - 100 ) * 2 ;
  var height = width;
  var subwidth = width / 2;
  var subheight = height / 2;
  var goodData = [
    {
      name: '0',
      value: 0,
      label: 'Failed as there weren&rsquo;t two women',
      className: 'fail-0',
      amountMade: 0,
      imdbRating: 0,
      rtRating: 0
    },
    {
      name: '1',
      value: 0,
      label: 'Failed as they didn&rsquo;t talk',
      className: 'fail-1',
      amountMade: 0,
      imdbRating: 0,
      rtRating: 0
    },
    {
      name: '2',
      value: 0,
      label: 'Failed as they talked, but about a man',
      className: 'fail-2',
      amountMade: 0,
      imdbRating: 0,
      rtRating: 0
    },
    {
      name: '3',
      value: 0,
      label: 'Passed, dubiously.',
      className: 'pass-3',
      amountMade: 0,
      imdbRating: 0,
      rtRating: 0
    },
    {
      name: '4',
      value: 0,
      label: 'Passed',
      className: 'pass-4',
      amountMade: 0,
      imdbRating: 0,
      rtRating: 0
    }
  ];
  for ( var i = 0; i < data.length; i++ ) {
    if ( data[i].bechdel !== "-1" ) {
      goodData[data[i].bechdel].value++;
      goodData[data[i].bechdel].amountMade += data[i].amount;
      goodData[data[i].bechdel].imdbRating += data[i].imdbRating;
      goodData[data[i].bechdel].rtRating += data[i].rtRating;      
    }
  }

  var setupGrid = function () {
    $('#section-2').find( 'ul' )
      .css({
        width: width,
        height: height
      })
      .find( 'li' )
      .css({
        width: width / 2,
        height: height / 3
      });
    $('#section-2').find( 'ul' ).find( 'li' ).eq( 0 ).css( 'width', width );
  };

  var passAverage = function () {
    var average = Math.floor( ( goodData[4].value / data.length ) * 100 );
    $('#passing-figure').append( '<h1>' + average + '%</h1>' );
  };
  var amountTotal = function () {
    var passAmount = Math.round( goodData[4].amountMade / 100 ) / 10;
    var failAmount = 0;
    for ( var i = 0; i < goodData.length; i++ ) {
      if ( goodData[i].name !== "4" ) {
        failAmount += goodData[i].amountMade;
      }
    }
    failAmount = Math.round( failAmount / 100 ) / 10;
    $('#total-earnings-pass-figure').append( '<h1>$' + passAmount + 'B</h1>' );
    $('#total-earnings-fail-figure').append( '<h1>$' + failAmount + 'B</h1>' );
  };
  var amountAverage = function () {
    var passAverage = Math.round( goodData[4].amountMade / goodData[4].value );
    var failAmount = 0;
    var failValue = 0;
    for ( var i = 0; i < goodData.length; i++ ) {
      if ( goodData[i].name !== "4" ) {
        failAmount += goodData[i].amountMade;
        failValue += goodData[i].value;
      }
    }
    var failAverage = Math.round( failAmount / failValue );
    $('#average-earnings-pass-figure').append( '<h1>$' + passAverage + 'M</h1>' );
    $('#average-earnings-fail-figure').append( '<h1>$' + failAverage + 'M</h1>' );
  };
  var ratingAverage = function () {
    var passAverage = Math.round( ( goodData[4].rtRating / goodData[4].value ) );
    var failRating = 0;
    var failValue = 0;
    for ( var i = 0; i < goodData.length; i++ ) {
      if ( goodData[i].name !== "4" ) {
        failRating += goodData[i].rtRating;
        failValue += goodData[i].value;
      }
    }
    var failAverage = Math.round( ( failRating / failValue ) );
    $('#average-rating-pass-figure').append( '<h1>' + passAverage + '%</h1>' );
    $('#average-rating-fail-figure').append( '<h1>' + failAverage + '%</h1>' );
  };

  var genres = function () {
    var genres = {
      passing: {},
      failing: {}
    };
    for ( var i = 0; i < data.length; i++ ) {
      for ( var j = 0; j < data[i].genres.length; j++ ) {
        var genre = data[i].genres[j];
        if ( data[i].bechdel === "4" ) { // passing
          if ( typeof genres['passing'][genre] === 'undefined' ) {
            genres['passing'][genre] = 1;
          } else {
            genres['passing'][genre]++;
          }
        } else {
          if ( typeof genres['failing'][genre] === 'undefined' ) {
            genres['failing'][genre] = 1;
          } else {
            genres['failing'][genre]++;
          }          
        }
      }
    }
    console.log( genres );
  }

  this.on = function () {
    setupGrid();
    passAverage();
    amountTotal();
    amountAverage();
    ratingAverage();
    genres();
  }

}