var codesArray;
var codigosProcesados = 0;
var $class = ' class="tableexport-string target"';
jQuery(document).ready(($) =>{
	$(document).on("submit", "#searchs", ()=>{
		var codes = $.trim($("#codes").val()).split("\n");
		if(codes.length == 0){
			return false;
		}
		$("#codigosTotales").html("").html(codes.length);
		window.codesArray = codes;
		processRequestCode(codes, 1);
		return false;
	});
	//Exportar a Excel
    $("#btnDownloadTblRes").click(function (event) {
        if ($("#tblRes").length == 0) {
            return;
        }
        exporToExcel("tblRes");
        event.preventDefault();
        event.stopPropagation();
        return false;
    });
    //Exportar a Excel
    $("#btnDownloadTblError").click(function (event) {
        if ($("#tblError").length == 0) {
            return;
        }
        exporToExcel("tblError");
        event.preventDefault();
        event.stopPropagation();
        return false;
    });
});

function processRequestCode(codes){
	if(codes.length == 0){
		return;
	}
	getResponseHash(codes[0]);
	setTimeout(() => {
		codes.shift();
		processRequestCode(codes);
	}, 25000);
}

function getResponseHash(hash){
	$.ajax({
	    data: {"hash" : hash},
	    type: "POST",
	    dataType: "json",
	    url: "back/checkCode.php",
	})
	 .done(function( data, textStatus, jqXHR ) {
	 	if(data.response_code == 0){
	 		$('#tblError, #btnDownloadTblError').show();
	 		$('#tblError > tbody:last').append('<tr><td' + $class + '>' + hash + '</td><td' + $class + '>' + data.verbose_msg + '</td></tr>'); 
	 	}else{
	 		$('#tblRes, #btnDownloadTblRes').show();
	 		$('#tblRes > tbody:last').append('<tr><td' + $class + '>' + data.sha256 + '</td><td' + $class + '>' + data.sha1 + '</td><td' + $class + '>' + data.md5 + '</td><td' + $class + '>' + ((data.scans.McAfee.result == null)?'':data.scans.McAfee.result) + '</td><td' + $class + '>' + data.total + '/' + data.positives + '</td></tr>'); 
	 	}
	 	console.log(data)
	 	window.codigosProcesados = window.codigosProcesados + 1;
	 	actualizarMensaje()
	 })
	 .fail(function( jqXHR, textStatus, errorThrown ) {
	 	console.log( "La solicitud a fallado: " +  textStatus);
	});
}

function actualizarMensaje(){
	$("#mensajeUsuario").show();
	$("#codigosProcesados").html("").html(window.codigosProcesados);
}

function exporToExcel(tableId) {
    var d = new Date();
    var strDate = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
    var tableElement = document.getElementById(tableId);
    var table = TableExport(tableElement, {
        filename: tableId + " - " + strDate + ".xls",
        formats: ['xlsx']
    });
    var exportData = table.getExportData();
    var xlsxData = exportData[tableId].xlsx;
    table.export2file(xlsxData.data, xlsxData.mimeType, xlsxData.filename, xlsxData.fileExtension, xlsxData.merges, xlsxData.RTL, xlsxData.sheetname)
}