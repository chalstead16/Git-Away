class Traveler {
  constructor(travelerRawData) {
    this.id = travelerRawData.id;
    this.name = travelerRawData.name;
    this.travelerType = travelerRawData.travelerType;
    this.trips = [];
  }

  getTravelerTrips = (trips) => {
    trips.forEach((trip) => {
      if (trip.userID === this.id) {
        this.trips.push(trip);
      }
    });
  }

  getTravelerDestinations = (destinations) => {
    destinations.map((location) => {
      this.trips.map((trip) => {
        if (trip.destinationID === location.id) {
          trip.destination = location;
        }
      })
    })
  }
}

export default Traveler;
