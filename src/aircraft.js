export default class Aircraft {
  constructor(flightNumber) {
    this.flightNumber = flightNumber;
  }

  getFlightNumber() {
    return this.flightNumber;
  }

  enterAirspace(airportWithAirspace) {
    airportWithAirspace.airspace.push(this);
  }
}