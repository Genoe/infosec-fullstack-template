<?php
require_once('countriesApi.php');
$data;
$fullName = false;
$url = $_SERVER['REQUEST_URI'];
$pathInfo = parse_url($url, PHP_URL_PATH);
$pathInfo = explode('/', $pathInfo);


$api = new CountriesAPI();

if (isset($_GET['fullName'])) {
   if (strtolower($_GET['fullName']) !== 'false') {
      $fullName = true;
   }
}

if ($pathInfo[3] === 'name') {
   $countryName = $pathInfo[4];
   $data = $api->getCountriesByName($countryName, $fullName);  
}

header('Content-Type: application/json');
echo $data;
