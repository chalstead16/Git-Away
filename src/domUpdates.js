let domUpdates = {
  displayWelcomeTraveler(traveler) {
    const welcome = document.querySelector('.js-welcome-message');
    welcome.innerText = `Welcome, ${traveler.name}`
  },

  displayTravelerTrips(traveler, destinations) {

    const displayTrips = document.querySelector('.js-all-trips');
    const travelerTrips = traveler.trips.forEach(trip => {
      displayTrips.innerHTML += `
      <article id="trip-card">
        <h3>${trip.destination.destination}</h3>
        <img class="destination" src="${trip.destination.image}" alt="${trip.destination.alt}">
        <p>Date: ${trip.date}</p>
        <p>Duration: ${trip.duration} day(s)</p>
        <p>Total Traveler(s): ${trip.travelers}</p>
        <p>Lodging: $${trip.destination.estimatedLodgingCostPerDay}</p>
        <p>Flight: $${trip.destination.estimatedFlightCostPerPerson}</p>
        <p>Status: ${trip.status}</p>
      </article>
      `
    })
  },
}

export default domUpdates;
