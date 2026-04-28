/**
 * Task Priority Levels
 */
export const TASK_PRIORITIES = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high'
}

/**
 * Task Categories
 */
export const TASK_CATEGORIES = [
  'Work',
  'Development',
  'Management',
  'Communication'
]

/**
 * Priority labels for display
 */
export const PRIORITY_LABELS = {
  [TASK_PRIORITIES.LOW]: 'Low Priority',
  [TASK_PRIORITIES.MEDIUM]: 'Medium Priority',
  [TASK_PRIORITIES.HIGH]: 'High Priority'
}

/**
 * Default task form values
 */
export const DEFAULT_TASK_FORM = {
  title: '',
  description: '',
  dueDate: '',
  priority: TASK_PRIORITIES.MEDIUM,
  category: TASK_CATEGORIES[0]
}
