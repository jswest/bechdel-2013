<!DOCTYPE html>
<html>
	<head>
		<title>2013 Bechdel Interactive Graphic</title>
		<meta name="content" content="charset=utf-8" />
		<link rel="stylesheet" type="text/css" href="/bechdel-2013/public/css/fonts.css">
		<link rel="stylesheet" type="text/css" href="/bechdel-2013/public/css/style.css">
		<script>
BCDL = {};
BCDL.sections = [];
BCDL.initSections = [];
		</script>
		<!--<script src="/bechdel-2013/public/js/manifest.min.js"></script>-->
		<script src="/bechdel-2013/public/js/vendor/jquery.min.js"></script>
		<script src="/bechdel-2013/public/js/vendor/d3.min.js"></script>
		<script src="/bechdel-2013/public/js/vendor/underscore.min.js"></script>
		<script src="/bechdel-2013/public/js/vendor/backbone.js"></script>
		<script src="/bechdel-2013/public/js/lib/inview.js"></script>
		<script src="/bechdel-2013/public/js/sections/section-0.js"></script>
		<script src="/bechdel-2013/public/js/sections/section-1.js"></script>
		<script src="/bechdel-2013/public/js/sections/section-2.js"></script>
		<script src="/bechdel-2013/public/js/sections/section-3.js"></script>
		<script src="/bechdel-2013/public/js/sections/section-4.js"></script>
		<script src="/bechdel-2013/public/js/sections/section-5.js"></script>
		<script src="/bechdel-2013/public/js/sections/section-6.js"></script>
		<script src="/bechdel-2013/public/js/app.js"></script>
		<script src="/bechdel-2013/public/js/router.js"></script>
	</head>
	<body>
		<footer id="primary-footer">
			<nav>
				<ul>
					<li>
						<a href="#colophon">colophon</a>
					</li>
					<li>
						<a href="#about-me">about me</a>
					</li>
					<li>
						<a href="#share">share</a>
					</li>
				</ul>
			</nav>
		</footer>
		<div id="sections">
			<section class="section" id="section-0" data-location="0" data-slug="title" data-loaded="false">
				<header id="bechdel-definition" class="definition">
					<h1>The Bechdel Test</h1>
					<h2>&ldquo;I only go to a movie if it satisfies three basic requirements. One, it has to have at least two women in it who, two, talk to each other about, three, something other than a man.&rdquo;</h2>
					<h2 class="byline">-A. Bechdel, <em>Dykes to Watch Out For</em></h2>
				</header>
			</section>

			<section class="section" id="section-1" data-location="1" data-slug="introduction" data-loaded="false">
				<header id="project-definition" class="definition">
					<h1>How Hollywood fared in 2013</h1>
					<h2>An exploration the 50 top-grossing films of 2013 and the Bechdel Test, inspired by <a href="">this article</a> by Versha Sharma and Hanna Sender at <em>Vocativ</em>.</h2>
				</header>
			</section>

			<section class="section" id="section-2" data-location="2" data-slug="the-bechdel-index" data-loaded="false">
				<header class="section-header" id="section-2-header">
					<h1 class="section-title">The Bechdel Index</h1>
					<h2 class="section-description">The topline numbers of how 2013&rsquo;s top 50 films fared.<br>(NB: dubiously passing films counted as &ldquo;failing&rdquo;.)</h2> 
				</header>
				<div class="svg-wrapper">
					<ul>
						<li>
							<div class="figure" id="passing-figure"></div>
							<div class="explanation">percent that passed</div>
						</li>
						<li>
							<div class="figure" id="average-rating-pass-figure"></div>
							<div class="explanation">average rating of passing films on rotten tomatoes</div>
						</li>
						<li>
							<div class="figure" id="average-rating-fail-figure"></div>
							<div class="explanation">average rating of failing films on rotten tomatoes</div>
						</li>
						<li>
							<div class="figure" id="average-earnings-pass-figure"></div>
							<div class="explanation">average amount made by passing films</div>
						</li>
						<li>
							<div class="figure" id="average-earnings-fail-figure"></div>
							<div class="explanation">average amount made by failing films</div>
						</li>
					</ul>
				</div>
			</section>


			<section class="section" id="section-3" data-location="3" data-slug="pass-fail" data-loaded="false">
				<header class="section-header" id="section-3-header">
					<h1 class="section-title">How did they fare?</h1>
					<ul>
						<li id="pass-pie">Pie</li>
						<li id="pass-bar">Bar</li>
					</ul>
				</header>
				<div class="svg-wrapper" id="pass-wrapper">
					<header id="section-3-labels">
						<h1></h1>
						<h2></h2>
					</header>
				</div>
			</section>

			<section class="section" id="section-4" data-location="4" data-slug="amount-made" data-loaded="false">
				<header class="section-header" id="section-4-header">
					<h1 class="section-title">How much did they make?</h1>
					<h2 class="section-description">The average amount made by each segement</h2>
					<ul>
						<li id="amount-pie">Pie</li>
						<li id="amount-bar">Bar</li>
					</ul>
				</header>
				<div class="svg-wrapper" id="amount-wrapper">
					<header id="section-4-labels">
						<h1></h1>
						<h2></h2>
					</header>
				</div>
			</section>

			<section class="section" id="section-5" data-location="5" data-slug="ratings" data-loaded="false">
				<header class="section-header" id="section-5-header">
					<h1 class="section-title">How well were they received?</h1>
				</header>
				<div class="svg-wrapper" id="ratings-wrapper">
				</div>
			</section>

			<section class="section" id="section-6" data-location="6" data-slug="genres" data-loaded="false">
				<header class="section-header" id="section-6-header">
					<h1 class="section-title">In which genres were they?</h1>
				</header>
				<div class="svg-wrapper" id="ratings-wrapper">
				</div>
			</section>

		</div>
	</body>
</html>