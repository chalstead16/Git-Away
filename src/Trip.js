class Trip {
  constructor(tripRawData) {
    this.id = tripRawData.id;
    this.userID = tripRawData.userID;
    this.destinationID = tripRawData.destinationID;
    this.travelers = tripRawData.travelers;
    this.date = tripRawData.date;
    this.duration = tripRawData.duration;
    this.status = tripRawData.status;
    this.suggestedActivities = tripRawData.suggestActivites;
  }
}

export default Trip;
