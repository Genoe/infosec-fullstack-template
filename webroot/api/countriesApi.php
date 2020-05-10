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
        CURLOPT_FAILONERROR => true
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

        if (curl_error($curl)) {
            $response = curl_error($curl);
            throw new Exception($response);
        }

        curl_close($curl);

        return (array)json_decode($response);
    }

    public function getCountriesByCode($countryCode) {
        $curl = curl_init();
        $fullUrl = self::API_URL . 'alpha/' . $countryCode;

        curl_setopt_array($curl, array(
            CURLOPT_URL => $fullUrl) + 
            self::CURL_CONFIG
        );
          
        $response = curl_exec($curl);

        if (curl_error($curl)) {
            $response = curl_error($curl);
            throw new Exception($response);
        }

        curl_close($curl);

        return [json_decode($response)];
    }

    public function generateData($response) {
        $countries = array();
        $regions = array();
        $subRegions = array();
        $data = $response;

        foreach ($data as $result) {
            $langNames = array();
            foreach ($result->languages as $language) {
                array_push($langNames, $language->name);
            }

            array_push($countries,[
                'name' => $result->name,
                'alpha2code' => $result->alpha2Code,
                'alpha3code' => $result->alpha3Code,
                'flag' => $result->flag,
                'region' => $result->region,
                'subregion' => $result->subregion,
                'population' => $result->population,
                'languages' => $langNames
            ]);

            $regions[$result->region] = $regions[$result->region] ?? 0;
            $regions[$result->region]++;

            $subRegions[$result->subregion] = $subRegions[$result->subregion] ?? 0;
            $subRegions[$result->subregion]++;
        }
        
        return array('countries' => $countries, 'regions' => $regions, 'subregions' => $subRegions);
    }

    public function sortByPopulation($array) {
        usort($array, function($a, $b) {
            return $b['population'] <=> $a['population'];
        });

        return $array;
    }
}
?>