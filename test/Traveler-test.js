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
    traveler1.getTravelerTrips(testData.trips)
    expect(traveler1.trips).to.deep.equal([testData.trips[0], testData.trips[4]])
  })

  it('should add traveler desitnations to their trips', () => {
    traveler1.getTravelerTrips(testData.trips)
    traveler1.getTravelerDestinations(testData.destinations)
    console.log(traveler1.trips)
    expect(traveler1.trips[1].destination).to.deep.equal(testData.destinations[2])
  })

});
