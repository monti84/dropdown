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
    }
    else wrapper.find('ul > li[data-value="' + hiddenField.val() + '"]').addClass('selected');

    /* clone selected li element */
    wrapper.find('ul > li:first-child').before(wrapper.find('ul > li[data-value=' + hiddenField.val() + ']').clone(true));
    
    $(this).find('.button').click(function() { $(this).parent().find('ul > li:first-child').trigger('click') } );
  })
});

$(document).on('click', function() {
  $('.custom-dropdown').removeClass('opened');
});