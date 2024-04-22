export default class Aircraft {
  constructor(flightNumber) {
    this.flightNumber = flightNumber;
    this.status = "unknown";
  }

  getFlightNumber() {
    return this.flightNumber;
  }

  enterAirspace(airportWithAirspace) {
    airportWithAirspace.airspace.push(this);
  }

  getStatus() {
    return this.status;
  }

  land(designatedAirport) {
    this.status = "grounded";
    designatedAirport.moveAircraftToAirport(this);
  }

  takeOff(designatedAirport) {
    this.status = "airborne";
    for (let i = 0; i < designatedAirport.grounded; i++) {
      if (designatedAirport.grounded[i].getFlightNumber() === this.getFlightNumber()) designatedAirport.moveFromGroundedToAirspace(grounded[i]);
    }
  }

  checkLandingClearance() {
    return this.hasLandingClearance;
  }
}