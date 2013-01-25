
#
# Detect browser capabilities
#

# Firefox has a weird flicker effect on the opacity fading, so disabled it.
# TODO: Do the fade effect in a different way. JS-based?
if $.browser.mozilla
    $('#projects td').css
        opacity: 1

# Check for css transform and transition capability.
CAN_FLIP = (Modernizr?.csstransforms3d and Modernizr.csstransitions)



# Elements from the page
flip_el             = $('#flip-container')
wwu_button          = $('#work-with-us')
contact_el          = $('#contact')



#
# Main functions
#

# Initialize the Pigeon Farm contact form.
initPigeonFarm = ->
    contact_el.empty()

    # Init the Pigeon Farm contact form.
    # http://github.com/typeish/pigeonfarm
    PigeonFarm
        server          : 'http://pigeon-farm.appspot.com'
        site            : 'typeish.net'
        key             : '0f2eb1ac-c719-4bee-92bd-85c784220256'
        container       : '#contact'
        email_label     : ''
        subject_label   : ''

    # Load the Pigeon Farm subject field with a value so it succeeds (hidden
    # by CSS).
    $('#pf-contact-subject').val('Message from typeish.net')

    # Customize the message placeholder.
    $('#pf-contact-body').attr
        placeholder: 'your message'

    # Add a cancel button to the contact form that flips the form back and
    # resets it.
    cancel_button = $('<button id="cancel-contact">cancel</button>')
    $('#contact').append(cancel_button)
    cancel_button.click ->
        flip_el.removeClass('flip').removeClass('show')
        if not CAN_FLIP
            contact_el.hide()
        initPigeonFarm()



$(document).ready ->

    # Set up flip effect for contact form.
    if CAN_FLIP
        # Use the flip effect to show the contact form.
        wwu_button.click ->
            flip_el.addClass('flip')
    else
        # Don't use the transitions if not supported, just show the form.
        wwu_button.click ->
            flip_el.addClass('show')
            contact_el.show()
        contact_el.hide()

    initPigeonFarm()

    # Show the "Work with us" button (hidden by CSS in case JS fails to load).
    wwu_button.show()

    window['scrollTo'](0, 1)
