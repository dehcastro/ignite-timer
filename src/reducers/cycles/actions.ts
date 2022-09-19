import { Cycle } from './reducer'

export enum ActionTypes {
  ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
  STOP_CYCLE = 'STOP_CYCLE',
  MARK_CURRENT_CYCLE_AS_FINISHED = 'MARK_CURRENT_CYCLE_AS_FINISHED',
}

export const addNewCycleAction = (newCycle: Cycle) => ({
  type: ActionTypes.ADD_NEW_CYCLE,
  payload: {
    newCycle,
  },
})

export const stopCycleAction = () => ({
  type: ActionTypes.STOP_CYCLE,
})

export const markCurrentCycleAsFinishedAction = () => ({
  type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED,
})
