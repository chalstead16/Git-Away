import './css/styles.css';
import {fetchData,postData} from './apiCalls';
import domUpdates from './domUpdates';
import Traveler from './Traveler';
import Trip from './Trip';
import Destination from './Destination';

//query selectors
const dateInput = document.querySelector('.js-departure-date');
const durationInput = document.querySelector('.js-duration');
const travelersInput = document.querySelector('.js-total-travelers');
const destinationsInput = document.querySelector('.js-destination');
const quoteButton = document.querySelector('.js-quote-button');
const requestButton = document.querySelector('.js-request-button');

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
      updateDashboard();
  });
};

const initializeData = (travelersRawData, tripsRawData, destinationsRawData) => {
  travelers = travelersRawData.map(traveler => new Traveler(traveler));
  traveler = travelers[43];
  trips = tripsRawData.map(trip => new Trip(trip));
  destinations = destinationsRawData.map(destination => new Destination(destination));
};

const updateDashboard = () => {
  getTravelerTripsAndDestinations();
  domUpdates.displayWelcomeTraveler(traveler);
  domUpdates.displayTravelerTrips(traveler);
  updateAnnualSpend();
};

const getTravelerTripsAndDestinations = () => {
  traveler.getTravelerTrips(trips);
  traveler.getTravelerDestinations(destinations);
};

const updateAnnualSpend = () => {
  const annualSpend = traveler.calculateTotalSpendForCurrentYear();
  domUpdates.displayCurrentAnnualSpend(annualSpend);
};

const createTripRequest = () => {
  const requestedTrip = {
    id: trips.length + 1,
    userID: traveler.id,
    destinationID: parseInt(destinationInput.value),
    travelers: parseInt(travelersInput.value),
    date: dateInput.value.split('-').('/'),
    duration: parseInt(tripDuration.value),
    status: 'pending',
    suggestedActivites: []
  }
  postData(requestedTrip, 'trips');
}

//event listeners
window.addEventListener('load', fetchAllData);
