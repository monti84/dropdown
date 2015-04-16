$(document).ready(function() {
  $('.custom-dropdown').each(function() {
    var inputName = $(this).attr('name');
    
    /* convert select and option elements */
    wrapper = $('<div class="' + $(this).attr('class') + '">').insertBefore($(this));
    wrapper.html('<input type="hidden" name="' + inputName + '" value="' + $(this).val() + '"><div class="button"><div class="icon"></div></div><ul></ul>');
    $(this).children('option').each(function() {
      wrapper.children('ul').append('<li class="' + $(this).attr('value') + '" data-value="' + $(this).attr('value') + '">' + $(this).text() + '</li>');
      $(this).remove();
    });
    
    $(this).remove();    
    
    if ($(this).hasClass('disabled')) return false;

    /* link hidden field and li element */
    var hiddenField =  wrapper.find('input[type="hidden"]');
    if (!hiddenField.val()) {
      wrapper.children('ul > li:first-child').addClass('selected');
      hiddenField.val(wrapper.children('ul > li.selected').attr('data-value'));      
      hiddenField.trigger('change');
    }
    else wrapper.find('ul > li[data-value="' + hiddenField.val() + '"]').addClass('selected');

    /* clone selected li element */
    wrapper.find('ul > li:first-child').before(wrapper.find('ul > li[data-value=' + hiddenField.val() + ']').clone(true));



  
    wrapper.find('ul > li').on({

      click: function() {
        var container = $(this).parents('.custom-dropdown');
        if (container.hasClass('opened')) {
          if (!$(this).is('li') || $(this).index() == 0) { container.toggleClass('opened'); return false; }
          $(this).siblings().first().remove();
          $(this).parents('ul').prepend($(this).clone(true));
          
          container.children('input[type="hidden"]').val($(this).attr('data-value'));
          container.children('input[type="hidden"]').trigger('change');
          
          container.toggleClass('opened');
        }
        
        else if ($(this).is(':first-child') || $(this).hasClass('button')) {
          $('.custom-dropdown').removeClass('opened'); /* close other opened dropdowns */
          container.toggleClass('opened');
        }
        return false;
      },
      
      mouseover: function() {
        if ($(this).index() > 0) {
          console.log('HOVER');
          $(this).addClass('hover');
          $(this).siblings().removeClass('hover');
        }
      },
      
      mouseleave: function() {
        $(this).siblings().addBack().removeClass('hover');
      }
    });
    
    /* hover for keyboard event */
    wrapper.find('ul > li:not(:first-child)').on('mouseover', function () {
    });

    wrapper.find('ul > li:not(:first-child)').on('mouseleave', function () {
      $(this).siblings().removeClass('hover');
    });
    
    /* keyboard event */
    $(document).keydown(function(e) {
      if ($('.custom-dropdown.opened').length > 1) { 
        // something wrong, no more than one dropdown should 
        // have to open, close all and pass thru the keypress
        $('.custom-dropdown.opened').removeClass('opened');
        return true;
      }

      else if ($('.custom-dropdown.opened').length < 1) return true; // no opened dropdown, nothing to do here
      
      else {
        var container = $('.custom-dropdown.opened');
        var childElements = container.find('ul > li');
        var currentIDX = container.find('ul > li.hover').index();
        var viewportHeight = parseInt($('.custom-dropdown.opened').children('ul').css('max-height'));
        var elementHeight = $('.custom-dropdown.opened').find('ul > li:nth-child(2)').height();
        var elementPerView = parseInt(viewportHeight / elementHeight) - 1;
        var elementCount = $('.custom-dropdown.opened').find('ul > li').length - 1;
        var hiddenElements = parseInt(container.find('ul > li.hidden').length);
        var firstVisibleElement = $('.custom-dropdown.opened').find('ul > li.hidden').last().index() + 2;
        var lastVisibleElement = firstVisibleElement + elementPerView - 1;
//        console.log('First: ' + firstVisibleElement + ', Last: ' + lastVisibleElement);
                
        
        if (e.keyCode == 38)  { // up
          if (currentIDX == 1) return true;
          else if (currentIDX == -1) {
            container.find('ul > li:nth-child(2)').addClass('hover');
            currentIDX = 1;
          }
          
          else {
            childElements.removeClass('hover');
            currentIDX = currentIDX - 1;
            container.find('ul > li').eq(currentIDX).addClass('hover');
          }

/*
          if (currentIDX - hiddenElements > elementPerView) {
            if (hiddenElements > 0) $('.custom-dropdown.opened').find('ul > li.hidden').last().next('li').addClass('hidden');
            else $('.custom-dropdown.opened').find('ul > li:nth-child(2)').addClass('hidden');
          }
*/
          return false;
        }
        
        
        else if (e.keyCode == 40)  { // down
          if (container.find('ul > li.hover').length < 1) {
            container.find('ul > li:nth-child(2)').addClass('hover');
          }
          else {
            var currentIDX = container.find('ul > li.hover').index() + 2;
            container.find('ul > li.hover').removeClass('hover');
            container.find('ul > li:nth-child(' + currentIDX + ')').addClass('hover');
//            console.log(currentIDX + "-" + hiddenElements + ">" + elementPerView);

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
    
    
    wrapper.children('.button').click(function(e) { 
      wrapper.toggleClass('opened');
      return false;      
    });
  })
  
  /* debug */
  $(document).on('change', 'input', function () {
    console.log($(this).attr('name') + " = " + $(this).val());
  });
});

$(document).on('click', function() {
  $('.custom-dropdown').removeClass('opened');
});