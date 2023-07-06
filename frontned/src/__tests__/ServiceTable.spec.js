import { describe, it, expect, beforeAll } from 'vitest'
import { ServiceTable } from '../services/ServiceTable'
import { mockSecondItem, mockThirdItem } from './ServiceTable.mock.js'

let serviceTable

describe('ServiceTable', () => {
  beforeAll(async () => {
    serviceTable = await ServiceTable.initializeRecords()
  })

  it('after initialization records should return an array of source countries', () => {
    expect(serviceTable.records).toBeInstanceOf(Array)
  })

  it('initial records property should have 3 items', () => {
    expect(serviceTable.records).toHaveLength(3)
  })

  it('after initialization records should return an array of rates', () => {
    expect(serviceTable.rates).toBeInstanceOf(Array)
  })

  it('initial rates property should have 3 items', () => {
    expect(serviceTable.rates).toHaveLength(3)
  })

  describe('sourceCountriesRates', () => {
    it('should return an 2 elements array of rates filtered by source countries', () => {
      const filters = ['AT', 'BE']
      const rates = serviceTable.sourceCountriesRates(filters)

      expect(rates).toHaveLength(2)
      expect(rates[0].sourceCountry).toBe('AT')
      expect(rates[1].sourceCountry).toBe('BE')
    })

    it('with passed filters should return second element of result', () => {
      const filters = ['AT', 'BE', 'BG']
      const rates = serviceTable.sourceCountriesRates(filters, mockSecondItem)

      expect(rates).toHaveLength(1)
      expect(rates[0].sourceCountry).toBe('BE')
    })

    it('with passed filters should return third element of result', () => {
      const filters = ['BG']
      const rates = serviceTable.sourceCountriesRates(filters, mockThirdItem)

      expect(rates).toHaveLength(1)
      expect(rates[0].sourceCountry).toBe('BG')
    })
  })

  describe('destinationCountriesRates', () => {
    it('should return an nested 2 elements array of rates filtered by destination countries', () => {
      const filters = ['AT', 'BE']
      const rates = serviceTable.destinationCountriesRates(filters)

      expect(rates).toHaveLength(3)
      expect(rates[0].destinationCountries).toHaveLength(2)
      expect(rates[0].sourceCountry).toBe('AT')
      expect(rates[1].sourceCountry).toBe('BE')
    })

    it('should return an 1 elements array of rates filtered by destination countries', () => {
      const filters = ['BG']
      const rates = serviceTable.destinationCountriesRates(filters, mockSecondItem)

      expect(rates).toHaveLength(1)
      expect(rates[0].destinationCountries).toHaveLength(1)
      expect(rates[0].sourceCountry).toBe('BE')
      expect(rates[0].destinationCountries[rates[0].destinationCountries.length - 1].destinationCountry).toBe('BG')
    })

    it('should return an empty array of rates filtered by destination countries', () => {
      const filters = ['CCC']
      const rates = serviceTable.destinationCountriesRates(filters, mockThirdItem)

      expect(rates[0].destinationCountries.length).toBe(0)
    })
  })
})
