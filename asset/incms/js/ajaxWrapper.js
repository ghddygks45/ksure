var defaultGetOptions = {
		method: 'GET',
		contentType: 'text/plain; charset=UTF-8',
		dataType: 'json',
};
var defaultPostOptions = {
		method: 'POST',
		contentType: "application/json; charset=utf-8",
		dataType: 'json',
};
var defaultPutOptions = {
		method: 'PUT',
		contentType: "application/json; charset=utf-8",
		dataType: 'json',
};
var defaultDeleteOptions = {
		method: 'DELETE',
		contentType: "application/json; charset=utf-8",
		dataType: 'json',
};
var defaultUploadOptions = {
		method: 'POST',
		contentType: false,
		processData: false,
};
var $preparingFileModal = $("#cms-loding-modal");
var defaultDownloadOptions = {
		httpMethod: 'GET',
};

// if Http Status not 200
var commonErrorCallback = function (jqXHR, textStatus, errorThrown) {
	defaultFailCallback.call(jqXHR, textStatus,errorThrown);
	$('#cms-loding-modal').hide();
};
// if undefined failCallback
var defaultFailCallback = function (response,status,error) { window.alert(status); };

var baseAjax = function (url, options, successCallback, failCallback) {
	var callBack = function (data) {
		if (data != null) {
			successCallback.call(this, data,options);
		} else {
			failCallback === undefined
				? defaultFailCallback.call(data, this,null)
				: failCallback.call(data, this,null);
		}
		$('#cms-loding-modal').hide();
	};
	
	var requestUrl = url;
	$.ajax(requestUrl, options)
		.done(callBack).fail(failCallback === undefined ? commonErrorCallback : failCallback);
};

var downAjax = function (url, options, successCallback, failCallback) {
	var callBack = function (data) {
		if (data != null) {
			successCallback.call(this, data,options);
			//$preparingFileModal.dialog('close');
		} else {
			//$preparingFileModal.dialog('close');
			failCallback === undefined
				? defaultFailCallback.call(data, this,null)
				: failCallback.call(data, this,null);
		}
	};
	
	var requestUrl = url;
	console.log(options);
	$.fileDownload(requestUrl, options)
		.done(callBack).fail(failCallback === undefined ? commonErrorCallback : failCallback);
};

var getAjax = function (url, successCallback, failCallback, extendOptions, isLoadingBar) {
	if(isLoadingBar === undefined || isLoadingBar){
		$('#cms-loding-modal').show();
	}
	
	baseAjax(url, $.extend(defaultGetOptions, extendOptions), successCallback, failCallback);
};

var postAjax = function (url, successCallback, failCallback, extendOptions, isLoadingBar) {
	if(isLoadingBar === undefined || isLoadingBar){
		$('#cms-loding-modal').show();
	}
	baseAjax(url, $.extend(defaultPostOptions, extendOptions), successCallback, failCallback);
};

var putAjax = function (url, successCallback, failCallback, extendOptions, isLoadingBar) {
	if(isLoadingBar === undefined || isLoadingBar){
		$('#cms-loding-modal').show();
	}
	baseAjax(url, $.extend(defaultPutOptions, extendOptions), successCallback, failCallback);
};

var deleteAjax = function (url, successCallback, failCallback, extendOptions, isLoadingBar) {
	if(isLoadingBar === undefined || isLoadingBar){
		$('#cms-loding-modal').show();
	}
	baseAjax(url, $.extend(defaultDeleteOptions, extendOptions), successCallback, failCallback);
};

// add extendOptions data(formData Object)
var uploadAjax =  function (url, successCallback, failCallback, extendOptions, isLoadingBar) {
	if(isLoadingBar === undefined || isLoadingBar){
		$('#cms-loding-modal').show();
	}
	baseAjax(url, $.extend(defaultUploadOptions, extendOptions), successCallback, failCallback);
};

//add extendOptions data(formData Object)
var downloadAjax =  function (url, successCallback, failCallback, extendOptions, isLoadingBar) {
	
	if(isLoadingBar === undefined || isLoadingBar){
		//$preparingFileModal.dialog({ modal: true });
		//$("#progressbar").progressbar({value: false});
	}
	downAjax(url, $.extend(defaultDownloadOptions, extendOptions), successCallback, failCallback);
};

// args: url, successCallback, failCallback, extendOptions
var Ajax = {
	get: getAjax,
	post: postAjax,
	put: putAjax,
	upload: uploadAjax,
	delete: deleteAjax,
	download: downloadAjax,
};