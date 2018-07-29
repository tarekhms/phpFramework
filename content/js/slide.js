counter = 1;
function slideit(){
	
	$("#slider h2").css("top","35%");	
	$("#slider h2").css("opacity","0");		
	$("#slider h3").css("top","45%");	
	$("#slider h3").css("opacity","0");	
	
	$("#slider .level1 img").css("opacity","0");
	$("#slider .level1 img").css("transform","translate3d(0,0,0) scale3d(0,0,0)");

	$("#slider .level2 img").css("opacity","0");
	$("#slider .level2 .middle").css("top","25%");
	$("#slider .level2 .right").css("right","0");
	$("#slider .level2 .left").css("right","37%");

	$("#slider .level3 img").css("opacity","0");
	$("#slider .level3 .right").css("top","30%");
	$("#slider .level3 .left").css("top","0");

	$("#slider .level4 img").css("opacity","1");
	$("#slider .level4 .right").css("transform","translate3d(0,0,0) scale3d(0,0,0)");
	$("#slider .level4 .left").css("transform","translate3d(0,0,0) scale3d(0,0,0)");
						
	if(counter==1){setTimeout("slide_level1()",500);}
	if(counter==2){setTimeout("slide_level2()",500);}
	if(counter==3){setTimeout("slide_level3()",500);}
	if(counter==4){setTimeout("slide_level4()",500);}

	lvl = counter;
	setTimeout("slide_caption(lvl,2)",800);
	setTimeout("slide_caption(lvl,3)",1100);
	
	counter += 1;
	counter = (counter==5?1:counter);
	
	setTimeout("slideit()",6000);
}

function slide_caption(level,h){
	var top = (h==2?"20%":"35%");
	$("#slider .level"+level+" h"+h).css("top",top);
	$("#slider .level"+level+" h"+h).css("opacity","1");	
}
function slide_level1(){
		var iwidth = $("#slider .level1 img").width();
		var xwidth = $(".body").width() - iwidth - 20;
		$("#slider .level1 img").css("opacity","1");
		$("#slider .level1 img").css("transform","translate3d("+xwidth+"px,0,0) scale3d(1,1,1)");	
}
function slide_level2(){
		
		$("#slider .level2 img").css("opacity","1");
		$("#slider .level2 .middle").css("top","20px");
		$("#slider .level2 .right").css("right","5%");
		$("#slider .level2 .left").css("right","30%");
}
function slide_level3(){
		
		$("#slider .level3 img").css("opacity","1");
		$("#slider .level3 .right").css("top","20px");
		$("#slider .level3 .left").css("top","53%");
}
function slide_level4(){
		
		$("#slider .level4 img").css("opacity","1");
		$("#slider .level4 .right").css("transform","translate3d(0,0,0) scale3d(1,1,1)");
		$("#slider .level4 .left").css("transform","translate3d(0,0,0) scale3d(1,1,1)");
}