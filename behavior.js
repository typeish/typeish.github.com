(function() {
  var CAN_FLIP, contact_el, flip_el, initPigeonFarm, wwu_button;
  if ($.browser.mozilla) {
    $('#projects td').css({
      opacity: 1
    });
  }
  CAN_FLIP = (typeof Modernizr !== "undefined" && Modernizr !== null ? Modernizr.csstransforms3d : void 0) && Modernizr.csstransitions;
  flip_el = $('#flip-container');
  wwu_button = $('#work-with-us');
  contact_el = $('#contact');
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
    return wwu_button.show();
  });
}).call(this);
