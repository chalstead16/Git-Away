import helperFunctions from './utilities';
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

  findPastTrips = () => {
    const pastTrips = this.trips.filter(trip => {
      return helperFunctions.getToday() > trip.date.split('/').join('') && trip.status === 'approved';
    });
    return pastTrips;
  }

  findPresentOrFutureTrips = () => {
    const presentOrFutureTrips = this.trips.filter(trip => {
      return helperFunctions.getToday() < trip.date.split('/').join('') && trip.status === 'approved';
    });
    return presentOrFutureTrips;
  }

  findPendingTrips = () => {
    const pendingTrips = this.trips.filter(trip => {
      return trip.status === 'pending';
    });
    return pendingTrips;
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

  calcualateTotalApprovedLodingSpendForCurrentYear = () => {
    let approvedTrips = this.getApprovedTripsForCurrentYear();
    let totalLodgingSpend = 0;

    let total = approvedTrips.forEach((trip) => {
      totalLodgingSpend += (trip.destination.estimatedLodgingCostPerDay * trip.duration);
    });

    return totalLodgingSpend;
  }

  calculateTotalApprovedFlightSpendForCurrentYear = () => {
    let approvedTrips = this.getApprovedTripsForCurrentYear();
    let totalFlightSpend = 0;

    let total = approvedTrips.forEach((trip) => {
      totalFlightSpend += (trip.destination.estimatedFlightCostPerPerson * trip.travelers);
    });

    return totalFlightSpend;
  }

  calculateTotalSpendForCurrentYear = () => {
    let totalLodgingSpend = this.calcualateTotalApprovedLodingSpendForCurrentYear();
    let totalFlightSpend = this.calculateTotalApprovedFlightSpendForCurrentYear();

    let totalTravelCost = totalLodgingSpend + totalFlightSpend;
    let totalFee = totalTravelCost * .1

    const totalApprovedSpend = totalTravelCost + totalFee;

    return totalApprovedSpend.toFixed(2);
  }
}

export default Traveler;
