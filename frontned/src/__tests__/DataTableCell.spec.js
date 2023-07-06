import { describe, it, expect, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/vue'

import DataTableCell from '../components/DataTableCell.vue'

describe('DataTableCell', () => {
  it('renders a table cell', async () => {
    render(DataTableCell, {
      props: {
        rate: {
          id: 1,
          rate: 2.5,
          editing: false
        }
      }
    })

    const cell = await screen.findByText('2.5')

    expect(cell.innerHTML).toBe('2.5')
    expect(cell.nodeName).toBe('SPAN')
  })

  it('renders an input when editing', async () => {
    render(DataTableCell, {
      props: {
        rate: {
          id: 1,
          rate: 2.5,
          editing: true
        }
      },
      global: {
        provide: {
          $swal: vi.fn()
        }
      }
    })

    const cell = await screen.findByRole('textbox')

    expect(cell.value).toBe('2.5')
    expect(cell.nodeName).toBe('INPUT')

    describe('when the input is changed', () => {
      cell.value = '3.5'
      fireEvent(cell, new KeyboardEvent('keyup', { key: 'Enter' }))

      it('emits an update event', () => {
        expect(cell.value).toBe('3.5')
        expect(cell.nodeName).toBe('SPAN')
      })
    })
  })
})
