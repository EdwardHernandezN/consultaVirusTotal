<!DOCTYPE html>
<html>
<head>
	<title>Consulta de Códigos</title>
	<link rel="stylesheet" type="text/css" href="css/main.css">
</head>
<body>
	<h1>Consulta de Códigos</h1>
	<form id="searchs">
		<textarea id="codes" name="codes" cols="100" rows="20"></textarea>
		<br>
		<input type="submit" name="Consultar" value="Consultar">
	</form>
	<hr>
	<h3 id="mensajeUsuario" style="display: none;">
		Se han procesado <span id="codigosProcesados">0</span> de <span id="codigosTotales">0</span> códigos
	</h3>
	<hr>
	<button id="btnDownloadTblRes" style="display:none;">Descargar</button>
	<table id="tblRes" style="display:none;">
		<thead>
			<tr>
				<td>SHA256</td>
				<td>SHA 1</td>
				<td>MD5</td>
				<td>McAfee</td>
				<td>Total</td>
			</tr>
		</thead>
		<tbody>
			
		</tbody>
	</table>
	<hr>
	<button id="btnDownloadTblError" style="display:none;">Descargar</button>
	<table id="tblError" style="display:none;">
		<thead>
			<tr>
				<td>HASH</td>
				<td>Mensaje</td>
			</tr>
		</thead>
		<tbody>
			
		</tbody>
	</table>

	<script type="text/javascript" src="vendor/jquery.min.js"></script>
	<script type="text/javascript" src="vendor/xlsx.core.min.js"></script>
    <script type="text/javascript" src="vendor/Blob.min.js"></script>
    <script type="text/javascript" src="vendor/FileSaver.min.js"></script>
    <script type="text/javascript" src="vendor/tableexport.min.js"></script>
    <script type="text/javascript" src="js/main.js"></script>
</body>
</html>