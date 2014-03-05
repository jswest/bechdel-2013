BCDL.sections[2] = function ( data ) {

	var that = this;

	this.r = ($(window).height() / 2) - 100;
	this.offset = 20;
	this.width = (this.r * 2) + (this.offset * 2);
	this.height = this.width;

	var fixData = function ( data ) {
		var betterData = [
			{
				name: '0',
				value: 0,
				label: 'Failed as there weren&rsquo;t two women'
			},
			{
				name: '1',
				value: 0,
				label: 'Failed as they didn&rsquo;t talk'
			},
			{
				name: '2',
				value: 0,
				label: 'Failed as they talked, but about a man'
			},
			{
				name: '3',
				value: 0,
				label: 'Passed, dubiously.'
			},
			{
				name: '4',
				value: 0,
				label: 'Passed'
			}
		];
		for ( var i = 0; i < data.length; i++ ) {
			betterData[data[i].bechdel].value++;
		}
		return betterData;
	}

	var createSVG = function () {
		that.svg = d3.select( '#pass-wrapper' )
			.append( 'svg' )
			.data( [ that.data ] )
			.attr( { "width": that.width, "height": that.height } )
			.append( 'g' )
			.attr( "transform", "translate(" + ( that.r + that.offset ) + "," + ( that.r + that.offset ) + ")" );
	};

	var createArc = function () {
		that.arc = d3.svg.arc()
			.outerRadius( that.r )
			.innerRadius( that.r * ( 7 / 8 ) );
		that.overArc = d3.svg.arc()
			.outerRadius( that.r + that.offset )
			.innerRadius( ( that.r * ( 7/ 8 ) ) - ( that.offset * 3 ) );

	};

	var createPie = function () {
		that.pie = d3.layout.pie()
			.sort( function ( a, b ) {
				if ( a.name < b.name ) { return 1; }
				else { return -1; }
			} )
			.value( function ( d, i ) {
				return d.value;
			} );

	};

	var createArcs = function () {

		that.arcs = that.svg.selectAll( "g.slice" )
			.data( that.pie )
			.enter()
			.append( 'g' ).attr( 'class', 'slice' );
		var paths = that.arcs.append( 'path' )
			.attr( 'fill', function ( d, i ) {
				var b = d.data.name;
				if ( b === "4" ) {
					return 'rgba(255,255,255,1)';
				} else if ( b === "3" ) {
					return 'rgba(255,255,255,.5)'
				} else if ( b === "2" ) {
					return 'rgba(0,0,0,.33)';
				} else if ( b === "1" ) {
					return 'rgba(0,0,0,.66)';
				} else {
					return 'rgba(0,0,0,1)';
				}
			})
			.attr( "d", that.arc )
		/*
		paths
			.transition()
				.duration( 2000 )
				.ease( 'linear' )
				.attrTween( 'd', function ( d ) {
					var i = d3.interpolate( 0, d.endAngle );
					return function ( t ) {
						d.endAngle = i( t );
						return that.arc( d );
					}
				} )
		*/
		paths
			.on( 'mouseover', function ( e ) {
				d3.select( this )
					.transition()
					.duration( 200 )
					.ease( 'ease-in' )
					.attr( 'd', that.overArc );
				console.log( d3.select( this ).datum() );
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
					.attr( 'd', that.arc );
				$('#pass-wrapper').find( 'header' ).find( 'h1' ).html( '' );
				$('#pass-wrapper').find( 'header' ).find( 'h2' ).html( '' );

			})
	};

	this.on = function () {
		that.data = fixData( data );
		createSVG();
		createArc();
		createPie();
		createArcs();
	};

}