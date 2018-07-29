var xmlHttp = false;
function ajax(options){
	xmlHttp=GetXmlHttpObject();
	if (xmlHttp==null){alert("Browser does not support HTTP Request");return;}
	
	Options = options;
	var url  = "process.php", parm = new FormData(), i = 0;
	for(a in options){parm.append("r"+i, escape(encodeURIComponent(options[a])));i++;}
	show_loading(options[0]);
		
	xmlHttp.onreadystatechange = stateChanged ;
	xmlHttp.open('POST', url, true);
	//xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlHttp.send(parm);
} 
function stateChanged(){
	if (xmlHttp.readyState==4 || xmlHttp.readyState=="complete"){get_result(xmlHttp.responseText, Options);} 
}
function GetXmlHttpObject(){
	var xmlHttp=null;
	try{xmlHttp=new XMLHttpRequest();}
	catch (e){
		 try{xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");}
		 catch (e){xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");}
	}
	return xmlHttp;
}
function show_loading(loading){document.getElementById('loading_'+loading).style.visibility = "visible";}
function hide_loading(loading){document.getElementById('loading_'+loading).style.visibility = "hidden";}
