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
import { useCycles } from '../../contexts/cycles'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(1, 'Mínimo é de 5 minutos')
    .max(60, 'Máximo é de 60 minutos'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
  const { activeCycle, createNewCycle, stopCycle } = useCycles()

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, watch } = newCycleForm

  const task = watch('task')
  const shouldDisableSubmitButton = !task

  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(createNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleInputs />
        </FormProvider>
        <Countdown />

        {activeCycle ? (
          <StopCountdownButton type="button" onClick={stopCycle}>
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
