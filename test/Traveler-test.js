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
  
});
