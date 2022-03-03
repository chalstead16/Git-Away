import chai from 'chai';
const expect = chai.expect;
import Destination from '../src/Destination';
import testData from './test-data';

describe('Destination', () => {
  let destinationData;
  let destination1;
  let destination2;
  let destination3;

  beforeEach(() => {
    destinationData = testData.destinations;
    destination1 = new Destination(destinationData[0]);
    destination2 = new Destination(destinationData[1]);
    destination3 = new Destination(destinationData[2]);
  })

  it('should be a function', () => {
    expect(Destination).to.be.a('function');
  })


  it('should be an instance of Destination', () => {
    expect(destination1).to.be.an.instanceof(Destination);
  })

  it('should have an id', () => {
    expect(destination1.id).to.equal(1);
  })
});
