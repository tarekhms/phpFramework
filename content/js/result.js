function get_result(response, options)
{
	hide_loading(1);
	//alert(response);

	if(options[1] == "contact"){
		$(".validation").text("Done");
		$(".validation").css("visibility","visible");
	}
	
	
}

