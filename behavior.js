(function() {
  var CAN_FLIP, contact_el, flip_el, initPigeonFarm, preloadImages, project_detail_el, project_info, renderProject, wwu_button;
  project_info = {
    allforlocal: '<a href="http://www.allforlocal.com">AllForLocal</a> is a user-powered directory of local, independent businesses. Anyone can add businesses they know around them, and discover local companies around the corner that they may not know about.<br/><br/><a href="http://www.allforlocal.com">www.allforlocal.com</a> runs on an <a href="http://www.ubuntu.com">Ubuntu</a> <a href="http://www.linode.com/?r=5f045f057e3d1c0cc0d82ca1697690e03dc0dff9">Linode</a>, using <a href="http://www.pinaxproject.com">Pinax</a>, <a href="http://www.djangoproject.com">Django</a>, <a href="http://haystacksearch.org">Haystack</a>, and <a href="http://lucene.apache.org/solr/">Solr</a>.<br/><br/>Our role: concept; visual; code',
    sabeus: '<a href="http://www.sabe.us">Sabe.us</a> is a tool for analyzing reputation, using Twitter lists as social tags. Starting as a list counting tool, it is evolving into a way to put reputation into context, and see who knows whom how, by appropriating Twitter lists for meaning and weight.<br/><br/><a href="http://www.sabe.us">www.sabe.us</a> runs on <a href="http://appengine.google.com">Google AppEngine</a>, using <a href="http://bottle.paws.de">bottle</a>. The source is <a href="http://github.com/typeish/sabe_us">available on GitHub</a>.<br/><br/>Our role: concept; visual; code',
    themwh: '<a href="http://www.themwh.com">The MWh</a> is a rich-client web application that helps wholesale electricity consumers manage their costs without using an expensive outside consulting service. Users can visually track their budget, make informed decisions on purchasing contracts, and monitor their carbon footprint.<br /><br /><a href="http://www.themwh.com">www.themwh.com</a> uses <a href="http://www.djangoproject.com">Django</a> and <a href="http://jquery.com">jQuery</a>.<br/><br/>Our role: some visual; code',
    gatherers: '<a href="http://gatherersgranola.com">Gatherer&#8217;s Granola</a> is a gourmet granola brand based in Albany, New York. The site is purely static, yet supports showing nearby stores, and is responsive for use from desktop to mobile.<br/><br/><a href="http://gatherersgranola.com">gatherersgranola.com</a> runs on an <a href="http://www.ubuntu.com">Ubuntu</a> <a href="http://www.linode.com/?r=5f045f057e3d1c0cc0d82ca1697690e03dc0dff9">Linode</a>, and built using <a href="http://github.com/typeish/staples">Staples</a> and <a href="http://www.djangoproject.com">Django</a>.<br/><br/>Our role: concept; visual; code'
  };
  if ($.browser.mozilla) {
    $('#projects td').css({
      opacity: 1
    });
  }
  CAN_FLIP = (typeof Modernizr !== "undefined" && Modernizr !== null ? Modernizr.csstransforms3d : void 0) && Modernizr.csstransitions;
  flip_el = $('#flip-container');
  wwu_button = $('#work-with-us');
  contact_el = $('#contact');
  project_detail_el = $('#project-detail');
  renderProject = function(project_name) {
    return "<img class=\"logo\" src=\"/images/projects/" + project_name + "_active.png\">\n<img class=\"screenshot\" src=\"/images/projects/" + project_name + "_screen.png\">\n<p>" + project_info[project_name] + "</p>";
  };
  preloadImages = function() {
    return setTimeout(function() {
      var project_name, to_append, x;
      to_append = '';
      for (project_name in project_info) {
        x = project_info[project_name];
        to_append += "<img style=\"display: none;\" src=\"/images/projects/" + project_name + "_active.png\">\n<img style=\"display: none;\" src=\"/images/projects/" + project_name + "_screen.png\">";
      }
      return $('body').append(to_append);
    }, 1000);
  };
  initPigeonFarm = function() {
    var cancel_button;
    contact_el.empty();
    PigeonFarm({
      server: 'http://pigeonfarm.net',
      site: 'typeish.net',
      key: '0f2eb1ac-c719-4bee-92bd-85c784220256',
      container: '#contact',
      email_label: '',
      subject_label: ''
    });
    $('#pf-contact-subject').val('Message from typeish.net');
    $('#pf-contact-body').attr({
      placeholder: 'your message'
    });
    cancel_button = $('<button id="cancel-contact">cancel</button>');
    $('#contact').append(cancel_button);
    return cancel_button.click(function() {
      flip_el.removeClass('flip').removeClass('show');
      if (!CAN_FLIP) {
        contact_el.hide();
      }
      return initPigeonFarm();
    });
  };
  $(document).ready(function() {
    var project_info_container;
    if (CAN_FLIP) {
      wwu_button.click(function() {
        return flip_el.addClass('flip');
      });
    } else {
      wwu_button.click(function() {
        flip_el.addClass('show');
        return contact_el.show();
      });
      contact_el.hide();
    }
    initPigeonFarm();
    wwu_button.show();
    project_detail_el.find('button').click(function() {
      return project_detail_el.css({
        'z-index': '',
        'opacity': ''
      });
    });
    project_info_container = project_detail_el.find('div');
    $('#projects td').click(function() {
      var $this, project_name;
      $this = $(this);
      project_name = $this.attr('id');
      project_info_container.html(renderProject(project_name));
      return project_detail_el.css({
        'z-index': 3,
        'opacity': 1
      });
    });
    return preloadImages();
  });
}).call(this);
