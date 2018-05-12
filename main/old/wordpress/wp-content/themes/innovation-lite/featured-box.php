<?php
/* 	Innovation Lite Theme's Featured Box to show the Featured Items of Front Page
	Copyright: 2015-2016, D5 Creation, www.d5creation.com
	Based on the Simplest D5 Framework for WordPress
	Since Innovation Lite 1.0
*/
?>

<div class="box90">
	<div class="featured-boxs">
		<?php foreach (range(1, 4) as $fboxn) { ?>
				<span class="featured-box" > 
					<div class="box-icon fa-asterisk"></div>
						<h3 class="ftitle"><?php echo esc_attr(innovation_get_option('featured-title' . $fboxn, 'Innovation Lite Responsive')); ?></h3>
						<p><?php echo esc_textarea(innovation_get_option('featured-description' . $fboxn , 'The Color changing options of Innovation Lite will give the WordPress Driven Site an attractive look. Innovation Lite is super elegant and Professional Responsive Theme which will create the business widely expressed.')); ?></p>
				</span>
		<?php } ?>

	</div> <!-- featured-boxs -->

</div>
<div class="lsep"></div>
