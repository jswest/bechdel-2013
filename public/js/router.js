BCDL.Router = Backbone.Router.extend({

	// Define the routes.
	routes: {
		'': 'home',
		':id/:slug': 'section'
	},

	home: function () {
		BCDL.initSections[0].on();
	},

	section: function ( id, slug ) {
		console.log( 'section called' );
		var i
		,		scrollTo;
		for ( i = 0; i <= id; i++ ) {
			BCDL.initSections[i].on();
		}
		scrollTo = $('.section').eq( id ).offset().top;
		$('.section').off( 'inview', BCDL.inviewHandler );
		$('.section').off( 'outview', BCDL.outviewHandler );
		$('#sections').animate( { scrollTop: scrollTo }, 20, function () {
			$('.section').on( 'inview', BCDL.inviewHandler );
			$('.section').on( 'outview', BCDL.outviewHandler );
		});

	}

});
