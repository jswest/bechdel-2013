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
      amountMade: 0
    },
    {
      name: '1',
      value: 0,
      label: 'Failed as they didn&rsquo;t talk',
      className: 'fail-1',
      amountMade: 0
    },
    {
      name: '2',
      value: 0,
      label: 'Failed as they talked, but about a man',
      className: 'fail-2',
      amountMade: 0
    },
    {
      name: '3',
      value: 0,
      label: 'Passed, dubiously.',
      className: 'pass-3',
      amountMade: 0
    },
    {
      name: '4',
      value: 0,
      label: 'Passed',
      className: 'pass-4',
      amountMade: 0
    }
  ];
  for ( var i = 0; i < data.length; i++ ) {
    goodData[data[i].bechdel].value++;
  }

  var setupGrid = function () {
    $('#section-2').find( 'ul' )
      .css({
        width: width,
        height: height
      })
      .find( 'li' )
      .css({
        width: width / 3,
        height: height / 3
      });
  };

  var passAverage = function () {
    var average = Math.floor( ( goodData[4].value / data.length ) * 100 );
    $('#passing-figure').append( '<h1>' + average + '</h1>' );
  };

  this.on = function () {
    setupGrid();
    passAverage();
  }

}