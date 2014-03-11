BCDL.sections[2] = function () {

  var that = this;

  var width = ( ( $(window).height() / 2 ) - 100 ) * 2 ;
  var height = width;
  var subwidth = width / 2;
  var subheight = height / 2;

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

  var passTotal = function () {
    var size = 0;
    for ( var i = 0; i < that.data.length; i++ ) {
      size += that.data[i].value;
    }
    var passPercent = Math.floor( ( that.data[4].value / size ) * 100 );
    $('#passing-figure').html( '<h1>' + passPercent + '%</h1>' );
  };
  var amountAverage = function () {
    var passAverage = Math.round( that.data[4].amountMade / that.data[4].value );
    var failAmount = 0;
    var failValue = 0;
    for ( var i = 0; i < that.data.length; i++ ) {
      if ( that.data[i].name !== "4" ) {
        failAmount += that.data[i].amountMade;
        failValue += that.data[i].value;
      }
    }
    var failAverage = Math.round( failAmount / failValue );
    $('#average-earnings-pass-figure').html( '<h1>$' + passAverage + 'M</h1>' );
    $('#average-earnings-fail-figure').html( '<h1>$' + failAverage + 'M</h1>' );
  };
  var ratingAverage = function () {
    var passAverage = Math.round( ( that.data[4].rtRating / that.data[4].value ) );
    var failRating = 0;
    var failValue = 0;
    for ( var i = 0; i < that.data.length; i++ ) {
      if ( that.data[i].name !== "4" ) {
        failRating += that.data[i].rtRating;
        failValue += that.data[i].value;
      }
    }
    var failAverage = Math.round( ( failRating / failValue ) );
    $('#average-rating-pass-figure').html( '<h1>' + passAverage + '%</h1>' );
    $('#average-rating-fail-figure').html( '<h1>' + failAverage + '%</h1>' );
  };

  this.on = function () {
    d3.json( '/bechdel-2013/api/section/2', function ( data ) {
      that.data = data;
      setupGrid();
      passTotal();
      amountAverage();
      ratingAverage();
    });
  }

}