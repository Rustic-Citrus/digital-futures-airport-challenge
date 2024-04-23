# Domain Models and Test Plan

**Author**: Harry Stuart Curtis

**Date Added**: 2024-04-19

**Last Updated**: 2024-04-23

## List of Contents

- [Domain Models and Test Plan](#domain-models-and-test-plan)
  - [List of Contents](#list-of-contents)
  - [Check Total Number of Aircraft at the Airport](#check-total-number-of-aircraft-at-the-airport)
    - [Story](#story)
    - [Domain Model](#domain-model)
    - [Test Cases](#test-cases)
  - [Override Default Capacity](#override-default-capacity)
    - [Stories](#stories)
    - [Domain Model](#domain-model-1)
    - [Test Cases](#test-cases-1)
  - [Landing an Aircraft at the Airport and Giving Clearance for Landing](#landing-an-aircraft-at-the-airport-and-giving-clearance-for-landing)
    - [Stories](#stories-1)
    - [Domain Model](#domain-model-2)
    - [Test Cases](#test-cases-2)
  - [Take Off](#take-off)
    - [User Stories](#user-stories)
    - [Domain Model](#domain-model-3)
    - [Test Cases](#test-cases-3)
  - [Cannot Give Clearance If Weather is Stormy](#cannot-give-clearance-if-weather-is-stormy)
    - [User Stories](#user-stories-1)
    - [Domain Model](#domain-model-4)
    - [Test Cases](#test-cases-4)

## Check Total Number of Aircraft at the Airport

### Story

As a **member of the airport operations staff**, I want to be able to see the occupancy of the various hangars and spaces of the airport, so that I can coordinate incoming and outgoing aircraft to the appropriate spaces.

### Domain Model

| Object | Property | Message | Output |
| --- | --- | --- | --- |
| Airport | vehicles @Array[@Aircraft] | getVehicles() | @Array[@Aircraft] |
|  |  | getTotalVehicles() | @Number |
|  |  | moveVehicleToAirport(@Aircraft) |  |
| Aircraft | flightNumber @String | getFlightNumber() | @String |
|  | airline @String | getAirline() | @String |

### Test Cases

* [X] The user can move an aircraft to the airport.
* [X] The user can retrieve the total number of aircraft that are in the airport.

## Override Default Capacity

### Stories

As a **member of the maintenance team**, I want to be able to override the default capacity of each of the spaces of the airport, so that I can allocate more aircraft to an area when there is a high demand for airport space.

As a **hacker/disgruntled employee**, I want to be able to decrease the default capacity of a space below its current occupancy, so that I can give the impression that the space is full when it is not.

As a **hacker/disgruntled employee**, I want to be able to increase the default capacity of an airport space well above its normal capacity, so that there is an increased risk of accidents.

### Domain Model

| Object | Property | Message | Output |
| --- | --- | --- | --- |
| Airport | vehicles @Array[@Aircraft] | getVehicles() | @Array[@Aircraft] |
|  |  | getTotalVehicles() | @Number |
|  |  | moveVehicleToAirport(@Aircraft) |  |
|  | capacity @Number | getCapacity() | @Number  |
|  | | setCapacity(@Number) |  |
| Aircraft | flightNumber @String | getFlightNumber() | @String |
|  | airline @String | getAirline() | @String |

### Test Cases

* [X] The user can change the capacity of the airport.
* [X] The user cannot change the capacity of the airport below 0.
* [X] The user cannot change the capacity of the airport below the number of aircraft currently at the airport.
* [X] The user cannot change the capacity of the airport above 50.

## Landing an Aircraft at the Airport and Giving Clearance for Landing

### Stories

As a **pilot**, I want to be able to enter the airspace of the airport, so that I can request clearance for landing.

As a **pilot**, I want to be able to land the aircraft I am piloting, so that I can allow my passengers to disembark.

As a **pilot**, I only want to be able to land the plane if the conditions are safe, so that I minimise the risk of an accident.

As a **pilot**, I only want to receive accurate information, so that I can make the effective decisions regarding the aircraft I am piloting.

As an **air traffic controller**, I only want to give clearance for landing to aircraft that are in the air, so that I do not send misleading or confusing messages to pilots.

As a **hacker/disgruntled employee**, I want to give clearance for landing to aircraft when the airport is full, so that I can cause an accident.

As an **air traffic controller**, I do not want to clear a plane for landing when the airport is full, so that airport spaces are not over capacity in a way that causes a hazard.

As an **air traffic controller**, I do not want to clear a plane for landing that is grounded at the airport, so that pilots do not receive confusing information.

As a **hacker/disgruntled employee**, I want to clear planes for landing even when they are grounded, so that I can confuse pilots and increase the risk of accidents.

### Domain Model

| Object | Property | Message | Output |
| --- | --- | --- | --- |
| Airport | grounded @Array[@Aircraft] | getGroundedAircraft() | @Array[@Aircraft] |
|  |  | getTotalGrounded() | @Number |
|  |  | moveAircraftToAirport(@Aircraft) |  |
|  | capacity @Number | getCapacity() | @Number  |
|  | | setCapacity(@Number) |  |
|  | airspace @Array[@Aircraft] | getAircraftInAirspace() | @Array[@Aircraft]  |
|  | | clearAircraftForLanding(@Aircraft) |  |
| Aircraft | flightNumber @String | getFlightNumber() | @String |
|  | airline @String | getAirline() | @String |
|  | hasLandingClearance @Boolean | checkLandingClearance() | @Boolean |
|  | status @String | getStatus() | @String |
|  | | land(@Airport) | |
|  | | enterAirspace(@Airport) | |

### Test Cases

* [X] Aircraft can enter the airspace of an airport.
* [X] Airports can check the status of aircraft that are grounded or in their airspace.
* [X] A valid aircraft can land at an airport.
* [X] Airports can clear valid aircraft for landing.
* [X] An aircraft cannot land if it does not have clearance.
* [X] Airports cannot clear aircraft for landing if the capacity of the airport is full.
* [X] Airports cannot clear aircraft for landing if the aircraft is not grounded.

## Take Off

### User Stories

As an **air traffic controller**, I only want to be able to clear planes for take off that are on the ground at the airport.

As a **hacker/disgruntled employee**, I want to be able to clear planes for take off that are in the air, so that pilots are potentially confused and, therefore, increasing the risk of accidents.

### Domain Model

| Object | Property | Message | Output |
| --- | --- | --- | --- |
| Airport | grounded @Array[@Aircraft] | getGroundedAircraft() | @Array[@Aircraft] |
|  |  | getTotalGrounded() | @Number |
|  |  | moveAircraftToAirport(@Aircraft) |  |
|  | capacity @Number | getCapacity() | @Number  |
|  | | setCapacity(@Number) |  |
|  | airspace @Array[@Aircraft] | getAircraftInAirspace() | @Array[@Aircraft]  |
|  | | clearAircraftForLanding(@Aircraft) |  |
|  | | clearAircraftForTakeOff(@Aircraft) | |
| Aircraft | flightNumber @String | getFlightNumber() | @String |
|  | airline @String | getAirline() | @String |
|  | hasLandingClearance @Boolean | checkLandingClearance() | @Boolean |
|  | status @String | getStatus() | @String |
|  | | land(@Airport) | |
|  | | enterAirspace(@Airport) | |
|  | | takeOff(@Airport) | |
|  | hasTakeOffClearance @Boolean | checkTakeOffClearance() | @Boolean |

### Test Cases

* [X] Airports cannot clear aircraft for take off if the aircraft is not airborne.
* [X] Valid aircraft can take off from an airport.

## Cannot Give Clearance If Weather is Stormy

### User Stories

As a **meteorologist**, I want to be able to take away a plane's clearance for landing when the weather is stormy, so that the risk of an accident is minimised.

As a **meteorologist**, I want to be able to take away a plane's clearance for take off when the weather is stormy, so that the risk of an accident is minimised.

As a **hacker/disgruntled employee**, I want to be able to override the feature that takes away a plane's clearance due to bad weather, so that I can cause an accident.

### Domain Model

| Object | Property | Message | Output |
| --- | --- | --- | --- |
| Airport | grounded @Array[@Aircraft] | getGroundedAircraft() | @Array[@Aircraft] |
|  |  | getTotalGrounded() | @Number |
|  |  | moveAircraftToAirport(@Aircraft) |  |
|  | capacity @Number | getCapacity() | @Number  |
|  | | setCapacity(@Number) |  |
|  | airspace @Array[@Aircraft] | getAircraftInAirspace() | @Array[@Aircraft]  |
|  | | clearAircraftForLanding(@Aircraft) |  |
|  | | clearAircraftForTakeOff(@Aircraft) | |
|  | #currentWeather @String | checkWeather() | @String |
| Aircraft | flightNumber @String | getFlightNumber() | @String |
|  | airline @String | getAirline() | @String |
|  | hasLandingClearance @Boolean | checkLandingClearance() | @Boolean |
|  | status @String | getStatus() | @String |
|  | | land(@Airport) | |
|  | | enterAirspace(@Airport) | |
|  | | takeOff(@Airport) | |
|  | hasTakeOffClearance @Boolean | checkTakeOffClearance() | @Boolean |

### Test Cases

* [X] All aircraft have their clearance to take off revoked if the weather is stormy.
* [X] All aircraft have their clearance to land revoked if the weather is stormy.
* [ ] Airports cannot give clearance to land if a weather check returns "stormy".
* [ ] Airports cannot give clearance to take off if a weather check returns "stormy".