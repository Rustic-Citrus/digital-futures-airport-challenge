# Domain Models and Test Plan

**Author**: Harry Stuart Curtis

**Date Added**: 2024-04-19

**Last Updated**: 2024-04-19

## List of Contents

1. [Total Aircraft](#check-the-total-number-of-aircraft-at-the-airport)

## Check the Total Number of Aircraft at the Airport

### Story

As a **member of the airport operations staff**, I want to be able to see the occupancy of the various hangars and spaces of the airport, so that I can coordinate incoming and outgoing aircraft to the appropriate spaces.

### Domain Model

| Object | Property | Message | Output |
| --- | --- | --- | --- |
| Airport | totalAircraft @Number | getTotalAircraft() | @Number |
|  | vehicles @Array[@Aircraft] | getVehicles() | @Array[@Aircraft] |
|  |  | moveAircraftToAirport(@Aircraft) |  |
| Aircraft | flightNumber @String | getFlightNumber() | @String |
|  | airline @String | getAirline() | @String |

### Test Cases

* [ ] The user can move an aircraft to the airport.
* [ ] The user can retrieve the total number of aircraft that are in the airport.
* [ ] The same aircraft is not counted more than once.