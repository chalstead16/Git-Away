let domUpdates = {
  displayWelcomeTraveler(traveler) {
    const welcome = document.querySelector('.js-welcome-message');
    welcome.innerText = `Welcome, ${traveler.name}`
  },

  displayUpcomingTrips(traveler) {
    let displayTrips = document.querySelector('.js-trips');
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
      `
    });
  },

  displayPendingTrips(traveler) {
    const displayPendingTrips = document.querySelector('.js-pending-trips');
    const pendingTrips = traveler.findPendingTrips()
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
      `
    });
  },

  displayPastTrips(traveler) {
    const displayPastTrips = document.querySelector('.js-past-trips');
    const pastTrips = traveler.findPastTrips()
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
      `
    });
  },

  displayCurrentAnnualSpend(traveler) {
    const displaySpend = document.querySelector('.js-total-spend');
    const annualSpend = traveler.calculateTotalSpendForCurrentYear();
    displaySpend.innerText = `$${annualSpend}`;
  },

  displayEstimatedTravelQuote(quote) {
    const travelQuote = document.querySelector('.js-quote-message');
    travelQuote.innerText = `Travel Quote: $${quote} *includes 10% agent fee*`
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
}

export default domUpdates;
