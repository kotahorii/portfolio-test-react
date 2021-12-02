import { useMutationLabels } from './queries/useMutationLabels'
import { useQueryLabels } from './queries/useQueryLabel'

export const useLabel = () => {
  const { data: labels } = useQueryLabels()
  const { createLabelMutation, deleteLabelMutation } = useMutationLabels()
  
  return { labels }
}
