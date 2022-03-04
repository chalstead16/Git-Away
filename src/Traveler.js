class Traveler {
  constructor(travelerRawData) {
    this.id = travelerRawData.id;
    this.name = travelerRawData.name;
    this.travelerType = travelerRawData.travelerType;
    this.trips = [];
  }
}

export default Traveler;
