BCDL.sections[2] = function ( data ) {

	var that = this;

	var r = ( $(window).height() / 2 ) - 100;
	var offset = 20;
	var width = ( r * 2 ) + ( offset * 2 );
	var height = width;


	var fixData = function ( data ) {
		var betterData = [
			{
				name: '0',
				value: 0,
				pass: 0,
				label: 'Failed: there weren&rsquo;t two women',
				barLabel: 'Not two women'
			},
			{
				name: '1',
				value: 0,
				pass: 0,
				label: 'They didn&rsquo;t talk',
				barLabel: 'They did not talk'
			},
			{
				name: '2',
				value: 0,
				pass: 0,
				label: 'They talked only about a man',
				barLabel: 'They talked about a man'
			},
			{
				name: '3',
				value: 0,
				pass: 0,
				label: 'Passed, dubiously.',
				barLabel: 'Passed, dubiously'
			},
			{
				name: '4',
				value: 0,
				pass: 1,
				label: 'Passed',
				barLabel: 'Passed'
			}
		];
		for ( var i = 0; i < data.length; i++ ) {
			betterData[data[i].bechdel].value++;
		}
		return betterData;
	}

	var createPieChart = function ( e ) {
		$('#pass-wrapper').find( 'svg' ).remove();

		var svg = d3.select( '#pass-wrapper' )
			.append( 'svg' )
			.data( [ fixData( data ) ] )
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
				console.log( 'mouseover' );
				d3.select( this )
					.transition()
					.duration( 200 )
					.ease( 'ease-in' )
					.attr( 'd', overArc );
				var datum = d3.select( this ).datum();
				var average = Math.floor( ( datum.data.value / data.length ) * 100 );
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


	createBarGraph = function ( e ) {

		// setup.
		$('#pass-wrapper').find( 'svg' ).remove();
		var fixedData = fixData( data );

		// create the svg element
		var svg = d3.select( '#pass-wrapper' )
			.append( 'svg' )
			.attr( { "width": width, "height": height } );

		// get the grouped scales
		var maxY = d3.max( fixedData, function ( d ) {
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
			.data( fixData( data ) )
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
			for ( var i = 0; i < fixedData.length; i++ ) {
				tickValues.push( fixedData[i].label );
			}
			var xAxis = d3.svg.axis()
				.scale( xScale )
				.orient( 'bottom' )
				.tickFormat( function ( d ) {
					if ( d < 5 ) {
						return fixData( data )[d].barLabel;
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
			for ( var i = 0; i < fixedData.length; i++ ) {
				passFail[fixedData[i].pass] += fixedData[i].value;
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
				.attr( 'width', xScaleStacked( 1 ) - offset )
				.attr( 'height', function ( d ) {
					return Math.abs( (height - (offset * 4)) - yScaleStacked( d.value ) );
				})
				.attr( 'x', function ( d ) {
					return xScaleStacked( d.pass ) + (offset / 2);
				})
				.attr( 'y', function ( d ) {
					yIndex[d.pass] += d.value;
					return yScaleStacked( yIndex[d.pass] );
				})
		};

		moveToStacked();

	};

	this.on = function () {
		createPieChart();
		$('#pass-bar').on( 'click', createBarGraph );
		$('#pass-pie').on( 'click', createPieChart );
	};

}