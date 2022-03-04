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
    this.trips.forEach((trip) => {
      if (trip.destinationID === destinations.id) {
        trip.destination = destinations.find((destination) => {
          return destination.id === trip.destinationID
        })
      }
    }
  }
}

export default Traveler;
