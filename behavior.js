(function() {
  $(document).ready(function() {
    var contact, flip_el, wwu_button;
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
    return $('#pf-contact-subject').val('Message from typeish.net');
  });
}).call(this);
