class Destination {
  constructor(destinationRawData) {
    this.id = destinationRawData.id;
    this.destination = destinationRawData.destination;
    this.estimatedLodgingCostPerDay = destinationRawData.estimatedLodgingCostPerDay;
    this.estimatedFlightCostPerPerson = destinationRawData.estimatedFlightCostPerPerson;
    this.image = destinationRawData.image;
    this.alt = destinationRawData.alt;
  }
}

export default Destination;
