import chai from 'chai';
const expect = chai.expect;
import testData from './test-data';
import Trip from '../src/Trip';

describe('Trip', () => {
  let tripData;
  let trip1;
  let trip2;
  let trip3;
  let trip4;

  beforeEach(() => {
    tripData = testData.trips;
    trip1 = new Trip(tripData[0]);
    trip2 = new Trip(tripData[1]);
    trip3 = new Trip(tripData[2]);
    trip4 = new Trip(tripData[3]);
  })

  it('should be a function', () => {
    expect(Trip).to.be.a('function');
  })

  it('should be an instance of Trip', () => {
    expect(trip1).to.be.an.instanceof(Trip);
  })

  it('should have an id', () => {
    expect(trip1.id).to.equal(1);
  })

  it('should have a userID', () => {
    expect(trip2.userID).to.equal(35);
  })

  it('should have a destinationID', () => {
    expect(trip2.destinationID).to.equal(25);
  })

  it('should have the total travelers', () => {
    expect(trip2.travelers).to.equal(5);
  })

  it('should have a date', () => {
    expect(trip3.date).to.equal("2022/05/22");
  })
});
