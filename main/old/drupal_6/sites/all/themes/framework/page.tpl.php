<?php
// $Id: page.tpl.php,v 1.1.4.12 2008/11/28 06:18:46 andregriffin Exp $
?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="<?php print $language ?>" lang="<?php print $language ?>">
  <head>
    <title><?php print $head_title ?></title>
    <?php print $head ?>
    <?php print $styles ?>
    <?php print $scripts ?>
    <!--[if lte IE 7]><?php print phptemplate_get_ie_styles(); ?><![endif]--><!--If Less Than or Equal (lte) to IE 7-->
  </head>
  <body<?php print phptemplate_body_class($sidebar_left, $sidebar_right); ?>>

<!-- Layout -->
    <div id="wrapper">
      <div id="header">
        <?php print $header; ?>
          
        <?php if ($logo): ?>
          <a href="<?php print check_url($base_path); ?>" title="<?php print check_plain($site_name); ?>">
            <img src="<?php print check_url($logo); ?>" alt="<?php print check_plain($site_name); ?>" id="logo" />
          </a>
        <?php endif; ?>
        <?php print '<h1><a href="'. check_url($base_path) .'" title="'. check_plain($site_name) .'">';
          if ($site_name) {
            print '<span id="sitename">'. check_plain($site_name) .'</span>';
          }
          if ($site_slogan) {
            print '<span id="siteslogan">'. check_plain($site_slogan) .'</span>';
          }
          print '</a></h1>';
        ?>
        
        <?php if ($search_box): ?><?php print $search_box ?><?php endif; ?>
        <div class="clear"></div>
      </div> <!-- /#header -->

      <div id="nav">
        <?php if (isset($primary_links)) : ?>
          <?php print theme('links', $primary_links, array('class' => 'links primary-links')) ?>
        <?php endif; ?>
        <?php if (isset($secondary_links)) : ?>
          <?php print theme('links', $secondary_links, array('class' => 'links secondary-links')) ?>
        <?php endif; ?>
      </div> <!-- /#nav -->

      <div id="container">
  
        <?php if ($sidebar_left): ?>
          <div id="sidebar-left" class="sidebar">
            <?php print $sidebar_left ?>
          </div> <!-- /#sidebar-left -->
        <?php endif; ?>

        <div id="center">
          <?php if ($breadcrumb): print $breadcrumb; endif; ?>
          <?php if ($mission): print '<div id="mission">'. $mission .'</div>'; endif; ?>
          <?php if ($tabs): print '<div id="tabs-wrapper" class="clear-block">'; endif; ?>
          <?php if ($title): print '<h2'. ($tabs ? ' class="with-tabs"' : '') .'>'. $title .'</h2>'; endif; ?>
          <?php if ($tabs): print $tabs .'</div>'; endif; ?>
          <?php if (isset($tabs2)): print $tabs2; endif; ?>
          <?php if ($help): print $help; endif; ?>
          <?php if ($messages): print $messages; endif; ?>
          <?php print $content ?>
        </div> <!-- /#center -->

        <?php if ($sidebar_right): ?>
          <div id="sidebar-right" class="sidebar">
            <?php print $sidebar_right ?>
          </div> <!-- /#sidebar-right -->
        <?php endif; ?>

        <div id="footer" class="clear">
          <?php print $footer_message ?>
          <?php print $feed_icons ?>
        </div> <!-- /#footer -->

      </div> <!-- /#container -->
      <span class="clear"></span>
    </div> <!-- /#wrapper -->
<!-- /layout -->

  <?php print $closure ?>

  </body>
</html>
