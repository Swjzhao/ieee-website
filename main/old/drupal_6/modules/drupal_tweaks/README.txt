Drupal project page: http://drupal.org/project/drupal_tweaks
GitHub project page: https://github.com/kenorb/drupal_tweaks

DESCRIPTION

  This modules provides following functionality:

Quick common operation

  - Enabling and disabling modules through autocomplete suggestions
  - Quick search for the nodes, users, etc. to make some operations

Quick Drupal operation

  - clear the cache and rebuild permissions from one place or do them both at once

Development tweaks

  - show or log backtrace on Drupal errors

PHP Settings

  - Increasing PHP max_execution_time value
  - Increasing PHP memory_limit value
  If your maximum execution time or memory limit is too less, you can experience WSOD (White Screen of Death).
  Read more:
  http://drupal.org/node/207036 (Increase PHP memory limit)
  http://drupal.org/node/482956 (Silent WSODs (White Screen of Death) - fixing step by step)
  http://drupal.org/requirements

Database tweaks

This sub-module allow you to enable and change following settings in your database configuration on the fly:
  - SQL_BIG_SELECTS
  - MAX_JOIN_SIZE
  - MAX_ALLOWED_PACKET
  - WAIT_TIMEOUT
  and changing SQL_MODES

  Read more about those variables:
  http://dev.mysql.com/doc/refman/5.1/en/server-session-variables.html

  And SQL Modes:
  http://dev.mysql.com/doc/refman/5.1/en/server-sql-mode.html

  Note: It will not work on servers, where your account don't have proper privileges!
  You can also follow similar topics:
    #361967: Increase MAX_JOIN_SIZE and MAX_ALLOWED_PACKET settings in system.install

  You may also read about some database issues:
    http://drupal.org/node/259580 ("Warning: MySQL server has gone away" - Tune MySql to resolve this problem)
    http://www.palantir.net/blog/beware-mysql-51-my-son

  Tweaks for following modules:
    - Filter #362621: Display name of module providing a filter
    - Views - which view is provided by which module
    - Block - which block is provided by which module

Analysing your website and give usefull suggestions
  - automatically detect new changes in menu system
  - check for duplicates modules in your filesystem
  - check if your PHP memory should be increased
  - check if some modules should be updated (TODO)
  and many more

INSTALLATION

  1. Install and enable the module.
  2. Go to Settings Page (admin/drupal_tweaks)

REQUIREMENTS

  at least PHP5

TROUBLESHOOTING

  #529208: Do not allow empty value for memory #3

TODO List

  Easier way to find some nodes on Content list (Search engine and make list sortable?)
  Any many more which will be not implemented into core.
  If you have some ideas, I'm open for the new suggestions.

