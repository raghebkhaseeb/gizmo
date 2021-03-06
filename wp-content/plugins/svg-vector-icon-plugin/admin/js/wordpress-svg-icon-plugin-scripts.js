/*
	WP SVG ICON PLUGIN SCRIPTS
	Compiled by Evan Herman - www.Evan-Herman.com
*/
jQuery(document).ready( function() {

	// select default icon element wrapper on initial page load
	// iconWrapperClick( jQuery( this ) , localized_data.default_icon_element );

	var interval = null;
	var x = 0;
	function check_thick() {
		interval = setInterval(function() {
			if( jQuery( '#TB_ajaxContent' ).is( ':visible' ) ) {
				x = 0;
				if( jQuery( '.icon-wrapper' ).hasClass( 'selected-element-wrap' ) ) {
					return;
				}
				jQuery( '.custom-pack-tab' ).removeAttr( 'style' );
				// iconWrapperClick( jQuery( this ) , localized_data.default_icon_element );
				jQuery( '.element_selection_container' ).find( jQuery( '.icon-wrapper[alt="' + localized_data.default_icon_element + '"]' ) ).addClass( 'selected-element-wrap' );
			} else {
				x = 1;
			}
		}, 50);
	};
	// run our check thickbox function
	// on initial page load
	check_thick();

	// if a custom icon pack is not installed,
	// lets make sure that the custom tab remains hidden
	if ( ! localized_data.custom_pack_active ) {
		jQuery( '.custom-pack-tab' ).attr( 'style', 'display:none !important;' );
	}


	// when a user clicks on an icon,
	// load'er up to the preview box
	function buttonClick() {

		var glyphUnicode =  jQuery( 'input[type=text].glyph_unicode', this ).val();
		var iconClass = jQuery( this ).find( 'div' ).attr( 'class' ).replace( 'fs1' , '' );
		var selectedIconWrapper = jQuery( '.selected-element-wrap' ).attr( 'alt' );

		jQuery('.glyph').removeClass('selected');

		jQuery(this).addClass('selected');

		jQuery('.copy_paste_input').text('[wp-svg-icons icon="'+iconClass.trim()+'" wrap="'+selectedIconWrapper+'"]');
		jQuery('input[type=text].expansion_glyph_unicode').css('background-color','#eee');
		jQuery('input[type=text].glyph_unicode').css('background-color','#eee');
		jQuery('input[type=text].glyph_unicode', this).css('background-color','#FF8000', 'font-color', '#000');
		jQuery('.wp-svg-icon-preview').html('<span class="wp-svg-iconset1-preview iconClass" data-icon="'+glyphUnicode+'" style="display:none;"></div>');
		jQuery( '.wp-svg-iconset1-preview' ).fadeIn( 'fast' );

		// Fade in the insert icon button
		if( jQuery( '#TB_ajaxContent' ).is( ':visible' ) ) {
			jQuery( '.insert-wp-svg-icon' ).fadeIn();
			jQuery('#TB_ajaxContent').animate({ scrollTop: 0 }, 'slow'); // scroll thickbox back up
		} else {
			jQuery('html, body').animate({ scrollTop: 0 }, 'slow'); // scroll html body
		}

	};

	function iconWrapperClick( button, element ) {

		if ( jQuery( '.custom-pack-tab' ).hasClass( 'nav-tab-active' ) ) {
			var active_tab = 'custom';
		} else {
			var active_tab = 'default';
		}

		var iconClass = jQuery( '.wp-svg-iconset1-all-glyphs' ).find( '.glyph-demo.selected' ).find( 'div' ).attr( 'class' );
		// if the icon class is undefined, we're probably on the custom pack tab
		if( iconClass === undefined ) {
			// reset up the variable
			var iconClass = jQuery( '.custom-pack-container-ajax' ).find( '.glyph.selected' ).find( 'span:first-child' ).attr( 'class' );
		}

		if ( ! button.hasClass( 'glyph' ) ) {

			jQuery( '.icon-wrapper' ).removeClass( 'selected-element-wrap' );

			jQuery( button ).addClass( 'selected-element-wrap' );

		}

		var selectedIconWrapper = ( element === undefined ) ? 'undefined-here' : element;

		if( iconClass ) {
			iconClass = iconClass.replace( 'fs1' , '' );
			if( active_tab === 'custom' ) {
				var newIconClass = iconClass.replace( 'wp-svg-custom-' , '' );
				jQuery( '.copy_paste_input' ).text('[wp-svg-icons custom_icon="'+newIconClass.trim()+'" wrap="'+selectedIconWrapper+'"]');
			} else {
				jQuery( '.copy_paste_input' ).text('[wp-svg-icons icon="'+iconClass.trim()+'" wrap="'+selectedIconWrapper+'"]');
			}
		} else {
			// no icon was selected yet...but we can still add our wrap
			// swap out the example container for the new element
			jQuery( '.copy_paste_input' ).text('[wp-svg-icons icon="" wrap=""]');
		}
	};


	/* Change selected icon wrapper */
	jQuery( 'body' ).on( 'click' , '.icon-wrapper ' , function() {
		iconWrapperClick( jQuery( this ) , jQuery( this ).attr( 'alt' ) );
	});

	/* Change the icon */
	jQuery( 'body' ).on( 'click' , '.glyph-demo' , buttonClick );
	jQuery( 'body' ).on( 'click' , '.glyph', function() {
		if ( jQuery( this ).hasClass( 'glyph-demo' ) ) {
			return;
		}
		iconWrapperClick( jQuery( this ), jQuery( '.selected-element-wrap' ).attr( 'alt' ) );
	} );

	// set up a timer...
	var delay = (function(){
	  var timer = 0;
	  return function(callback, ms){
		clearTimeout (timer);
		timer = setTimeout(callback, ms);
	  };
	})();

});

