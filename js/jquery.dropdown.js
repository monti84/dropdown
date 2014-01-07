$(document).ready(function() {
  /* dropdown */
  $('.custom-dropdown').each(function() {
    var inputName = $(this).attr('name');
    
    /* convert select and option elements */
    wrapper = $('<div class="' + $(this).attr('class') + '">').insertBefore($(this));
    wrapper.html('<input type="hidden" name="' + inputName + '" value="' + $(this).val() + '"><div class="button"><div class="icon"></div></div><ul></ul>');
    $(this).children('option').each(function() {
      wrapper.children('ul').append('<li data-value="' + $(this).attr('value') + '">' + $(this).text() + '</li>');
      $(this).remove();
    });
    
    $(this).remove();    
    
    if ($(this).hasClass('disabled')) return false;

    /* link hidden field and li element */
    var hiddenField =  wrapper.find('input[type="hidden"]');
    if (!hiddenField.val()) {
      wrapper.children('ul > li:first-child').addClass('selected');
      hiddenField.val(wrapper.children('ul > li.selected').attr('data-value'));      
    }
    else wrapper.find('ul > li[data-value="' + hiddenField.val() + '"]').addClass('selected');

    /* clone selected li element */
    wrapper.find('ul > li:first-child').before(wrapper.find('ul > li[data-value=' + hiddenField.val() + ']').clone(true));



  
    
    wrapper.find('ul > li, .button').click(function() {
      var container = $(this).parents('.custom-dropdown');
      if (container.hasClass('opened')) {
        if (!$(this).is('li')) { container.toggleClass('opened'); return false; }
        $(this).siblings().first().remove();
        $(this).parents('ul').prepend($(this).clone(true));
        if($(this).index() > 0) container.children('input[type="hidden"]').val($(this).attr('data-value'));
          container.toggleClass('opened');       
      }
      
      else if ($(this).is(':first-child') || $(this).hasClass('button')) {
        $('.custom-dropdown').removeClass('opened'); /* close other opened dropdowns */
        container.toggleClass('opened');
      }
      return false;
    })
    
    
/* keyboard     
    
    $(document).keydown(function(e) {
      if ($('.custom-dropdown.opened').length == 1) {
        var container = $('.custom-dropdown.opened');
        var currentIDX = container.find('ul > li.hover').index() + 2;
        var viewportHeight = parseInt($('.custom-dropdown.opened').children('ul').css('max-height'));
        var elementHeight = $('.custom-dropdown.opened').find('ul > li:nth-child(2)').height();
        var elementPerView = parseInt(viewportHeight / elementHeight) - 1;
        var elementCount = $('.custom-dropdown.opened').find('ul > li').length - 1;
        var hiddenElements = parseInt(container.find('ul > li.hidden').length);
        var firstVisibleElement = $('.custom-dropdown.opened').find('ul > li.hidden').last().index() + 2;
        var lastVisibleElement = firstVisibleElement + elementPerView - 1;
        console.log('First: ' + firstVisibleElement + ', Last: ' + lastVisibleElement);
                
        
        if (e.keyCode == 38)  {
          if (container.find('ul > li.hover').index() == 1) return true;
          if (container.find('ul > li.hover').length < 1) {
            container.find('ul > li:nth-child(2)').addClass('hover');
            currentIDX = 2;
          }
          else {
            var currentIDX = container.find('ul > li.hover').index();
            container.find('ul > li.hover').removeClass('hover');
            container.find('ul > li:nth-child(' + currentIDX + ')').addClass('hover');
            container.find('ul > li:nth-child(' + (currentIDX - 1) + ')').removeClass('hidden');
          }

          if (currentIDX - hiddenElements > elementPerView) {
            if (hiddenElements > 0) $('.custom-dropdown.opened').find('ul > li.hidden').last().next('li').addClass('hidden');
            else $('.custom-dropdown.opened').find('ul > li:nth-child(2)').addClass('hidden');
          }
          return false;
        }
        
        
        else if (e.keyCode == 40)  {
          if (container.find('ul > li.hover').length < 1) {
            container.find('ul > li:nth-child(2)').addClass('hover');
          }
          else {
            var currentIDX = container.find('ul > li.hover').index() + 2;
            container.find('ul > li.hover').removeClass('hover');
            container.find('ul > li:nth-child(' + currentIDX + ')').addClass('hover');
            console.log(currentIDX + "-" + hiddenElements + ">" + elementPerView);

            if (currentIDX - hiddenElements > elementPerView && currentIDX) {
              if (hiddenElements > 0) $('.custom-dropdown.opened').find('ul > li.hidden').last().next('li').addClass('hidden');
              else $('.custom-dropdown.opened').find('ul > li:nth-child(2)').addClass('hidden');
            }
          }
          return false;
        }
        
        else if (e.keyCode == 13) {
          container.find('ul > li.hover').removeClass('hover').trigger('click');
          return false;
        }
        else return true;
      }
    });
    */
    
    $(this).find('.button').click(function() { $(this).parent().find('ul > li:first-child').trigger('click') } );
  })
});

$(document).on('click', function() {
  $('.custom-dropdown').removeClass('opened');
});