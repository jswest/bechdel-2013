BCDL.inviewHandler = function ( e ) {
	var that = this;
	BCDL.location = $(this).data( 'location' );
	console.log( 'section ' + BCDL.location + ' inview' );
	BCDL.router.navigate( '/' + BCDL.location + '/' + $(this).data( 'slug' ) );
  for ( var i = 0; i < BCDL.location; i++ ) {
    if ( !$('.section').eq( i ).data( 'loaded' ) ) {
      BCDL.initSections[i].on();
    }
  }
  BCDL.initSections[BCDL.location].on();
  if ( typeof ga === "function" ) {
    ga('send', 'pageview', {
      'page': '/' + BCDL.location + '/' + $(this).data( 'slug' ),
      'title': $(this).data( 'slug' )
    });
  }  
};

BCDL.outviewHandler = function ( e ) {};

BCDL.scrollHandler = function ( e ) {

  // Set up events for each of the sections.
  $('.section').each( function() {

    var offset = $(this).offset().top
    ,   inview = $(this).data( 'inview' )
    ,   height = $(this).height()
    ,   wh     = $(window).height();

    // If we're entering view from top _or_ bottom.
    if ( offset <= wh && offset + height > wh && ! inview ) {
      $(this).data( 'inview', 'true' );
      $(this).trigger( 'inview' );
    }

    // If we're exiting view from top _or_ bottom.
    if ( (offset + height < wh && inview) || (offset > wh && inview) ) {
      $(this).data( 'inview', '' );
      $(this).trigger( 'outview' );        
    }
  }); 

};

$(document).ready( function () {
  $('.section').on( 'inview', BCDL.inviewHandler );
  $('.section').on( 'outview', BCDL.outviewHandler );
  //BCDL.debouncedScrollHandler = _.debounce( BCDL.scrollHandler, 10 );
  //$('#sections').on( 'scroll', BCDL.debouncedScrollHandler );
  var timer = setInterval( BCDL.scrollHandler, 50 );
});