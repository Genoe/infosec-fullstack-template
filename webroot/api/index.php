<?php
require_once('countriesApi.php');
 
$url = $_SERVER['REQUEST_URI'];
$pathInfo = parse_url($url, PHP_URL_PATH);
$pathInfo = explode('/', $pathInfo);
$data;

$api = new CountriesAPI();

if ($pathInfo[3] === 'name') {
   $countryName = $pathInfo[4];
   $data = $api->getCountriesByName($countryName, isset($_GET['fullName']));  
}

header('Content-Type: application/json');
echo $data;
