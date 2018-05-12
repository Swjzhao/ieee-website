<?php

/**
 * @file
 * User page callbacks for the role_watchdog module.
 */

/**
 * Display tab page from menu callback.
 *
 * @param $account
 *   User object.
 */
function og_role_watchdog_history($account) {
  $output = '';
  $rows = $rows2 = array();

  $roles = user_roles();

  $header = array(
    array(
      'data' => t('Date'),
      'style' => 'width: 25%;',
    ),
    array(
      'data' => t('Group'),
      'style' => 'width: 20%;',
    ),
    array(
      'data' => t('Role'),
      'style' => 'width: 20%;',
    ),
    array(
      'data' => t('Change'),
      'style' => 'width: 15%;',
    ),
    array(
      'data' => t('User'),
      'style' => 'width: 20%;',
    ),
  );
  $history_query = 'SELECT rw.rid, orw.gid, rw.action, rw.uid, rw.stamp, u.name, n.title, n.nid FROM {role_watchdog} rw LEFT JOIN {og_role_watchdog} orw ON (orw.hid = rw.hid) LEFT JOIN {node} n ON (orw.gid = n.nid) INNER JOIN {users} u ON (rw.uid = u.uid) WHERE rw.aid=%d ORDER BY rw.stamp DESC';

  $items_per_page = variable_get('role_watchdog_pager', 50);
  $result = pager_query($history_query, $items_per_page, 0, "SELECT COUNT(*) from {role_watchdog} rw WHERE rw.aid=%d", $account->uid);
  $rows = _og_role_watchdog_history_rows($result, $roles, array(t('removed by'), t('added by'), t('requested by'), t('approved for')));

  if (sizeof($rows)) {
    $output .= '<h3>' . t('Role History') . '</h3>' . theme('table', $header, $rows, array('style' => 'width: 99%;'));

    if ($pager = theme('pager', NULL, $items_per_page, 0)) {
      $output .= $pager;
    }
  }

  return $output ? $output : t('No role history found.');
}

function og_role_watchdog_grants($account) {
  $output = '';
  $rows = $rows2 = array();

  $roles = user_roles();

  $header = array(
    array(
      'data' => t('Date'),
      'style' => 'width: 25%;',
    ),
    array(
      'data' => t('Group'),
      'style' => 'width: 20%;',
    ),
    array(
      'data' => t('Role'),
      'style' => 'width: 20%;',
    ),
    array(
      'data' => t('Change'),
      'style' => 'width: 15%;',
    ),
    array(
      'data' => t('User'),
      'style' => 'width: 20%;',
    ),
  );
  $grants_query = 'SELECT rw.rid, orw.gid, rw.action, rw.aid, rw.stamp, u.name, n.title, n.nid FROM {role_watchdog} rw LEFT JOIN {og_role_watchdog} orw ON (orw.hid = rw.hid) LEFT JOIN {node} n ON (orw.gid = n.nid) INNER JOIN {users} u ON (rw.aid = u.uid) WHERE rw.uid=%d AND rw.aid<>%d ORDER BY rw.stamp DESC';

  $items_per_page = variable_get('role_watchdog_pager', 50);
  $result = pager_query($grants_query, $items_per_page, 0, "SELECT COUNT(*) from {role_watchdog} rw WHERE rw.uid=%d AND rw.aid<>%d", $account->uid, $account->uid);
  $rows2 = _og_role_watchdog_history_rows($result, $roles, array(t('removed from'), t('added to'), t('requested by'), t('approved for')));

  if (sizeof($rows2)) {
    $output .= '<h3>' . t('Role Grants Made') . '</h3>' . theme('table', $header, $rows2, array('style' => 'width: 99%;'));

    if ($pager = theme('pager', NULL, $items_per_page, 0)) {
      $output .= $pager;
    }
  }

  return $output ? $output : t('No role grants made.');
}

