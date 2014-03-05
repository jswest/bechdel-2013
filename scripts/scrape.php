<?php
require_once 'vendor/autoload.php';
$response = Requests::get('http://www.imdb.com/search/title?at=0&sort=boxoffice_gross_us&title_type=feature&year=2013,2013');

$document = phpQuery::newDocument( $response->body );
$trs = pq('tr.detailed');

$films = array();
foreach( $trs as $tr ) {
	$title = pq( $tr )->find( 'td.title' )->find( 'a' )->eq( 0 )->text();

	$link = 'http://imdb.com' . pq( $tr )->find( 'td.title' )->find( 'a' )->eq( 0 )->attr( 'href' );

	$id = explode( "/", pq( $tr )->find( 'td.title' )->find( 'a' )->eq( 0 ) )[2];
	$id = str_replace( array( "t" ), "", $id );

	$amount = floatval( str_replace( array( "$", "M" ), "", pq( $tr )->find( 'td.sort_col' )->text() ) );

	$imdb_rating = floatval( pq( $tr )->find( '.rating-rating' )->find( '.value' )->text() );

	$genres = pq( $tr )->find( '.genre' )->text();
	$genres = strtolower( $genres );
	$genres_array = explode( "|", $genres );
	$genres = array();
	foreach ( $genres_array as $genre ) {
		$genre = trim( $genre );
		array_push( $genres, $genre );
	}

	$summary = pq( $tr )->find( 'span.outline')->text();

	$bechdel_response = Requests::get( 'http://bechdeltest.com/api/v1/getMovieByImdbId?imdbid=' . $id );
	$bechdel_array = json_decode( $bechdel_response->body );
	var_dump( $bechdel_array );
	$bechdel = $bechdel_array->rating;
	if ( $bechdel === "3" && $bechdel_array->dubious === "0" )  {
		$bechdel = "4";
	}
	else if ( $bechdel === "3" && $bechdel_array->dubious === "1" ) {
		$bechdel = "3";
	}

	$film = array(
		"id" => $id,
		"title" => $title,
		"link" => $link,
		"amount" => $amount,
		"imdbRating" => $imdb_rating,
		"summary" => $summary,
		"genres" => $genres,
		"bechdel" => $bechdel
	);
	if ( $film['bechdel'] !== null ) {
		array_push( $films, $film );
	}
}

$fp = fopen( 'data/pretty.json', 'w' );
fwrite( $fp, json_encode( $films, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT ) );
fclose( $fp );
