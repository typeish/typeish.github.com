# Project info used in overlay.
project_info =
    allforlocal: '<a href="http://www.allforlocal.com">AllForLocal</a> is a user-powered directory of local, independent businesses. Anyone can add businesses they know around them, and discover local companies around the corner that they may not know about.<br/><br/><a href="http://www.allforlocal.com">www.allforlocal.com</a> runs on an <a href="http://www.ubuntu.com">Ubuntu</a> <a href="http://www.linode.com/?r=5f045f057e3d1c0cc0d82ca1697690e03dc0dff9">Linode</a>, using <a href="http://www.pinaxproject.com">Pinax</a>, <a href="http://www.djangoproject.com">Django</a>, <a href="http://haystacksearch.org">Haystack</a>, and <a href="http://lucene.apache.org/solr/">Solr</a>.<br/><br/>Our role: concept; visual; code'
    sabeus: '<a href="http://www.sabe.us">Sabe.us</a> is a tool for analyzing reputation, using Twitter lists as social tags. Starting as a list counting tool, it is evolving into a way to put reputation into context, and see who knows whom how, by appropriating Twitter lists for meaning and weight.<br/><br/><a href="http://www.sabe.us">www.sabe.us</a> runs on <a href="http://appengine.google.com">Google AppEngine</a>, using <a href="http://bottle.paws.de">bottle</a>. The source is <a href="http://github.com/typeish/sabe_us">available on GitHub</a>.<br/><br/>Our role: concept; visual; code'
    themwh: '<a href="http://www.themwh.com">The MWh</a> is a rich-client web application that helps wholesale electricity consumers manage their costs without using an expensive outside consulting service. Users can visually track their budget, make informed decisions on purchasing contracts, and monitor their carbon footprint.<br /><br /><a href="http://www.themwh.com">www.themwh.com</a> uses <a href="http://www.djangoproject.com">Django</a> and <a href="http://jquery.com">jQuery</a>.<br/><br/>Our role: some visual; code'
    gatherers: '<a href="http://gatherersgranola.com">Gatherer&#8217;s Granola</a> is a gourmet granola brand based in Albany, New York. The site is purely static, yet supports showing nearby stores, and is responsive for use from desktop to mobile.<br/><br/><a href="http://gatherersgranola.com">gatherersgranola.com</a> runs on an <a href="http://www.ubuntu.com">Ubuntu</a> <a href="http://www.linode.com/?r=5f045f057e3d1c0cc0d82ca1697690e03dc0dff9">Linode</a>, and built using <a href="http://github.com/typeish/staples">Staples</a> and <a href="http://www.djangoproject.com">Django</a>.<br/><br/>Our role: concept; visual; code'



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
project_detail_el   = $('#project-detail')



#
# Main functions
#

# Render the overlay using the specified project name.
renderProject = (project_name) ->
    """
        <img class="logo" src="/images/projects/#{ project_name }_active.png">
        <img class="screenshot" src="/images/projects/#{ project_name }_screen.png">
        <p>#{ project_info[project_name] }</p>
    """

# Loads the images as hidden elements to the body so they can be cached by the
# browser.
preloadImages = ->
    setTimeout ->
        to_append = ''
        for project_name, x of project_info
            to_append += """
            <img style="display: none;" src="/images/projects/#{ project_name }_active.png">
            <img style="display: none;" src="/images/projects/#{ project_name }_screen.png">
            """
        $('body').append(to_append)
    , 1000

# Initialize the Pigeon Farm contact form.
initPigeonFarm = ->
    contact_el.empty()

    # Init the Pigeon Farm contact form.
    # http://github.com/typeish/pigeonfarm
    PigeonFarm
        server          : 'http://pigeonfarm.net'
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



    #
    # Showcase behavior
    #

    # Enable the hide project details button.
    project_detail_el.find('button').click ->
        project_detail_el.css
            'z-index': ''
            'opacity': ''

    # Bind project detail loading to the project index tds.
    project_info_container = project_detail_el.find('div')
    $('#projects td').click ->
        $this = $(this)
        project_name = $this.attr('name')
        project_info_container.html(renderProject(project_name))
        project_detail_el.css
            'z-index': 3
            'opacity': 1

    # Trigger image preloading when everything is done.
    preloadImages()
