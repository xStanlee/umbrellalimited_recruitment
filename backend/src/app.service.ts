import { HttpStatus, Injectable, Res } from '@nestjs/common';
import * as BaseData from './data.json';
import { ApiBody, ApiParam } from "@nestjs/swagger";
import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";


export class Rate {
  @ApiProperty()
  id: number
  @ApiProperty()
  sourceCountry: string
  @ApiProperty()
  destinationCountry: string
  @ApiProperty()
  rate: number
}
export class RateResponse {
  @ApiProperty()
  id: number
  @ApiProperty()
  sourceCountry: string
  @ApiProperty()
  destinationCountry: string
  @ApiProperty()
  rate: number
  @ApiProperty()
  error: boolean
  @ApiProperty()
  errorMsg?: string
}

@Injectable()
export class AppService {
  private data = BaseData;

  getData(): any {
    return this.data;
  }

  update(id, newData): any {
    let result = new RateResponse();
    try {
      result = {... result, ...newData}

      id = parseInt(id);

      if (isNaN(id)) {
        result.error = true;
        result.errorMsg = 'Invalid id in query params'
        return result
      }

      if (id !== newData.id) {
        result.error = true;
        result.errorMsg = 'Id mismatch in query params & request body'
        return result
      }

      if (!parseFloat(newData.rate)) {
        result.error = true;
        result.errorMsg = 'Wrong rate format'
        return result
      }

      if (parseFloat(newData.rate) <= 0) {
        result.error = true;
        result.errorMsg = 'Rate must be greater than 0'
        return result
      }

      if (parseFloat(newData.rate) > 100) {
        result.error = true;
        result.errorMsg = 'Rate must be less than 100'
        return result
      }

      let filteredRow = this.data.rates.filter(row => row.sourceCountry === newData.sourceCountry)
      let filteredRate = filteredRow.pop().destinationCountries.filter(rateObj => {
        return rateObj.id === id
      }).pop();

      if (filteredRate) {
        filteredRate.rate = newData.rate.toFixed(2);
        result.rate = filteredRate.rate;
        result.error = false
      } else {
        result.error = true
        result.errorMsg = 'rate not found'
        return result
      }
    } catch (e) {
      console.error('Exception:', e);
      result.error = true;
      result.errorMsg = e.errorMsg
    }
     return result;
  }
}
