import {
  createContext,
  useCallback,
  useContext,
  useState,
  ReactNode,
} from 'react'

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  stopDate?: Date
  finishDate?: Date
}

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface CyclesContextData {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountPassedSeconds: number
  markCurrentCycleAsFinished: () => void
  setActiveCycleIdAsNull: () => void
  setSecondsPassed: (seconds: number) => void
  createNewCycle: ({ task, minutesAmount }: CreateCycleData) => void
  stopCycle: () => void
}

export const CyclesContext = createContext({} as CyclesContextData)

interface ContextProps {
  children: ReactNode
}

const CyclesProvider = ({ children }: ContextProps) => {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountPassedSeconds, setAmountPassedSeconds] = useState(0)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const markCurrentCycleAsFinished = useCallback(() => {
    setCycles((currentState) =>
      currentState.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishDate: new Date() }
        }

        return cycle
      }),
    )
  }, [activeCycleId])

  const setActiveCycleIdAsNull = useCallback(() => {
    setActiveCycleId(null)
  }, [])

  const setSecondsPassed = useCallback((seconds: number) => {
    setAmountPassedSeconds(seconds)
  }, [])

  function createNewCycle({ task, minutesAmount }: CreateCycleData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task,
      minutesAmount,
      startDate: new Date(),
    }

    setCycles((currentState) => [...currentState, newCycle])
    setActiveCycleId(id)
    setAmountPassedSeconds(0)
  }

  function stopCycle() {
    setCycles((currentState) =>
      currentState.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, stopDate: new Date() }
        }

        return cycle
      }),
    )

    setActiveCycleId(null)
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        amountPassedSeconds,
        markCurrentCycleAsFinished,
        setActiveCycleIdAsNull,
        setSecondsPassed,
        createNewCycle,
        stopCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}

const useCycles = () => useContext(CyclesContext)

export { CyclesProvider, useCycles }
