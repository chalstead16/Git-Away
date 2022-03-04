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

  calculateTotalSpendForCurrentYear = () => {
    let approvedTrips = this.getApprovedTripsforCurrentYear();
    let totalTravelCost = 0;

    let total = approvedTrips.forEach((trip) => {
      totalSpend += (trip.destination.estimatedLodgingCostPerDay * trip.duration)
      totalSpend =+ (trip.destination.estimatedFlightCostPerPerson * trip.duration)
    })

    let totalWithFee = totalTravelCost * .1

  return totalWithFee;
  }
}

export default Traveler;
