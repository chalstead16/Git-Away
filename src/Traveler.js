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
      });
    });
  }

  getApprovedTripsForCurrentYear = () => {
    let today = new Date();
    let currentYear = new Date(today).getFullYear();

    let currentYearApprovedTrips = this.trips.filter((trip) => {
      return trip.date.includes(currentYear) && (trip.status === 'approved');
    });
    
    return currentYearApprovedTrips;
  }
}

export default Traveler;
