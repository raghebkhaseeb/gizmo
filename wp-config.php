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

define('WP_HOME','http://gizmoprosusa.com');
define('WP_SITEURL','http://gizmoprosusa.com');


// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'gizmo' );

/** MySQL database username */
define( 'DB_USER', 'gizmo' );

/** MySQL database password */
define( 'DB_PASSWORD', 'gizmo' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         ',uC7L=NKNyBwQo?JBP0K@f0NYf[yGCD8VBE7DDzdK!{%dsVb2f5#OK0p>_jhtH!w' );
define( 'SECURE_AUTH_KEY',  '=X0{>{7>vEM6k4sm6%]5MDyWQ0oi/Z$/pK+-i?8I <n5zMo%Qvzj>W!*^TntcJHf' );
define( 'LOGGED_IN_KEY',    'S)?8]NMBm_#k*1$?UQLb5~DMkL6R{!2nz)|e(Dh(`Ty%z#Dq=ttz}ze(yd~Kq?@4' );
define( 'NONCE_KEY',        'rj)HSt2FLNHa%M2ty8PZC1>8OZUvp:LvN`=b5]_UeFX%c$P5W0nRZhRKW~ aRO*p' );
define( 'AUTH_SALT',        'n9jvpMP9Jd0 Yd3G|M:8OO-]/HEQ(/B:*sRuqU:p;%-?yz9HU<f[nDMYd*?0Td*c' );
define( 'SECURE_AUTH_SALT', ' ?`GXPW|/y/Gt0KiduU[}@5yUS0e_r% t._%s@T=NF0W|(_}U`3,8js_n.waA<!d' );
define( 'LOGGED_IN_SALT',   'o~CLa>R2?FGWv&{g&vHE<9U4nJgIgh,%R?AxLN.#]&4|@OgM</Yy@rei2$A*cm?<' );
define( 'NONCE_SALT',       'wS7??2>1Evo@yI6-Dvz O41%oo,M} B1GhcR2*Su{]aBWbR7dR~% [{XVN;D*h9Z' );

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'gp_';

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
define( 'WP_DEBUG', false );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', dirname( __FILE__ ) . '/' );
}

/** Sets up WordPress vars and included files. */
require_once( ABSPATH . 'wp-settings.php' );
