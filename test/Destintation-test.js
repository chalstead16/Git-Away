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

  it('should have a destination', () => {
    expect(destination1.destination).to.equal("Lima, Peru");
  })

  it('should have an estimated lodging cost per day', () => {
    expect(destination2.estimatedLodgingCostPerDay).to.equal(100);
  })

  it('should have an estimated flight cost per person', () => {
    expect(destination2.estimatedFlightCostPerPerson).to.equal(780);
  })

  it('should have an image URL', () => {
    expect(destination3.image).to.equal("https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80")
  })
});
