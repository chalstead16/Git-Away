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
});
