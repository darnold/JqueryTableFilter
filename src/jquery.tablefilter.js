(function($) {

    $.fn.tablefilter = function( options ) {

	    var settings = $.extend({
		    filterControls : '#filter-controls button',
            elements     : 'tr',
            button      : null,
            complete     : null
        }, options);

        return this.each( function() {
	        var table = $(this);

	        // Get button data from filterControls
	        $( settings.filterControls ).click(function(event) {
		        var button = $(this);
		        var buttonData = $(button).data('filter');

				// don't proceed if already selected
		        if ( $(button).hasClass('active') ) {
		            return false;
		        }


		        // Remove all active classes from buttons
	            $(settings.filterControls).removeClass('active');

		        // Add active class
		        $(button).addClass('active');

		        // Just show all rows
		        if(buttonData === '*') {
			        $(table).find(settings.elements).fadeIn();
		        }

		        // Hide all rows
		        else {
			        $(table).find(settings.elements).hide();
		        }


		        // Go through all elements and filter
		        $(table).find(settings.elements)
				  .filter('[data-filter-type="'+ buttonData +'"]')
				  .fadeIn();

		        event.preventDefault();
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