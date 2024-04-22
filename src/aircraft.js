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

  land() {
    this.status = "grounded";
  }
}