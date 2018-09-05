// Displays initial section
$( document ).ready(function() {
  $(".show").slideToggle(300);
  $(".show").parent().find('.fa-chevron-down').addClass('rotate');

});
// Toggle sections
$('.toggle').click(function(e) {
  	e.preventDefault();

    var $this = $(this);

    if ($this.next().hasClass('show')) {
        $this.next().removeClass('show');
        $this.next().slideUp(300);
        $this.next().parent().find('.fa-chevron-down').removeClass('rotate');
        $this.next().parent().find('.toggle').removeClass('active');
    } else {
        $this.parent().parent().find('li .inner').removeClass('show');
        $this.parent().parent().find('li .inner').slideUp(250);
        $this.parent().parent().find('li .inner').parent().find('.fa-chevron-down').removeClass('rotate');
        $this.parent().parent().find('li .inner').parent().find('.toggle').removeClass('active');
        $this.next().toggleClass('show');
        $this.next().slideToggle(300);
        $this.next().parent().find('.toggle').addClass('active');
        $this.next().parent().find('.fa-chevron-down').addClass('rotate');
    }
});
