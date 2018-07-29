$(document).ready(function(){
	$('.filterBox').find("div div").not( "[class='filterTitle']" ).toggle();
	$('.filterTitle').click(function(){
		$(this).toggleClass("open");
		$(this).parent().find("div").not( "[class='filterTitle open'], [class='filterTitle']" ).toggle();
	})
});
window.onerror = function(msg, url, linenumber) {
    alert('Error message: '+msg+'\nURL: '+url+'\nLine Number: '+linenumber);
    return true;
}
