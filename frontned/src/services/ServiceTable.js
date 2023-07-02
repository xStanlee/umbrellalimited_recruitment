import Swal from 'sweetalert2';

export class ServiceTable {
  #sourcesCountries
  #sourcesRates
  
  static async initializeRecords() {
    try {
      const response = await fetch('http://localhost:3001/api/load');
      return new ServiceTable(await response.json());
    } catch (e) {
      Swal.fire({
        title: 'Error',
        text: e.message,
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }
  }

  constructor(data) {
    this.#setSourceCountries(data.sourceCountries);
    this.#setRates(data.rates);
  }

  get records () {
    return this.#sourcesCountries;
  }

  get rates () {
    return this.#sourcesRates;
  }

  #setSourceCountries(sourceCountries) {
    this.#sourcesCountries = sourceCountries;
  }

  #setRates(rates) {
    this.#sourcesRates = rates;
  }
}

// export Singleton
export const serviceTable = await ServiceTable.initializeRecords();
