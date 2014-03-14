BCDL.sections[3] = function ( data ) {

	var that = this;

	var r = ( $(window).height() / 2 ) - 100;
	var offset = 20;
	var width = ( r * 2 ) + ( offset * 2 );
	var height = width;


	

	var createPieChart = function ( e ) {
		$('#pass-wrapper').find( 'svg' ).remove();

		var svg = d3.select( '#pass-wrapper' )
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
			.value( function ( d, i ) { return d.value } );

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
				var size = 0;
				for ( var i = 0; i < that.data.length; i++ ) {
					size += that.data[i].value;
				}
				var average = Math.floor( ( datum.data.value / size ) * 100 );
				var label = datum.data.label;
				$('#pass-wrapper').find( 'header' ).find( 'h1' ).html( average + '%' );
				$('#pass-wrapper').find( 'header' ).find( 'h2' ).html( label );
			})
			.on( 'mouseout', function ( e ) {
				d3.select( this )
					.transition()
					.duration( 200 )
					.ease( 'ease-out' )
					.attr( 'd', arc );
				$('#pass-wrapper').find( 'header' ).find( 'h1' ).html( '' );
				$('#pass-wrapper').find( 'header' ).find( 'h2' ).html( '' );
			});
	
	};


	var createBarGraph = function ( e ) {

		// setup.
		$('#pass-wrapper').find( 'svg' ).remove();

		// create the svg element
		var svg = d3.select( '#pass-wrapper' )
			.append( 'svg' )
			.attr( { "width": width, "height": height } );

		// get the grouped scales
		var maxY = d3.max( that.data, function ( d ) {
			return d.value;
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
				.attr( 'transform', 'translate(15,12)' );
			rects
				.attr( 'width', xScale( 1 ) - offset )
				.attr( 'height', function ( d ) {
					return Math.abs( (height - (offset * 4) ) - yScale( d.value ) );
				})
				.attr( 'x', function ( d ) {
					return xScale( parseInt( d.name ) ) + (offset / 2);
				})
				.attr( 'y', function ( d ) {
					return yScale( d.value );
				})

		};

		var moveToStacked = function () {
			var passFail = [ 0, 0 ];
			for ( var i = 0; i < that.data.length; i++ ) {
				passFail[that.data[i].pass] += that.data[i].value;
			}
			var maxYStacked = d3.max( passFail );
			var xScaleStacked = d3.scale.linear()
				.domain( [ 0, 2 ] )
				.range( [ 0, width ] );
			var yScaleStacked = d3.scale.linear()
				.domain( [ 0, maxYStacked ] )
				.range( [ height - ( offset * 4 ), 0 ] );
			var xAxis = d3.svg.axis()
				.scale( xScaleStacked )
				.orient( 'bottom' )
				.tickFormat( function ( d ) {
					if ( d === 0 ) {
						return "Failed or passed dubiously";
					} else if ( d === 1) {
						return "Passed";
					}
				})
				.ticks( 2 )
			svg.append( 'g' ).attr( 'class', 'x-axis' )
			svg.select( 'g.x-axis' )
				.call( xAxis )
				.attr( 'transform', 'translate(0,' + (height - (offset * 4)) + ')' )
				.selectAll( 'text' )
				.attr( 'transform', 'translate(' + xScaleStacked( .5 ) + ',0)' )
			var yIndex = [ 0, 0 ];		
			rects
				.attr( 'width', xScaleStacked( 1 ) - ( offset * 2 ) )
				.attr( 'height', function ( d ) {
					return Math.abs( (height - (offset * 4)) - yScaleStacked( d.value ) );
				})
				.attr( 'x', function ( d ) {
					return xScaleStacked( d.pass ) + ( offset );
				})
				.attr( 'y', function ( d ) {
					yIndex[d.pass] += d.value;
					return yScaleStacked( yIndex[d.pass] );
				})
			rects
				.on( 'mouseover', function ( e ) {
					d3.select( this )
						.transition()
						.duration( 200 )
						.attr( 'width', xScaleStacked( 1 ) )
						.attr( 'x', function ( d ) {
							return xScaleStacked( d.pass );
						});
				})
				.on( 'mouseout', function ( e ) {
					d3.select( this )
						.transition()
						.duration( 200 )
						.attr( 'width', xScaleStacked( 1 ) - ( offset * 2 ) )
						.attr( 'x', function ( d ) {
							return xScaleStacked( d.pass ) + ( offset );
						});
				});
		};

		moveToStacked();

	};

	this.on = function () {
		if ( !this.hasBeenCalled ) {
			this.hasBeenCalled = true;
			d3.json( '/bechdel-2013/api/section/3', function ( data ) {
				that.data = data;
				createPieChart();
				$('#pass-bar').on( 'click', createBarGraph );
				$('#pass-pie').on( 'click', createPieChart );
			});			
		}
	
	};

}