let domUpdates = {
  displayInvalidUsernameError() {
    const loginError = document.querySelector('.js-login-error');
    loginError.innerText = 'Hm, we don\'t recongize that username, try again.';
  },

  displayInvalidPasswordError() {
    const loginError = document.querySelector('.js-login-error');
    loginError.innerText = 'Hm, we don\'t recongize that password, try again.';
  },

  displayWelcomeTraveler(traveler) {
    const welcome = document.querySelector('.js-welcome-message');
    welcome.innerText = `Welcome, ${traveler.name}`;
  },

  displayUpcomingTrips(traveler) {
    const displayTrips = document.querySelector('.js-trips');
    displayTrips.innerHTML = ``;
    const presentOrFutureTrip = traveler.findPresentOrFutureTrips();
    presentOrFutureTrip.forEach(trip => {
      displayTrips.innerHTML += `
      <article id="trip-card">
        <h4>${trip.destination.destination}</h4>
        <img class="destination" src="${trip.destination.image}" alt="${trip.destination.alt}">
        <p>Date: ${trip.date}</p>
        <p>Duration: ${trip.duration} day(s)</p>
        <p>Total Traveler(s): ${trip.travelers}</p>
        <p>Lodging: $${trip.destination.estimatedLodgingCostPerDay}</p>
        <p>Flight: $${trip.destination.estimatedFlightCostPerPerson}</p>
        <p>Status: ${trip.status}</p>
      </article>
      `;
    });
  },

  displayPendingTrips(traveler) {
    const displayPendingTrips = document.querySelector('.js-pending-trips');
    displayPendingTrips.innerHTML = ``;
    const pendingTrips = traveler.findPendingTrips();
    pendingTrips.forEach(trip => {
      displayPendingTrips.innerHTML += `
      <article id="trip-card">
        <h4>${trip.destination.destination}</h4>
        <img class="destination" src="${trip.destination.image}" alt="${trip.destination.alt}">
        <p>Date: ${trip.date}</p>
        <p>Duration: ${trip.duration} day(s)</p>
        <p>Total Traveler(s): ${trip.travelers}</p>
        <p>Lodging: $${trip.destination.estimatedLodgingCostPerDay}</p>
        <p>Flight: $${trip.destination.estimatedFlightCostPerPerson}</p>
        <p>Status: ${trip.status}</p>
      </article>
      `;
    });
  },

  displayPastTrips(traveler) {
    const displayPastTrips = document.querySelector('.js-past-trips');
    displayPastTrips.innerHTML = ``;
    const pastTrips = traveler.findPastTrips();
    pastTrips.forEach(trip => {
      displayPastTrips.innerHTML += `
      <article id="trip-card">
        <h4>${trip.destination.destination}</h4>
        <img class="destination" src="${trip.destination.image}" alt="${trip.destination.alt}">
        <p>Date: ${trip.date}</p>
        <p>Duration: ${trip.duration} day(s)</p>
        <p>Total Traveler(s): ${trip.travelers}</p>
        <p>Lodging: $${trip.destination.estimatedLodgingCostPerDay}</p>
        <p>Flight: $${trip.destination.estimatedFlightCostPerPerson}</p>
        <p>Status: ${trip.status}</p>
      </article>
      `;
    });
  },

  displayCurrentAnnualSpend(traveler) {
    const displaySpend = document.querySelector('.js-total-spend');
    const annualSpend = traveler.calculateTotalSpendForCurrentYear();
    displaySpend.innerText = `$${annualSpend}`;
  },

  displaySuccessfulTravelRequest() {
    const requestSuccess = document.querySelector('.js-request-success-message');
    requestSuccess.innerHTML += `
      <p>Your Travel Request has been submitted to your agent. Thank you!</p>
    `;
  },

  displayDateRequestError() {
    const dateError = document.querySelector('.js-departure-date-error');
    dateError.innerText = 'Your selection was invalid. Please select an upcoming date.';
  },

  displayDurationError() {
    const durationError = document.querySelector('.js-duration-error');
    durationError.innerText = 'Your selection was invalid. Please include the duration of your travel.';
  },

  displayTravelersError() {
    const travelersError = document.querySelector('.js-total-travelers-error');
    travelersError.innerText = 'Your selection was invalid. Please include the total amount of travelers.';
  },

  displayDestinationError() {
    const destinationError = document.querySelector('.js-destination-error');
    destinationError.innerText = 'Your selection was invalid. Please select a travel destination.';
  },

  displayEstimatedTravelQuote(quote) {
    const travelQuote = document.querySelector('.js-quote-message');
    travelQuote.innerText = `Travel Quote: $${quote} *includes 10% agent fee*`;
  },

  displayDestinationsToTravelRequestForm(destinations) {
    const destinationsInput = document.querySelector('.js-destination');
    const getDestination = destinations.forEach(destination => {
      const destinationOption = document.createElement('option');
      destinationOption.innerText = destination.destination;
      destinationOption.value = destination.destination;
      destinationsInput.appendChild(destinationOption);
    });
  },

  resetTravelRequestFormDisplay() {
    const dateInput = document.querySelector('.js-departure-date');
    const durationInput = document.querySelector('.js-duration');
    const travelersInput = document.querySelector('.js-total-travelers');
    const destinationsInput = document.querySelector('.js-destination');
    const travelQuote = document.querySelector('.js-quote-message');
    const requestSuccess = document.querySelector('.js-request-success-message');

    dateInput.value = '';
    durationInput.value = '';
    travelersInput.value = '';
    destinationsInput.value = 'placeholder';
    travelQuote.innerText = ``;
    requestSuccess.innerHTML = ``;
  },
}

export default domUpdates;
