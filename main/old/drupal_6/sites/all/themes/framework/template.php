<?php
// $Id: template.php,v 1.1.4.11 2008/11/28 06:18:46 andregriffin Exp $

/**
 * Sets the body-tag class attribute.
 *
 * Adds 'sidebar-left', 'sidebar-right' or 'sidebars' classes as needed.
 */
function phptemplate_body_class($sidebar_left, $sidebar_right) {
  if ($sidebar_left != '' && $sidebar_right != '') {
    $class = 'sidebars';
  }
  else {
    if ($sidebar_left != '') {
      $class = 'sidebar-left';
    }
    if ($sidebar_right != '') {
      $class = 'sidebar-right';
    }
  }

  if (isset($class)) {
    print ' class="'. $class .'"';
  }
}

/**
 * Return a themed breadcrumb trail.
 *
 * @param $breadcrumb
 *   An array containing the breadcrumb links.
 * @return a string containing the breadcrumb output.
 */
function phptemplate_breadcrumb($breadcrumb) {
  if (!empty($breadcrumb)) {
// uncomment the next line to enable current page in the breadcrumb trail
//    $breadcrumb[] = drupal_get_title();
    return '<div class="breadcrumb">'. implode(' » ', $breadcrumb) .'</div>';
  }
}

/**
 * Allow themable wrapping of all comments.
 */
function phptemplate_comment_wrapper($content, $type = null) {
  static $node_type;
  if (isset($type)) $node_type = $type;

  if (!$content || $node_type == 'forum') {
    return '<div id="comments">'. $content . '</div>';
  }
  else {
    return '<div id="comments"><h2 class="comments">'. t('Comments') .'</h2>'. $content .'</div>';
  }
}

/**
 * Override or insert PHPTemplate variables into the templates.
 */
function _phptemplate_variables($hook, $vars) {
  if ($hook == 'page') {

    if ($secondary = menu_secondary_local_tasks()) {
      $output = '<span class="clear"></span>';
      $output .= "<ul class=\"tabs secondary\">\n". $secondary ."</ul>\n";
      $vars['tabs2'] = $output;
    }

    // Hook into color.module
    if (module_exists('color')) {
      _color_page_alter($vars);
    }
		
    // Hook into page_title.module
    if (module_exists('page_title')) {
      $vars['head_title'] = page_title_page_get_title();
    }
    return $vars;
  }
  return array();
}

/**
 * Returns the rendered local tasks. The default implementation renders
 * them as tabs.
 *
 * @ingroup themeable
 */
function phptemplate_menu_local_tasks() {
  $output = '';

  if ($primary = menu_primary_local_tasks()) {
    $output .= "<ul class=\"tabs primary\">\n". $primary ."</ul>\n";
  }

  return $output;
}

/**
 * Generates IE CSS links.
 */
function phptemplate_get_ie_styles() {
  $iecss = '<link type="text/css" rel="stylesheet" media="all" href="'. base_path() . path_to_theme() .'/fix-ie.css" />';
  return $iecss;
}

function phptemplate_get_ie6_styles() {
  $iecss = '<link type="text/css" rel="stylesheet" media="all" href="'. base_path() . path_to_theme() .'/fix-ie6.css" />';
  return $iecss;
}

/**
 * Adds even and odd classes to <li> tags in ul.menu lists
 */
function phptemplate_menu_item($mid, $children = '', $leaf = true) {
static $count = 0;
$zebra = ($count % 2) ? 'odd' : 'even';
$count++;
return '<li class="' . ($leaf ? 'leaf' : ($children ? 'expanded' : 'collapsed')) .' ' . $zebra . '">'. menu_item_link($mid) . $children ."</li>\n";
}

/**
* Fixes illegal duplicate html id's "edit-sumit".
*/
function phptemplate_submit($element) {
  static $dupe_ids = array();
  if (isset($dupe_ids[$element['#id']])) {
    $dupe_ids[$element['#id']]++;
    $element['#id'] = $element['#id'] .'-'. $dupe_ids[$element['#id']];
  }
  else {
    $dupe_ids[$element['#id']] = 0;
  }
  return theme('button', $element);
}
