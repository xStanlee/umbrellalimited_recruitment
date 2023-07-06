import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/vue'

import { mockSecondItem } from './ServiceTable.mock.js'

import DataTableBody from '../components/DataTableBody.vue'

describe('DataTableBody', () => {
  render(DataTableBody, {
    props: {
      rates: mockSecondItem
    }
  })

  const header = screen.getByTestId('tbody-header')
  const cell = screen.queryAllByTestId('tbody-cell')

  it('renders a table header', () => {
    expect(header.nodeName).toBe('TD')
  })

  it("first element should be cell with 'BE' value", () => {
    expect(header.innerHTML).toBe('BE')
  })

  it('first cell should be a span element and render 1.2 as a value: ', () => {
    expect(cell[0].nodeName).toBe('SPAN')
    expect(cell[0].innerHTML).toBe('1.2')
  })

  it('fourth cell should be a span element and render 1.2 as a value: ', () => {
    expect(cell[3].nodeName).toBe('SPAN')
    expect(cell[3].innerHTML).toBe('6.4')
  })

  it('last cell should be a span element and render 1.2 as a value: ', () => {
    expect(cell[28].nodeName).toBe('SPAN')
    expect(cell[28].innerHTML).toBe('1.2')
  })
})
