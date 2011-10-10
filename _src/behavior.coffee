$(document).ready ->
    flip_el = $('#flip-container')
    wwu_button = $('#work-with-us')

    if Modernizr?.csstransforms3d and Modernizr.csstransitions
        # Use the flip effect to show the contact form.
        wwu_button.click ->
            flip_el.addClass('flip')
    else
        # Don't use the transitions if not supported, just show the form.
        contact = $('#contact')
        wwu_button.click ->
            flip_el.addClass('show')
            contact.show()
        contact.hide()

    # Init the Pigeon Farm contact form.
    # http://github.com/typeish/pigeonfarm
    PigeonFarm
        server          : 'http://pigeonfarm.net'
        site            : 'typeish.net'
        key             : '0f2eb1ac-c719-4bee-92bd-85c784220256'
        container       : '#contact'
        email_label     : ''
        subject_label   : ''

    # Show the "Work with us" button (hidden by CSS in case JS fails to load).
    wwu_button.show()

    # Load the Pigeon Farm subject field with a value so it succeeds (hidden by CSS).
    $('#pf-contact-subject').val('Message from typeish.net')
