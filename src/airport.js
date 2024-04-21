export default class Airport {
  constructor() {
    this.grounded = new Array();
    this.capacity = 10;
  }

  moveAircraftToAirport(aircraft) {
    this.grounded.push(aircraft);
  }

  getGrounded() {
    let total = 0;
    this.grounded.forEach(() => {
      total += 1;
    })
    return total;
  }

  getFlightNumbers() {
    const flightNumbers = new Array();

    this.grounded.forEach(vehicle => {
      flightNumbers.push(vehicle.getFlightNumber());
    })

    return flightNumbers;
  }

  getCapacity() {
    return this.capacity;
  }

  setCapacity(newCapacity) {
    if (newCapacity >= 0 && newCapacity > this.capacity && newCapacity < 50) this.capacity = newCapacity;
  }
}