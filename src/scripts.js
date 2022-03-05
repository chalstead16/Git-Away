import './css/styles.css';
import fetchData from './apiCalls'
import Traveler from './Traveler';
import Trip from './Trip';
import Destination from './Destination';

//global variables
let travelers;
let traveler;
let trips;
let destinations;

// functions
const fetchAllData = () => {
  Promise.all([fetchData('travelers'), fetchData('trips'), fetchData('destinations')])
    .then(data => {
      initializeData(data[0].travelers, data[1].trips, data[2].destinations);
  });
};

const initializeData = (travelersRawData, tripsRawData, destinationsRawData) => {
  travelers = travelersRawData.map(traveler => new Traveler(traveler));
  trips = tripsRawData.map(trip => new Trip(trip));
  destinations = destinationsRawData.map(destination => new Destination(destination));
};

fetchAllData()
