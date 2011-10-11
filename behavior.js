(function() {
  var project_info, renderProject;
  project_info = {
    allforlocal: '<a href="http://www.allforlocal.com">AllForLocal</a> is a user-powered directory of local, independent businesses. Anyone can add businesses they know around them, and discover local companies around the corner that they may not know about.<br/><br/><a href="http://www.allforlocal.com">www.allforlocal.com</a> runs on an <a href="http://www.ubuntu.com">Ubuntu</a> <a href="http://www.linode.com/?r=5f045f057e3d1c0cc0d82ca1697690e03dc0dff9">Linode</a>, using <a href="http://www.pinaxproject.com">Pinax</a>, <a href="http://www.djangoproject.com">Django</a>, <a href="http://haystacksearch.org">Haystack</a>, and <a href="http://lucene.apache.org/solr/">Solr</a>.<br/><br/>We are doing: concept; visual; code',
    sabeus: '<a href="http://www.sabe.us">Sabe.us</a> is a tool for analyzing reputation, using Twitter lists as social tags. Starting as a list counting tool, it is evolving into a way to put reputation into context, and see who knows whom how, by appropriating Twitter lists for meaning and weight.<br/><br/><a href="http://www.sabe.us">www.sabe.us</a> runs on <a href="http://appengine.google.com">Google AppEngine</a>, using <a href="http://bottle.paws.de">bottle</a>. The source is <a href="http://github.com/typeish/sabe_us">available on GitHub</a>.<br/><br/>We are doing: concept; visual; code',
    themwh: '<a href="http://www.themwh.com">The MWh</a> is a rich-client web application that helps wholesale electricity consumers manage their costs without using an expensive outside consulting service. Users can visually track their budget, make informed decisions on purchasing contracts, and monitor their carbon footprint.<br /><br /><a href="http://www.themwh.com">www.themwh.com</a> uses <a href="http://www.djangoproject.com">Django</a> and <a href="http://jquery.com">jQuery</a>.<br/><br/>We are doing: some visual; code',
    gatherers: '<a href="http://gatherersgranola.com">Gatherer&#8217;s Granola</a> is a gourmet granola brand based in Albany, New York. The site is purely static, yet supports showing nearby stores, and is responsive for use from desktop to mobile.<br/><br/><a href="http://gatherersgranola.com">gatherersgranola.com</a> runs on an <a href="http://www.ubuntu.com">Ubuntu</a> <a href="http://www.linode.com/?r=5f045f057e3d1c0cc0d82ca1697690e03dc0dff9">Linode</a>, and built using <a href="http://github.com/typeish/staples">Staples</a> and <a href="http://www.djangoproject.com">Django</a>.<br/><br/>We are doing: concept; visual; code'
  };
  renderProject = function(project_name) {
    return "<img class=\"logo\" src=\"/images/projects/" + project_name + "_active.png\">\n<img class=\"screenshot\" src=\"/images/projects/" + project_name + "_screen.png\">\n<p>" + project_info[project_name] + "</p>";
  };
  $(document).ready(function() {
    var contact, flip_el, project_detail_el, project_info_container, wwu_button;
    flip_el = $('#flip-container');
    wwu_button = $('#work-with-us');
    if ((typeof Modernizr !== "undefined" && Modernizr !== null ? Modernizr.csstransforms3d : void 0) && Modernizr.csstransitions) {
      wwu_button.click(function() {
        return flip_el.addClass('flip');
      });
    } else {
      contact = $('#contact');
      wwu_button.click(function() {
        flip_el.addClass('show');
        return contact.show();
      });
      contact.hide();
    }
    PigeonFarm({
      server: 'http://pigeonfarm.net',
      site: 'typeish.net',
      key: '0f2eb1ac-c719-4bee-92bd-85c784220256',
      container: '#contact',
      email_label: '',
      subject_label: ''
    });
    wwu_button.show();
    $('#pf-contact-subject').val('Message from typeish.net');
    $('#pf-contact-body').attr({
      placeholder: 'your message'
    });
    project_detail_el = $('#project-detail');
    project_detail_el.find('button').click(function() {
      return project_detail_el.css({
        'z-index': '',
        'opacity': ''
      });
    });
    project_info_container = project_detail_el.find('div');
    return $('#projects td').click(function() {
      var $this, project_name;
      $this = $(this);
      project_name = $this.attr('name');
      console.log(project_name);
      project_info_container.html(renderProject(project_name));
      return project_detail_el.css({
        'z-index': 3,
        'opacity': 1
      });
    });
  });
}).call(this);
