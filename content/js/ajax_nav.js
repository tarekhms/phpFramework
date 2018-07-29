"use strict";

const ajaxRequest = new (function () {

	function filterURL(sURL, sViewMode){return sURL.replace(rSearch, "") + ("?" + sURL.replace(rHost, "&").replace(rView, sViewMode ? "&" + sViewKey + "=" + sViewMode : "").slice(1)).replace(rEndQstMark, "");}
	function closeReq (){oLoadingBox.parentNode && document.getElementById(sTargetId).removeChild(oLoadingBox);bIsLoading = false;}
	function abortReq (){if(!bIsLoading){return;}oReq.abort();closeReq();}
	function ajaxError(){alert("Unknown error.");}
	function errGen(errMsg, errEle){
		var errBox = document.getElementById("errorMsg");
				errBox.textContent   = errMsg;
				errBox.style.opacity = '1';
		var MsRect = (document.getElementById("errorMsg").getBoundingClientRect().height+16)/2;
		var ErRect = document.getElementsByName(errEle)[0].getBoundingClientRect();
				errBox.style.top  = ErRect.top-MsRect+25+'px';
				errBox.style.left = ErRect.right+20+'px';
	}

	function ajaxLoad (){
		var vMsg, nStatus = this.status;
		closeReq();
		switch (nStatus){
			case 200:
				vMsg = JSON.parse(this.responseText);

				switch (sRequest){
					case "creatwindow":
						document.getElementById("mainContent").innerHTML = vMsg.content;
					break;
					case "login":
						if(vMsg.result=="wrongEmail"){
							var errMsg = "The email you’ve entered doesn't match any account.. Create a new account or check the spelling.";
							errGen(errMsg, "username");
						}
						else if(vMsg.result=="wrongPassword"){
							var errMsg = "Wrong password.. Please check the password you have entered and try again.";
							errGen(errMsg, "userpassword");
						}
						else{
							if(vMsg.redirect=="createwindow"){document.getElementById("mainContent").innerHTML = vMsg.content;}
							else{document.getElementById(sTargetId).innerHTML = vMsg.content;}
						}
					break;
					case "signup":
						if(vMsg.result=="existed"){
							var errMsg = "The email you’ve entered is already existed. Choose a different email or try to recover your account if you have already registered.";
							errGen(errMsg, "email");
						}
						else if(vMsg.result=="completed"){
							document.getElementById(sTargetId).innerHTML = vMsg.content;
						}
					break;
					default:
						document.getElementById(sTargetId).innerHTML = vMsg.content;
					break;
				}

				init(false);
				if(bUpdateURL){
					document.querySelector('meta[name="keywords"]').setAttribute('content', vMsg.keywords);
					document.querySelector('meta[name="description"]').setAttribute('content', vMsg.description);
					document.title = oPageInfo.title = vMsg.title;
					history.pushState(oPageInfo, oPageInfo.title, oPageInfo.url, oPageInfo.rel);
					bUpdateURL = false;
				}

			break;
		}
	}

	function getPage (sPage, rel, buu=true, data=null, target=null) {
		if (bIsLoading) { return; }
		oReq = new XMLHttpRequest();
		bIsLoading = buu;
		oReq.onload = ajaxLoad;
		oReq.onerror = ajaxError;
		if (sPage) { oPageInfo.url = filterURL(sPage, null); }
		if (rel) { oPageInfo.rel = rel; }
		oReq.open("post", filterURL(oPageInfo.url, oPageInfo.rel), true);
		oReq.send(data);
		oLoadingBox.parentNode || document.getElementById(sTargetId).appendChild(oLoadingBox);
	}

	function requestPage (sURL, rel, buu=true, data=null, target=null){
		if(history.pushState){bUpdateURL = buu;getPage(sURL, rel, buu, data, target);}
		else{location.assign(sURL);/* Ajax navigation is not supported */}
	}

	function processLink (){
		if (this.className === sAjaxClass){sRequest = this.getAttribute("name");requestPage(this.href, this.rel, true);return false;}
		if (this.className === eAjaxClass){sRequest = this.getAttribute("name");requestPage(this.href, this.rel, false);return false;}
		if (this.className === fAjaxClass){
			var form = document.forms.namedItem(this.getAttribute("name"));
			var data = new FormData(form);
			sRequest = this.getAttribute("name");
			requestPage(this.getAttribute("action"), this.getAttribute("rel"), false, data, this.getAttribute("aTarget"));
			return false;
		}
		return true;
	}

	function switchLog(event){
		$('#login span').removeClass("active");
		$(this).addClass("active");
		$(this).parent().next().find("div[ref!='"+$(this).attr("ref")+"']").hide();
		$(this).parent().next().find("div[ref='"+$(this).attr("ref")+"']").show();
	}

	function hideMsg(event){
		$('#errorMsg').css("opacity","0");
	}

	function init(buu=true){
		if(buu){
			oPageInfo.title = document.title;
			history.replaceState(oPageInfo, oPageInfo.title, oPageInfo.url, oPageInfo.rel);
		}
		let item = document.body.querySelectorAll("#login span");
		for (var oLink, nIdx = 0, nLen = document.links.length; nIdx < nLen; document.links[nIdx++].onclick = processLink);
		for (var oLink, nIdx = 0, nLen = document.forms.length; nIdx < nLen; document.forms[nIdx++].onsubmit = processLink);
		for (var oLink, nIdx = 0, nLen = item.length; nIdx < nLen; item[nIdx++].onclick = switchLog);
		document.onclick = hideMsg;
	}

	const

	/* customizable constants */
		sTargetId = "ajaxView", sViewKey = "view_as", sAjaxClass = "ajax-nav", fAjaxClass = "ajax-req", eAjaxClass = "ajax-exe",

	/* not customizable constants */
		rSearch = /\?.*$/, rHost = /^[^\?]*\?*&*/, rView = new RegExp("&" + sViewKey + "\\=[^&]*|&*$", "i"), rEndQstMark = /\?$/,
		oLoadingBox = document.createElement("div"), oCover = document.createElement("div"), oLoadingImg = new Image(),
		oPageInfo = {title: document.title,	url: location.href,	rel: "default"};

	var

	sRequest, oReq, bIsLoading = false, bUpdateURL = false;

	oLoadingBox.id = "ajax-loader";
	oCover.onclick = abortReq;
	oLoadingImg.src = "data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==";
	oCover.appendChild(oLoadingImg);
	oLoadingBox.appendChild(oCover);

	onpopstate = function (oEvent) {
		if(oEvent.state.rel=="default"){location.reload();}
		else{
			bUpdateURL = false;
			oPageInfo.title = oEvent.state.title;
			oPageInfo.url = oEvent.state.url;
			oPageInfo.rel = oEvent.state.rel;
			getPage();
		}
	};

	window.addEventListener ? addEventListener("load", init, false) : window.attachEvent ? attachEvent("onload", init) : (onload = init);

	// Public methods

	this.open = requestPage;
	this.stop = abortReq;
	this.rebuildLinks = init;

})();
