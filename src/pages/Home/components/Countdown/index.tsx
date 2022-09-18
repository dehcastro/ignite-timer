import { useEffect } from 'react'
import { differenceInSeconds as getDifferenceInSeconds } from 'date-fns'
import { CountdownContainer, Separator } from './styles'
import { useCycles } from '../../../../contexts/cycles'

export function Countdown() {
  const {
    activeCycle,
    activeCycleId,
    amountPassedSeconds,
    markCurrentCycleAsFinished,
    setActiveCycleIdAsNull,
    setSecondsPassed,
  } = useCycles()

  const cycleTotalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  const currentCycleSeconds = activeCycle
    ? cycleTotalSeconds - amountPassedSeconds
    : 0

  const minutesAmount = Math.floor(currentCycleSeconds / 60)
  const secondsAmount = currentCycleSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) document.title = `${minutes}:${seconds}`
  }, [activeCycle, minutes, seconds])

  useEffect(() => {
    let currentCycle: number

    if (activeCycle) {
      currentCycle = setInterval(() => {
        const differenceInSeconds = getDifferenceInSeconds(
          new Date(),
          activeCycle.startDate,
        )

        if (differenceInSeconds >= cycleTotalSeconds) {
          markCurrentCycleAsFinished()
          setActiveCycleIdAsNull()
          clearInterval(currentCycle)
        } else {
          setSecondsPassed(differenceInSeconds)
        }
      }, 1000)
    }

    return () => clearInterval(currentCycle)
  }, [
    activeCycle,
    cycleTotalSeconds,
    activeCycleId,
    markCurrentCycleAsFinished,
    setActiveCycleIdAsNull,
    setSecondsPassed,
  ])

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}
