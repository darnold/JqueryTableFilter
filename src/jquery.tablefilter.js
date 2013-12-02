/*!
 * jQuery Table Filter Plugin
 * Examples and documentation at:
 * Copyright (c) 2013-2013 Davy Arnold
 * Version: 1.0 (DEC-2013)
 * Licensed under the MIT license.
 * Requires: jQuery v1.7.1 or later
 */

(function($) {

	/* Global console */
	function log() {
        if (window.console && console.log) {
	        console.log('[TableFilter] ' + Array.prototype.join.call(arguments,' '));
        }
	}

    $.fn.tablefilter = function( options ) {

	    var settings = $.extend({
		    filterControls  : '#filter-controls button',
            rows            : 'tr',
            rowFilter       : 'class',
            complete        : null
        }, options);



        return this.each( function() {
	        event.preventDefault();

	        var table = $(this);
	        var buttons = $(settings.filterControls);

	        $(buttons).first().addClass('active');

	        // Get button data from filterControls
	        $(buttons).click(function(event) {
		        var button = $(this);
		        var buttonData = $(button).data('filter');

				// don't proceed if already selected
		        if ( $(button).hasClass('active') ) {
		            return false;
		        }


		        // Remove all active classes from buttons
	            $(buttons).removeClass('active');

		        // Add active class
		        $(button).addClass('active');

		        // Just show all rows
		        if(buttonData === '*') {
			        $(table).find(settings.rows).fadeIn();
		        }

		        // Hide all rows
		        else {
			        $(table).find(settings.rows).hide();
		        }


		        // Class
		        if(settings.rowFilter === 'class' && buttonData !== '*') {
			        buttonData = '.'+buttonData;
		        }

		        // Data
		        else{
			        buttonData = '['+ settings.rowFilter +'="'+ buttonData +'"]';
		        }

		        log(buttonData);

		        // Go through all elements and filter
		        $(table).find(settings.rows)
				  .filter(buttonData)
				  .fadeIn();

			});



	        /*
	        if ( settings.color ) {
		        $(this).css( 'color', settings.color );
		    }

		    if ( settings.fontStyle ) {
		        $(this).css( 'font-style', settings.fontStyle );
		    }
		    */

	        if ( $.isFunction( settings.complete ) ) {
		        settings.complete.call( this );
		    }
        });

    }

}(jQuery));