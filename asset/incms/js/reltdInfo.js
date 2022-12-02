/**
 * 
 */
"use strict";
$(document).on("click","#indust-button",function(){
	//사이즈 조정은 마음대로
	var width  = 1400;	//가로
	var height = 1000;	//높이
	
	//cms 팝업창
	fn_cms_popup_centr("/system/code/indust/popup.do?codeId="+$(this).data("code-id")+"&codeName="+$(this).data("code-name"),"industPop",width,height,"no");
});

$(document).on("click","#regist-button",function(){
	var site_id = $(this).data("site_id");
	var lnkag_gbn_cd = $(this).data("lnkag_gbn_cd");
	var lnkag_gbn_sn = $(this).data("lnkag_gbn_sn");
	var lnkag_info_id = $(this).data("lnkag_info_id");
	var indust_cl_cd = $(this).data("indust_cl_cd");
	var cl_cd_name = $(this).data("cl_cd_name");
		
	if($("#"+indust_cl_cd).val() != ''){
		var param = bindIndust(site_id,lnkag_gbn_cd,lnkag_gbn_sn,lnkag_info_id,indust_cl_cd,cl_cd_name);
		console.log(param);
		Ajax.post("/system/reltd/ajax/insert-indust.do",saveIndustSuc,saveIndustFail,{data : JSON.stringify(param)});
	}
});
$(document).on("click",".indust-remove-button",function(){
	var param = bindIndust();
	param.lnkag_sn = $(this).data("seq");
	console.log(param);
	if(confirm("선택한 주요산언분류코드 데이터가 삭제됩니다. 계속 하시겠습니까?")){
		$(this).closest("span").remove();
		Ajax.post("/system/reltd/ajax/delete-indust.do",delSuc,delFail,{data : JSON.stringify(param)});
	}
});

$(document).on("click","#add-thema-button",function(){
	var site_id = $(this).data("site_id");
	var lnkag_gbn_cd = $(this).data("lnkag_gbn_cd");
	var lnkag_gbn_sn = $(this).data("lnkag_gbn_sn");
	var lnkag_info_id = $(this).data("lnkag_info_id");
	var wrd_name = $(this).data("wrd_name");

	if($("#"+wrd_name).val() != ''){
		var param = bindThema(site_id,lnkag_gbn_cd,lnkag_gbn_sn,lnkag_info_id,wrd_name,"M");
		console.log(param);
		Ajax.post("/system/reltd/ajax/insert-thema.do",saveThemaSuc,saveThemaFail,{data : JSON.stringify(param)});
	}
});


$(document).on("click","#add-keyword-button",function(){
	console.log("click");
	var site_id = $(this).data("site_id");
	var lnkag_gbn_cd = $(this).data("lnkag_gbn_cd");
	var lnkag_gbn_sn = $(this).data("lnkag_gbn_sn");
	var lnkag_info_id = $(this).data("lnkag_info_id");
	var wrd_name = $(this).data("wrd_name");

	if($("#"+wrd_name).val() != ''){
		var param = bindThema(site_id,lnkag_gbn_cd,lnkag_gbn_sn,lnkag_info_id,wrd_name,"K");
		console.log(param);
		Ajax.post("/system/reltd/ajax/insert-thema.do",saveKeywordSuc,saveKeywordFail,{data : JSON.stringify(param)});
	}
});

$(document).on("click",".thema-remove-button",function(){
	var param = bindIndust();
	param.lnkag_sn = $(this).data("seq");
	console.log(param);
	if(confirm("선택한 주제어 및 핵심어가 삭제됩니다. 계속 하시겠습니까?")){
		$(this).closest("span").remove();
		Ajax.post("/system/reltd/ajax/delete-thema.do",delSuc,delFail,{data : JSON.stringify(param)});
	}
});

$(document).on("click",".keyword-remove-button",function(){
	var param = bindIndust();
	param.lnkag_sn = $(this).data("seq");
	console.log(param);
	if(confirm("선택한 주제어 및 핵심어가 삭제됩니다. 계속 하시겠습니까?")){
		$(this).closest("span").remove();
		Ajax.post("/system/reltd/ajax/delete-thema.do",delSuc,delFail,{data : JSON.stringify(param)});
	}
});

var bindIndust = function(site_id,lnkag_gbn_cd,lnkag_gbn_sn,lnkag_info_id,indust_cl_cd,cl_cd_name){
	var obj = new Object();
	
	obj.site_id = $("#"+site_id).val();
	obj.lnkag_gbn_cd = $("#"+lnkag_gbn_cd).val();
	obj.lnkag_gbn_sn = $("#"+lnkag_gbn_sn).val();
	obj.lnkag_info_id = $("#"+lnkag_info_id).val();
	obj.indust_cl_cd = $("#"+indust_cl_cd).val();
	obj.cl_cd_name = $("#"+cl_cd_name).val();
	
	return obj;
}

var saveIndustSuc = function(data){
	if(data.result == "SUCCESS"){
		$("#indust_cl_cd").val("");
		$("#cl_cd_name").val("");
		$("#indust-area").append('<span>'+data.industList.cl_cd_name+'<button type="button" class="type indust-remove-button" data-seq="'+data.industList.lnkag_sn+'"><i class="fa fa-close"></i></button></span>');
	}
}

var saveIndustFail = function(xhr,status,error){
	alert("저장에 실패했습니다.");
	console.log(xhr+" : "+status+" : "+error);
}

var bindThema = function(site_id,lnkag_gbn_cd,lnkag_gbn_sn,lnkag_info_id,wrd_name,ctgry_gbn_cd){
	var obj = new Object();
	
	obj.site_id = $("#"+site_id).val();
	obj.lnkag_gbn_cd = $("#"+lnkag_gbn_cd).val();
	obj.lnkag_gbn_sn = $("#"+lnkag_gbn_sn).val();
	obj.lnkag_info_id = $("#"+lnkag_info_id).val();
	obj.wrd_name = $("#"+wrd_name).val();
	obj.ctgry_gbn_cd = ctgry_gbn_cd;
	
	return obj;
}

var saveThemaSuc = function(data){
	if(data.result == "SUCCESS"){
		$("#wrd_name").val("");
		$("#thema-area").append('<span>'+data.themaList.wrd_name+'<button type="button" class="type thema-remove-button" data-seq="'+data.themaList.lnkag_sn+'"><i class="fa fa-close"></i></button></span>');
	}
}

var saveThemaFail = function(xhr,status,error){
	alert("저장에 실패했습니다.");
	console.log(xhr+" : "+status+" : "+error);
}

var saveKeywordSuc = function(data){
	if(data.result == "SUCCESS"){
		$("#keyword_name").val("");
		$("#keyword-area").append('<span>'+data.themaList.wrd_name+'<button type="button" class="type keyword-remove-button" data-seq="'+data.themaList.lnkag_sn+'"><i class="fa fa-close"></i></button></span>');
	}
}

var saveKeywordFail = function(xhr,status,error){
	alert("저장에 실패했습니다.");
	console.log(xhr+" : "+status+" : "+error);
}
var delSuc = function(data){
	if(data.result == "SUCCESS"){
		alert(data.message);
	}
}

var delFail = function(xhr,status,error){
	alert("저장에 실패했습니다.");
	console.log(xhr+" : "+status+" : "+error);
}