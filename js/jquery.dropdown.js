$(document).ready(function() {
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
      hiddenField.trigger('change');
    }
    else wrapper.find('ul > li[data-value="' + hiddenField.val() + '"]').addClass('selected');

    /* clone selected li element */
    wrapper.find('ul > li:first-child').before(wrapper.find('ul > li[data-value=' + hiddenField.val() + ']').clone(true));



  
    /* click event */
    wrapper.find('ul > li').click(function() {
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
    })
    
    
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