function og_role_watchdog_report($node = FALSE) {
  $output = '';
  $rows = $rows2 = array();

  $roles = user_roles();

  $header = array(
    array(
      'data' => t('Admin'),
      'style' => 'width: 15%;',
    ),
    array(
      'data' => t('Date'),
      'style' => 'width: 25%;',
    ),
    array(
      'data' => t('Group'),
      'style' => 'width: 15%;',
    ),
    array(
      'data' => t('Role'),
      'style' => 'width: 15%;',
    ),
    array(
      'data' => t('Change'),
      'style' => 'width: 15%;',
    ),
    array(
      'data' => t('User'),
      'style' => 'width: 15%;',
    ),
  );
  $items_per_page = variable_get('role_watchdog_pager', 50);
  if ($node) {
    $grants_query = 'SELECT rw.rid, orw.gid, rw.action, rw.aid, rw.stamp, u.name as name, u2.name as admin, rw.aid as uid, rw.uid as adminid, n.title, n.nid FROM {role_watchdog} rw LEFT JOIN {og_role_watchdog} orw ON (orw.hid = rw.hid) LEFT JOIN {node} n ON (orw.gid = n.nid) INNER JOIN {users} u ON (rw.aid = u.uid) INNER JOIN {users} u2 ON (rw.uid = u2.uid) where orw.gid = %d ORDER BY rw.stamp DESC';

    $result = pager_query($grants_query, $items_per_page, 0, "SELECT COUNT(*) from {role_watchdog} rw LEFT JOIN {og_role_watchdog} orw ON (orw.hid = rw.hid) WHERE orw.gid = %d", $node->nid);
    unset($header[2]);
  }
  else {
    $grants_query = 'SELECT rw.rid, orw.gid, rw.action, rw.aid, rw.stamp, u.name as name, u2.name as admin, rw.aid as uid, rw.uid as adminid, n.title, n.nid FROM {role_watchdog} rw LEFT JOIN {og_role_watchdog} orw ON (orw.hid = rw.hid) LEFT JOIN {node} n ON (orw.gid = n.nid) INNER JOIN {users} u ON (rw.aid = u.uid) INNER JOIN {users} u2 ON (rw.uid = u2.uid) ORDER BY rw.stamp DESC';

    $result = pager_query($grants_query, $items_per_page, 0, "SELECT COUNT(*) from {role_watchdog} rw", $account->uid, $account->uid);
  }
  $rows = array();
  $actions = array(t('removed from'), t('added to'), t('requested by'), t('approved for'));
  $view_profile = user_access('access user profiles');
  while ($row = db_fetch_object($result)) {
    $group_name = empty($row->title) ? '-' : l($row->title, 'node/' . $row->nid);
    $row_data = array(
      $view_profile ? l($row->admin, 'user/' . $row->adminid) : $row->admin,
      format_date($row->stamp),
      $group_name,
      $roles[$row->rid],
      $actions[$row->action],
      $view_profile ? l($row->name, 'user/' . $row->uid) : $row->name,
    );
    if ($node) {
      unset($row_data[2]);
    }
    $rows[] = $row_data;
  }


  if (sizeof($rows)) {
    $output .= theme('table', $header, $rows, array('style' => 'width: 99%;'));

    if ($pager = theme('pager', NULL, $items_per_page, 0)) {
      $output .= $pager;
    }
  }

  return $output ? $output : t('No role grants made.');
}

function _og_role_watchdog_history_rows($result, $roles, $actions) {
  $view_profile = user_access('access user profiles');
  while ($row = db_fetch_object($result)) {
    $group_name = empty($row->title) ? '-' : l($row->title, 'node/' . $row->nid);
    $row_data = array(
      format_date($row->stamp),
      $group_name,
      $roles[$row->rid],
      $actions[$row->action],
      $view_profile ? l($row->name, 'user/' . $row->uid) : $row->name,
    );
    if (isset($row->admin)) {
      array_unshift($row_data,  $view_profile ? l($row->admin, 'user/' . $row->adminid) : $row->admin);
    }
    $rows[] = $row_data;
  }
  return $rows;
}
