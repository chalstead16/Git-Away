import chai from 'chai';
const expect = chai.expect;
import testData from './test-data';
import Traveler from '../src/Traveler';

describe('Traveler', () => {
  let travelerData;
  let traveler1;
  let traveler2;
  let traveler3;
  let traveler4;

  beforeEach(() => {
    travelerData = testData.travelers;
    traveler1 = new Traveler(travelerData[0]);
    traveler2 = new Traveler(travelerData[1]);
    traveler3 = new Traveler(travelerData[2]);
    traveler4 = new Traveler(travelerData[3]);
  })

  it('should be a function', () => {
    expect(Traveler).to.be.a('function');
  })

  it('should be an instance of Traveler', () => {
    expect(traveler1).to.be.an.instanceof(Traveler);
  })

  it('should have an id', () => {
    expect(traveler2.id).to.equal(2);
  })

  it('should have a name', () => {
    expect(traveler3.name).to.equal("Sibby Dawidowitsch");
  })

  it('should have a traveler type', () => {
    expect(traveler4.travelerType).to.equal("photographer");
  })

  it('should have a trips', () => {
    expect(traveler4.trips).to.deep.equal([]);
  })

  it('should hold traveler\'s trips', () => {
    traveler1.getTravelerTrips(testData.trips);
    expect(traveler1.trips).to.deep.equal([testData.trips[0], testData.trips[4], testData.trips[5], testData.trips[6]])
  })

  it('should add traveler desitnations to their trips', () => {
    traveler1.getTravelerTrips(testData.trips);
    traveler1.getTravelerDestinations(testData.destinations);

    expect(traveler1.trips[1].destination).to.deep.equal(testData.destinations[2]);
  })

  it('should get all approved trips for current year', () => {
    traveler1.getTravelerTrips(testData.trips);
    traveler1.getTravelerDestinations(testData.destinations);

    expect(traveler1.getApprovedTripsForCurrentYear()).to.deep.equal([traveler1.trips[0],traveler1.trips[3]]);
  })

  it('should calculate total lodging spend for approved trips this year', () => {
    traveler1.getTravelerTrips(testData.trips);
    traveler1.getTravelerDestinations(testData.destinations);

    expect(traveler1.calcualateTotalApprovedLodingSpendForCurrentYear()).to.equal(1300)
  })

  it('should calculate total totalFlightSpend spend for approved trips this year', () => {
    traveler1.getTravelerTrips(testData.trips);
    traveler1.getTravelerDestinations(testData.destinations);

    expect(traveler1.calculateTotalApprovedFlightSpendForCurrentYear()).to.equal(1900)
  })

  it('should calculate total spend for approved trips this year', () => {
    traveler1.getTravelerTrips(testData.trips);
    traveler1.getTravelerDestinations(testData.destinations);

    expect(traveler1.calculateTotalSpendForCurrentYear()).to.equal('3520.00')
  })
});
