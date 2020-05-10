<?php
require_once('countriesApi.php');
$data;
$url = $_SERVER['REQUEST_URI'];

$pathInfo = parse_url($url, PHP_URL_PATH);
$pathInfo = explode('/', $pathInfo);

$api = new CountriesAPI();

try {
   if ($pathInfo[3] === 'name') {
      $fullName = false;
      $countryName = $pathInfo[4];

      if (isset($_GET['fullName']) && strtolower($_GET['fullName']) !== 'false') {
         $fullName = true;
      }
      $data = $api->getCountriesByName($countryName, $fullName);
   } else if ($pathInfo[3] === 'alpha') {
      $countryCode = $pathInfo[4];
      $data = $api->getCountriesByCode($countryCode);
   }
   
   $data = $api->generateData($data);
   $data['countries'] = $api->sortByPopulation($data['countries']);
} catch (Exception $e) {
   http_response_code(500);
   $data = $e->getMessage();
} 

header('Content-Type: application/json');
echo json_encode($data);
