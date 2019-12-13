<?php

if(isset($_POST['hash'])){
	header('Content-type: application/json; charset=utf-8');
	$post = array('apikey' => '28157565ae3a8fefdb0d0896fdfe7c18fd092f3df67d26eb6c7e1baef1929086','resource' => $_POST['hash']);
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, 'https://www.virustotal.com/vtapi/v2/file/report');
	curl_setopt($ch, CURLOPT_POST,1);
	curl_setopt($ch, CURLOPT_VERBOSE, 1); // remove this if your not debugging
	curl_setopt($ch, CURLOPT_ENCODING, 'gzip,deflate'); // please compress data
	curl_setopt($ch, CURLOPT_USERAGENT, "gzip, My php curl client");
	curl_setopt($ch, CURLOPT_RETURNTRANSFER ,true);
	curl_setopt($ch, CURLOPT_POSTFIELDS, $post);

	$result=curl_exec ($ch);
	$status_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
	//print("status = $status_code\n");
	if ($status_code == 200) { // OK
	  $js = json_decode($result, true);
	  echo json_encode($js);
	} else {  // Error occured
	  echo json_encode($result);
	}
	curl_close ($ch);
	exit();
}
?>