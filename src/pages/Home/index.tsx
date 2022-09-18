import { createContext, useCallback, useState } from 'react'
import { HandPalm, Play } from 'phosphor-react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { NewCycleInputs } from './components/NewCycleInputs'
import { Countdown } from './components/Countdown'
import {
  HomeContainer,
  StopCountdownButton,
  StartCountdownButton,
} from './styles'

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  stopDate?: Date
  finishDate?: Date
}

interface CyclesContextData {
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountPassedSeconds: number
  markCurrentCycleAsFinished: () => void
  setActiveCycleIdAsNull: () => void
  setSecondsPassed: (seconds: number) => void
}

export const CyclesContext = createContext({} as CyclesContextData)

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(1, 'Mínimo é de 5 minutos')
    .max(60, 'Máximo é de 60 minutos'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountPassedSeconds, setAmountPassedSeconds] = useState(0)

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm

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

  function handleCreateNewCycle({ task, minutesAmount }: NewCycleFormData) {
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

    reset()
  }

  function handleStopCycle() {
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

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const task = watch('task')
  const shouldDisableSubmitButton = !task

  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
        <CyclesContext.Provider
          value={{
            activeCycle,
            activeCycleId,
            amountPassedSeconds,
            markCurrentCycleAsFinished,
            setActiveCycleIdAsNull,
            setSecondsPassed,
          }}
        >
          <FormProvider {...newCycleForm}>
            <NewCycleInputs />
          </FormProvider>
          <Countdown />
        </CyclesContext.Provider>

        {activeCycle ? (
          <StopCountdownButton type="button" onClick={handleStopCycle}>
            {' '}
            <HandPalm size={26} /> Parar
          </StopCountdownButton>
        ) : (
          <StartCountdownButton
            disabled={shouldDisableSubmitButton}
            type="submit"
          >
            {' '}
            <Play size={26} /> Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
