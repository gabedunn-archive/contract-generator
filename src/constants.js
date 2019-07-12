/*
 * Gabe Dunn 2019
 * A few constants for the contracts.
 */

export const me = {
  name: 'Gabriel Dunn',
  company: 'Gabe Dunn Development',
  feedbackDays: 3,
  paymentDueDate: 7,
  paymentMethod: 'E-Transfer',
  interest: 5
}

export const client = {
  company: 'Placeholder Inc.',
  contact: 'John Smith',
  address: '123 Fake Address Lane'
}

export const project = {
  name: 'Placeholder Project',
  type: 'web',
  currency: 'CAD',
  tasks: ['Design and develop a web application.'],
  phases: [
    {
      phase: 0,
      cost: 1000.00
    },
    {
      phase: 1,
      cost: 1000.00,
      elements: [
        'Project setup.',
        'Initial mockups',
        'Initial layout.'
      ]
    },
    {
      phase: 2,
      cost: 1000.00,
      elements: [
        'Basic application functionality.',
        'Content creation and input.',
        'Initial styling.'
      ]
    },
    {
      phase: 3,
      cost: 1000.00,
      elements: [
        'Finalize functionality.',
        'Finalize content.',
        'Finalize layout.',
        'Finalize styling.'
      ]
    }
  ]
}

// Return a string with the first character.toUpperCase() and the rest the word sliced from index 1 onward.
export const capitalize = word => `${word[0].toUpperCase()}${word.slice(1)}`
