<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'wordpress');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', 'ieeeftw');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '2;:!z)9]%DGctN2?0+&28ch8>Y;x?Sm:km)1v^6NJ$;0^dh!acPZ`t793kuz>=A_');
define('SECURE_AUTH_KEY',  'iU>7sR#zv{)kY]1,qWr1rK3I4zM^_HC6dI)h=nki<(1|}xG1f@Yt|H}EfiaXRtgU');
define('LOGGED_IN_KEY',    ';QWmf7*@m.hdI`xq^QDKp|,]DsL+;c&/-9O3-axa~Mg|Wk:9uuEzj|M-+KE!2@M0');
define('NONCE_KEY',        ']}n1eem:pzK=?=3+obm!:IxgpZ_^s|KU-b,1ytGf|$`e84_#0Z%W1(d7bwPC$^|S');
define('AUTH_SALT',        'M~d.HV!l.p-XpdfRuP:!+XRSC-t8[!I67%bYA#^^R2u^9P,K3?X(4@FHg tcAB{m');
define('SECURE_AUTH_SALT', '%@z@B>4zzv@d1t`U~s!ne0E<^ee~|N/q+UI+Ts^7I1Tps=st|A//Qwl?<|a_a2|9');
define('LOGGED_IN_SALT',   'B*H_@Q0*6*{)+1|[#g*:Kp|!$Qoslhuh=-+c9W6<9zq350?uF+G#Se~2nPdwd9J.');
define('NONCE_SALT',       'a2K/SY:?vc[I%Vh]NL7<:t|!L8ZH8_x>|6u0hsWM=AR?-$de`n1`OYa]|f_+Oz}!');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

// Added by Jim Tang
define('FS_METHOD', 'direct');
/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
