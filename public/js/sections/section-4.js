BCDL.sections[4] = function () {

  var that = this;

	var r = ( $(window).height() / 2 ) - 100;
	var offset = 20;
	var width = ( r * 2 ) + ( offset * 2 );
	var height = width;

	var createPieChart = function ( e ) {
		$('#amount-wrapper').find( 'svg' ).remove();

		var svg = d3.select( '#amount-wrapper' )
			.append( 'svg' )
			.data( [ that.data ] )
			.attr( { "width": width, "height": height } )
			.append( 'g' )
			.attr( "transform", "translate(" +  ( r + offset ) + "," + ( r + offset ) + ")" );

		var arc = d3.svg.arc()
			.outerRadius( r )
			.innerRadius( r * ( 7 / 8 ) )
		var overArc = d3.svg.arc()
			.outerRadius( r + offset )
			.innerRadius( ( r * ( 7 / 8 ) ) - ( offset * 3 ) );

		var pie = d3.layout.pie()
			.sort( function ( a, b ) {
				if ( a.name < b.name ) { return 1; }
				else { return -1; }
			})
			.value( function ( d, i ) { return Math.floor( d.amountMade / d.value ) } );

		var arcs = svg.selectAll( 'g.slice' )
			.data( pie )
			.enter()
			.append( 'g' ).attr( 'class', 'slice' )
		var paths = arcs.append( 'path' )
			.attr( 'fill', function ( d, i ) {
				var b = d.data.name;
				if ( b === "4" ) { return 'rgba(255,255,255,1)'; }
				else if ( b === "3" ) { return 'rgba(255,255,255,.5)'; }
				else if ( b === "2" ) { return 'rgba(0,0,0,.33)'; }
				else if ( b === "1" ) { return 'rgba(0,0,0,.66)'; }
				else { return 'rgba(0,0,0,1)'; }
			})
			.attr( 'd', arc )

		paths
			.on( 'mouseover', function ( e ) {
				d3.select( this )
					.transition()
					.duration( 200 )
					.ease( 'ease-in' )
					.attr( 'd', overArc );
				var datum = d3.select( this ).datum();
				var amount = datum.data.amountMade;
				var label = datum.data.label;
				$('#amount-wrapper').find( 'header' ).find( 'h1' ).html( Math.floor( amount / datum.data.value ) + 'M' );
				$('#amount-wrapper').find( 'header' ).find( 'h2' ).html( label );
			})
			.on( 'mouseout', function ( e ) {
				d3.select( this )
					.transition()
					.duration( 200 )
					.ease( 'ease-out' )
					.attr( 'd', arc );
				$('#amount-wrapper').find( 'header' ).find( 'h1' ).html( '' );
				$('#amount-wrapper').find( 'header' ).find( 'h2' ).html( '' );
			});
	
	};

	createBarGraph = function ( e ) {

		// setup.
		$('#amount-wrapper').find( 'svg' ).remove();

		// create the svg element
		var svg = d3.select( '#amount-wrapper' )
			.append( 'svg' )
			.attr( { "width": width, "height": height } );

		// get the grouped scales
		var maxY = d3.max( that.data, function ( d ) {
			return d.amountMade / d.value;
		});
		var xScale = d3.scale.linear()
			.domain( [ 0, 5 ] )
			.range( [ 0, width ] );
		var yScale = d3.scale.linear()
			.domain( [ 0, maxY ] )
			.range( [ height - (offset * 4), 0 ] );

		// create the rects
		var rects = svg.selectAll( 'rect' )
			.data( that.data )
			.enter()
			.append( 'rect' )
			.attr( 'fill', function ( d ) {
				var b = d.name;
				if ( b === "4" ) { return 'rgba(255,255,255,1)'; }
				else if ( b === "3" ) { return 'rgba(255,255,255,.5)'; }
				else if ( b === "2" ) { return 'rgba(0,0,0,.33)'; }
				else if ( b === "1" ) { return 'rgba(0,0,0,.66)'; }
				else { return 'rgba(0,0,0,1)'; }				
			})

		var moveToGrouped = function () {
			var tickValues = [];
			for ( var i = 0; i < that.data.length; i++ ) {
				tickValues.push( that.data[i].label );
			}
			var xAxis = d3.svg.axis()
				.scale( xScale )
				.orient( 'bottom' )
				.tickFormat( function ( d ) {
					if ( d < 5 ) {
						return that.data[d].barLabel;
					} else {
						return null;
					}
				})
				.ticks( 5 );
			svg.append( 'g' ).attr( 'class', 'x-axis' )
			svg.select( 'g.x-axis' )
				.call( xAxis )
				.attr( 'transform', "translate(0," + (height - (offset * 4)) + ")" )
				.selectAll( 'text' )
				.attr( 'transform', 'translate(' + xScale( .5 ) + ',0)' );

			var yAxis = d3.svg.axis()
				.scale( yScale )
				.orient( 'left' )
				.tickFormat( function ( d ) {
					if ( d !== 0 ) { return d; }
				})
				.ticks( 5 )
				.tickSize( -width );
			svg.append( 'g' ).attr( 'class', 'y-axis' );
			svg.select( 'g.y-axis' )
				.call( yAxis )
				.selectAll( 'text' )
				.attr( 'transform', 'translate(24,12)' );
			rects
				.attr( 'width', xScale( 1 ) - offset )
				.attr( 'height', function ( d ) {
					return Math.abs( (height - (offset * 4) ) - yScale( d.amountMade / d.value ) );
				})
				.attr( 'x', function ( d ) {
					return xScale( parseInt( d.name ) ) + (offset / 2);
				})
				.attr( 'y', function ( d ) {
					return yScale( d.amountMade / d.value );
				});
		};

		moveToGrouped();
	};


  this.on = function () {
  	if ( !this.hasBeenCalled ) {
	    d3.json( '/bechdel-2013/api/section/4', function ( data ) {
	    	that.data = data;
	    	createPieChart();
	 			$('#amount-bar').on( 'click', createBarGraph );
				$('#amount-pie').on( 'click', createPieChart );
	    });  		
  	}
  	this.hasBeenCalled = true;
  }


};