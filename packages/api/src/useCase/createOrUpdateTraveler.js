function flightDetailsSubmitted (travelerDetails) {
  return travelerDetails.flightNum && travelerDetails.airlineCode && travelerDetails.scheduledArrivalTime
}

function shouldSendTextMessage (traveler, travelNotifier) {
  return traveler.phone && travelNotifier
}
export default function createOrUpdateTraveler ({ repository, travelerDetails, callbacks, travelerNotifier }) {
  let findOrCreateFlight

  if (flightDetailsSubmitted(travelerDetails)) {
    findOrCreateFlight = repository.flights.findOrCreate({
      where: {
        flightNum: travelerDetails.flightNum,
        airlineCode: travelerDetails.airlineCode,
        scheduledArrivalTime: travelerDetails.scheduledArrivalTime,
      },
    })
  } else {
    findOrCreateFlight = Promise.resolve([{}])
  }

  return findOrCreateFlight.then(async (flight) => {
    const travelerDetailsWithFlight = Object.assign({}, travelerDetails, { flightId: flight[0].id })
    travelerDetailsWithFlight.status = travelerDetailsWithFlight.passengerStatus
    if (travelerDetails.id) {
      return repository.travelers.update(travelerDetailsWithFlight, { where: { id: travelerDetailsWithFlight.id } })
    } else {
      if (travelerDetailsWithFlight.representative) {
        return repository.travelers.create(travelerDetailsWithFlight)
      } else {
        // TODO: assign this with logic other than the first entry
        const user = await repository.users.findOne()
        const travelerDetailsWithRepresentative = Object.assign({}, travelerDetailsWithFlight, { representative: user.id })
        return repository.travelers.create(travelerDetailsWithRepresentative)
      }
    }
  }).then((traveler) => {
    if (shouldSendTextMessage(traveler, travelerNotifier)) {
      travelerNotifier.onRegistrationSuccess(traveler)
    }
    return callbacks.onSuccess(traveler)
  })
}
