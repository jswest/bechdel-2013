<?php

require 'vendor/autoload.php';
$raw_data = file_get_contents( 'data/pretty.json' );
$data = json_decode( $raw_data );
$raw_labels = file_get_contents( 'data/labels.json' );
$labels = json_decode( $raw_labels );

$app = new \Slim\Slim();

$app->get( '/', function () use ( $app ) {
	$app->render( 'index.php' );
});
$app->get( '/:section_id/:slug', function ( $section_id, $slug ) use ( $app ) {
	$app->render( 'index.php' );
});


$app->get( '/api/section/2', function () use ( $app, $data ) {
	$good_data = array( array(), array(), array(), array(), array() );
	foreach ( $data as $datum ) {
		$name = $datum->bechdel; //['bechdel'];
		if ( $name !== '-1' ) {
			$amount = $datum->amount; //['amountMade'];
			$rt_rating = $datum->rtRating; //['rtRating'];
			if ( isset( $good_data[intval( $name )]['value'] ) ) {
				$good_data[intval( $name )]['value']++;
				$good_data[intval( $name )]['amountMade'] += $amount;
				$good_data[intval( $name )]['rtRating'] += $rt_rating;
			}
			else {
				$good_data[intval( $name )]['name'] = $name;
				$good_data[intval( $name )]['value'] = 1;
				$good_data[intval( $name )]['amountMade'] = $amount;
				$good_data[intval( $name )]['rtRating'] = $rt_rating;	
			}	
		}
	}
	$app->response()->header( 'Content-Type', 'application/json' );
	echo json_encode( $good_data );
});

$app->get( '/api/section/3', function () use ( $app, $data, $labels ) {
	$good_data = array( array(), array(), array(), array(), array() );
	foreach ( $data as $datum ) {
		$name = $datum->bechdel; //['bechdel'];
		if ( $name !== '-1' ) {
			$pass = 0;
			if ( $name === '4' ) { $pass = 1; }
			$label = $labels[intval( $name )]->label; //['label'];
			$bar_label = $labels[intval( $name )]->barLabel; //['barLabel'];
			if ( isset( $good_data[intval( $name )]['value'] ) ) {
				$good_data[intval( $name )]['value']++;
			}
			else {
				$good_data[intval( $name )]['name'] = $name;
				$good_data[intval( $name )]['value'] = 1;
				$good_data[intval( $name )]['pass'] = $pass;
				$good_data[intval( $name )]['label'] = $label;
				$good_data[intval( $name )]['barLabel'] = $bar_label;
			}
		}
	}
	$app->response()->header( 'Content-Type', 'application/json' );
	echo json_encode( $good_data );

});

$app->run();