<?php
require_once('countriesApi.php');
$data;
$fullName = false;
$url = $_SERVER['REQUEST_URI'];
$pathInfo = parse_url($url, PHP_URL_PATH);
$pathInfo = explode('/', $pathInfo);


$api = new CountriesAPI();

if (isset($_GET['fullName']) && strtolower($_GET['fullName']) !== 'false') {
   $fullName = true;
}

if ($pathInfo[3] === 'name') {
   $countryName = $pathInfo[4];
   try {
      $data = $api->getCountriesByName($countryName, $fullName);
      $data = $api->generateData($data);
      $data['countries'] = $api->sortByPopulation($data['countries']);
   } catch (Exception $e) {
      http_response_code(500);
      $data = $e->getMessage();
   }      
} else if ($pathInfo[3] === 'alpha') {
   $countryCode = $pathInfo[4];
   try {
      $data = $api->getCountriesByCode($countryCode);
      $data = $api->generateData($data);
      $data['countries'] = $api->sortByPopulation($data['countries']);
   } catch (Exception $e) {
      http_response_code(500);
      $data = $e->getMessage();
   } 
}

header('Content-Type: application/json');
echo json_encode($data);