// insert our icon into the editor
function insert_wp_SVG_icon_to_editor() {
		var icon_code = jQuery( '.copy_paste_input' ).text();
		tb_remove();
		window.send_to_editor( icon_code );
		event.preventDefault();
	}

// click the tab nav, to toggle between default and custom pcaks on edit.php
function load_custom_pack( e ) {

		jQuery( '.nav-tab' ).removeClass( 'nav-tab-active' );
		jQuery( e ).addClass( 'nav-tab-active' );

			if( jQuery( '.custom-pack-container-ajax' ).is( ":empty" ) ) {

					jQuery( '.wp-svg-iconset1-all-glyphs' ).fadeOut( 'fast' , function() {
						jQuery(".custom-pack-container-ajax").load( localized_data.site_url + "/wp-content/uploads/wp-svg-icons/custom-pack/demo.html" );
						jQuery.get( localized_data.site_url + "/wp-content/uploads/wp-svg-icons/custom-pack/style.css", function( data ) {
							jQuery("head").append("<style>"+data+"</style>");
						});
					});

					jQuery('.custom-pack-container-ajax').on( 'click' , '.glyph' , function() {

							jQuery('.glyph').removeClass("selected");
							jQuery(this).addClass("selected");
							jQuery('html, body').animate({ scrollTop: 0 }, 'slow');

							var glyphCode = jQuery(this).find('.mls').text();
							var newGlyphCode = glyphCode.replace( 'wp-svg-' , '' );

							var glyphCode = jQuery.trim(glyphCode);
							glyphCode = glyphCode.replace( 'wp-svg-custom-' , '' );
							var selectedIconWrapper = jQuery( '.selected-element-wrap' ).attr( 'alt' );

							// Fade in the insert icon button
							if( jQuery( '#TB_ajaxContent' ).is( ':visible' ) ) {
								jQuery( '.insert-wp-svg-icon' ).fadeIn();
								jQuery('#TB_ajaxContent').animate({ scrollTop: 0 }, 'slow'); // scroll thickbox back up
							} else {
								jQuery('html, body').animate({ scrollTop: 0 }, 'slow'); // scroll html body
							}

							jQuery('.copy_paste_input').text('[wp-svg-icons custom_icon="'+glyphCode.trim()+'" wrap="'+selectedIconWrapper+'"]');
							jQuery('.wp-svg-icon-preview').remove();
							jQuery('.wp-svg-icon-preview-box > i').after("<b class='wp-svg-icon-preview'><span class='"+glyphCode+" previewIcon' style='display:none;'></span></b>");
							jQuery('.previewIcon').fadeIn();


						});


				} else {
					jQuery( '.wp-svg-iconset1-all-glyphs' ).fadeOut( 'fast' , function() {
						jQuery(".custom-pack-container-ajax").fadeIn();
					});
				}

	}

function show_defualt_pack( e ) {
		if( jQuery( '.default-icon-pack ' ).hasClass( 'nav-tab-active' ) ) {
			return false;
		} else {
			jQuery( '.nav-tab' ).removeClass( 'nav-tab-active' );
			jQuery( e ).addClass( 'nav-tab-active' );
			jQuery( '.custom-pack-container-ajax' ).fadeOut( 'fast' , function() {
				jQuery( '.wp-svg-iconset1-all-glyphs' ).fadeIn( 'fast' );
			});
		}
	}


function build_the_icon_shortcode( e ) {
	// store the element wrap variable
	var element_wrap = jQuery( '.element_selection_container' ).find( '.selected-element-wrap' ).attr( 'alt' );
	var icon_name = jQuery( '.glyph.selected' ).find( '.mls' ).text().replace( 'wp-svg-' , '' ).replace( 'custom-' , '' ).trim();

	if( jQuery( e ).hasClass( 'yes-adv-attr' ) ) {
		var selected_element = jQuery( '.glyph.selected' ).length;
		if( selected_element > 0 ) { // check if an icon was selected

			// check if were on a custom icon pack, or the default icon pack
			if ( jQuery( '.custom-pack-tab' ).hasClass( 'nav-tab-active' ) ) {
				var active_tab = 'custom';
			} else {
				var active_tab = 'default';
			}

			// create an array for our attributes
			var custom_shortcode_attr_array = [];

			var shortcode = jQuery( '.copy_paste_input' ).text();

			// icon name
			if( icon_name ) {
				if( active_tab == 'custom' ) {
					custom_shortcode_attr_array.push( 'custom_icon="'+icon_name+'"' );
				} else { // defualt icon
					custom_shortcode_attr_array.push( 'icon="'+icon_name+'"' );
				}
			}

			// element icon wrap
			if( element_wrap ) {
				custom_shortcode_attr_array.push( 'wrap="'+element_wrap+'"' );
			}

			jQuery( '.copy_paste_input' ).text( '[wp-svg-icons '+custom_shortcode_attr_array.join( ' ' )+']' );

		} else { // if not...just toggle the advanced attrs

		}
	} else {
		// store default
		jQuery( '.copy_paste_input' ).text( '[wp-svg-icons icon="'+icon_name+'" wrap="'+element_wrap+'"]' );
	}
}
