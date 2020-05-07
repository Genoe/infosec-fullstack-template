<?php
 Class CountriesApi {
    private const API_URL = 'https://restcountries.eu/rest/v2/';
    private const CURL_CONFIG = [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 5, // five seconds
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'GET',
    ];

    public function getCountriesByName($name, $fullName = false) {
        $curl = curl_init();
        $fullUrl = self::API_URL . 'name/' . $name;
    
        if ($fullName === true) {
            $fullUrl .= '?fullText=true';
        }

        curl_setopt_array($curl, array(
            CURLOPT_URL => $fullUrl) + 
            self::CURL_CONFIG
        );
          
        $response = curl_exec($curl);
        curl_close($curl);

        return $response;
    }
}
?>