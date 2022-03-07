import './css/styles.css';
import {fetchData, postData} from './apiCalls';
import domUpdates from './domUpdates';
import Traveler from './Traveler';
import Trip from './Trip';
import Destination from './Destination';

//query selectors
const requestForm = document.querySelector('.js-form');
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
  addDestinationsToForm(destinations);
};

const getTravelerTripsAndDestinations = () => {
  traveler.getTravelerTrips(trips);
  traveler.getTravelerDestinations(destinations);
};

const updateAnnualSpend = () => {
  const annualSpend = traveler.calculateTotalSpendForCurrentYear();
  domUpdates.displayCurrentAnnualSpend(annualSpend);
};


const addDestinationsToForm = (destinations) => {
  const getDestination = destinations.forEach(destination => {
    const destinationOption = document.createElement('option');
    destinationOption.innerText = destination.destination;
    destinationOption.vale = destination.destination;
    destinationsInput.appendChild(destinationOption);
  });
};

const findRequestedDestination = () => {
  const requestedDestinationDetails = destinations.find(destination => {
    return destination.destination === destinationsInput.value;
  })
return requestedDestinationDetails;
};

const calculateTravelQuote = () => {
  const requestedDestination = findRequestedDestination();

  const requestedTravelQuote = (durationInput.value * requestedDestination.estimatedLodgingCostPerDay) + (travelersInput.value * requestedDestination.estimatedFlightCostPerPerson);

  const requestedTravelAgentFee = requestedTravelQuote * .1;

  const totalQuote = requestedTravelQuote + requestedTravelAgentFee;

  console.log(totalQuote)
  return totalQuote;
};

const estimateTravelQuote = () => {
  if (destinationsInput.value &&
     travelersInput.value &&
     dateInput.value &&
     durationInput.value) {
    calculateTravelQuote();
  };
};

const createTripRequest = () => {
  const requestedDestination = findRequestedDestination();

  const requestedTrip = {
    id: trips.length + 1,
    userID: traveler.id,
    destinationID: requestedDestination.id,
    travelers: parseInt(travelersInput.value),
    date: dateInput.value.split("-").join("/"),
    duration: parseInt(durationInput.value),
    status: 'pending',
    suggestedActivities: []
  }

  postData(requestedTrip);
};

const submitTravelRequest = () => {
  if (dateInput.value && durationInput.value && travelersInput.value && destinationsInput.value) {
    createTripRequest();
  };
};

//event listeners
window.addEventListener('load', fetchAllData);

quoteButton.addEventListener('click', function (event) {
  event.preventDefault();
  estimateTravelQuote();
});

requestForm.addEventListener('submit', function (event) {
  event.preventDefault();
  submitTravelRequest();
});
