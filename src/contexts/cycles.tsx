import {
  createContext,
  useCallback,
  useContext,
  useState,
  ReactNode,
  useReducer,
} from 'react'
import { Cycle, cyclesReducer } from '../reducers/cycles/reducer'
import {
  ActionTypes,
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
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null,
  })

  const [amountPassedSeconds, setAmountPassedSeconds] = useState(0)

  const { cycles, activeCycleId } = cyclesState

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

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
