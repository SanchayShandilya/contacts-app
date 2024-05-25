import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
ChartJS.register(...registerables);

const fetchAllData = async () => {
  const { data } = await axios.get('https://disease.sh/v3/covid-19/all');
  return data;
};

const fetchCountryData = async () => {
  const { data } = await axios.get('https://disease.sh/v3/covid-19/countries');
  return data;
};

const fetchHistoricalData = async () => {
  const { data } = await axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays=all');
  return data;
};

const ChartsAndMaps: React.FC = () => {
  const { data: allData, isLoading: allLoading, error: allError } = useQuery('allData', fetchAllData);
  const { data: countryData, isLoading: countryLoading, error: countryError } = useQuery('countryData', fetchCountryData);
  const { data: historicalData, isLoading: historicalLoading, error: historicalError } = useQuery('historicalData', fetchHistoricalData);

  if (allLoading || countryLoading || historicalLoading) {
    return <div>Loading...</div>;
  }

  if (allError || countryError || historicalError) {
    return <div>Error fetching data...</div>;
  }

  const chartData = {
    labels: Object.keys(historicalData.cases),
    datasets: [
      {
        label: 'Cases',
        data: Object.values(historicalData.cases),
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
      },
      {
        label: 'Deaths',
        data: Object.values(historicalData.deaths),
        fill: false,
        borderColor: 'rgba(255, 99, 132, 1)',
      },
      {
        label: 'Recovered',
        data: Object.values(historicalData.recovered),
        fill: false,
        borderColor: 'rgba(153, 102, 255, 1)',
      },
    ],
  };

  const center: [number, number] = [20, 0];

  return (
    <div>
      <h1>Render maps as mentioned in the question</h1>
      <div className="my-8">
        {countryData && (
          <MapContainer center={center} zoom={2} style={{ height: '500px', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {countryData.map((country: any) => (
              <Marker key={country.countryInfo._id} position={[country.countryInfo.lat, country.countryInfo.long]}>
                <Popup>
                  <div>
                    <h2>{country.country}</h2>
                    <p>Active: {country.active}</p>
                    <p>Recovered: {country.recovered}</p>
                    <p>Deaths: {country.deaths}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}
      </div>
      <div className="my-8">
        {historicalData && <Line data={chartData} />}
      </div>
    </div>
  );
};

export default ChartsAndMaps;
