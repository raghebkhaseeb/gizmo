<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @link       http://www.themepunch.com
 * @since      1.0.0
 *
 * @package    Revslider_Sharing_Addon
 * @subpackage Revslider_Sharing_Addon/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Revslider_Sharing_Addon
 * @subpackage Revslider_Sharing_Addon/admin
 * @author     ThemePunch <info@themepunch.com>
 */
class Revslider_Sharing_Addon_Admin {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $plugin_name       The name of this plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;

	}

	
	/**
	 * Register the JavaScript for the admin area.
	 *
	 * @version  1.1.1
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Revslider_Sharing_Addon_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Revslider_Sharing_Addon_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		if(isset($_GET["page"]) && $_GET["page"]=="revslider"){ 
		
			wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'assets/css/revslider-sharing-addon-admin.css', array(), $this->version, false );	
			wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'assets/js/revslider-sharing-addon-admin.js', array( 'jquery','revbuilder-admin' ), $this->version, false );		
			wp_localize_script( $this->plugin_name, 'revslider_sharing_addon', $this->get_var() );
		}
	}

	/**
	 * Returns the global JS variable
	 *
	 * @since    2.0.0
	 */
	public function get_var($var='',$slug='revslider-sharing-addon') {
		if($slug == 'revslider-sharing-addon'){
			return array(
				'ajax_url' => admin_url( 'admin-ajax.php' ),
				'enabled' => get_option('revslider_sharing_enabled'),
				'bricks' => array(
					'active'  =>  __('Active','revslider-sharing-addon'),
					'share_facebook' => __('Share on Facebook','revslider-sharing-addon'),
					'share_twitter' => __('Share on Twitter','revslider-sharing-addon'),
					'share_googleplus' => __('Share on GooglePlus','revslider-sharing-addon'),
					'share_linkedin' => __('Share on LinkedIn','revslider-sharing-addon'),
					'share_pinterest' => __('Share on Pinterest','revslider-sharing-addon'),
					'linkurl' => __('Link URL', 'revslider-sharing-addon'),	
					'text' => __('Text','revslider-sharing-addon'),
					'title' => __('Title','revslider-sharing-addon'),
					'summary' => __('Summary','revslider-sharing-addon'),
					'image' => __('Image','revslider-sharing-addon'),
					'description' => __('Description','revslider-sharing-addon'),
					'entertext' => __( 'Enter Text','revslider-sharing-addon'),
					'enterlink' => __( 'Enter Link','revslider-sharing-addon'),
					'entertitle' => __('Enter Title','revslider-sharing-addon'),
					'entersummary' => __('Enter Summary','revslider-sharing-addon'),
					'enterimage' => __('Enter Image','revslider-sharing-addon'),
					'enterdescription' => __('Enter Description','revslider-sharing-addon'),
					'meta' => __('Meta','revslider-sharing-addon')
				)
			);
		}
		else{
			return $var;
		}
	}

	
	/**
	 * Change Enable Status of this Add-On
	 *
	 * @since    1.0.0
	 */
	private function change_addon_status($enabled) {
		update_option( "revslider_sharing_enabled", $enabled );	
	}

	/**
	 * Perform Ajax Calls from the RevSlider Core
	 *
	 * @since    1.0.0
	 */
	public function do_ajax($return,$action) {
		switch ($action) {
			case 'wp_ajax_enable_revslider-sharing-addon':
				$this->change_addon_status( 1 );
				return  __('Sharing AddOn enabled', 'revslider-sharing-addon');
				break;
			
			case 'wp_ajax_disable_revslider-sharing-addon':
				$this->change_addon_status( 0 );
				return  __('Sharing AddOn disabled', 'revslider-sharing-addon');
				break;
			default:
				return $return;
				break;
		}
	}
	

	

	
}
