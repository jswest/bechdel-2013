$( document ).ready( function () {
	$('.section').height( $(window).height() );
	for ( var i = 0; i < BCDL.sections.length; i++ ) {
		BCDL.initSections[i] = new BCDL.sections[i]();
	}
	BCDL.router = new BCDL.Router();
	Backbone.history.start({
		pushState: true,
		root: '/'
	});
});