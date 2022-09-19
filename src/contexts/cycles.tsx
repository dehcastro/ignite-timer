import {
  createContext,
  useCallback,
  useContext,
  useState,
  ReactNode,
  useReducer,
  useEffect,
} from 'react'
import { differenceInSeconds } from 'date-fns'
import { Cycle, cyclesReducer } from '../reducers/cycles/reducer'
import {
  addNewCycleAction,
  markCurrentCycleAsFinishedAction,
  stopCycleAction,
} from '../reducers/cycles/actions'

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
  setSecondsPassed: (seconds: number) => void
  createNewCycle: ({ task, minutesAmount }: CreateCycleData) => void
  stopCycle: () => void
}

export const CyclesContext = createContext({} as CyclesContextData)

interface ContextProps {
  children: ReactNode
}

const CyclesProvider = ({ children }: ContextProps) => {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    () => {
      const storedStateAsJSON = localStorage.getItem(
        '@ignite-timer:cycles-state-1.0.0',
      )

      console.log({ storedStateAsJSON })

      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON)
      }
    },
  )

  const { cycles, activeCycleId } = cyclesState
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const [amountPassedSeconds, setAmountPassedSeconds] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
    }

    return 0
  })

  useEffect(() => {
    const cyclesStateJSON = JSON.stringify(cyclesState)

    localStorage.setItem('@ignite-timer:cycles-state-1.0.0', cyclesStateJSON)
  }, [cyclesState])

  const markCurrentCycleAsFinished = useCallback(() => {
    dispatch(markCurrentCycleAsFinishedAction())
  }, [])

  const setSecondsPassed = useCallback((seconds: number) => {
    setAmountPassedSeconds(seconds)
  }, [])

  function createNewCycle({ task, minutesAmount }: CreateCycleData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task,
      minutesAmount,
      startDate: new Date(),
    }

    dispatch(addNewCycleAction(newCycle))

    setAmountPassedSeconds(0)
  }

  function stopCycle() {
    dispatch(stopCycleAction())
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        amountPassedSeconds,
        markCurrentCycleAsFinished,
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
