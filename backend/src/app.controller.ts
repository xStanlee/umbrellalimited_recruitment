import { Controller, Get, NotFoundException, Param, Patch, Req } from '@nestjs/common';
import { AppService, Rate, RateResponse } from './app.service';
import { ApiBody, ApiNotFoundResponse, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { Application, Request } from "express";

@ApiTags("Application")
@Controller('')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'Load whole dataset' })
  @Get('/load')
  getData(): JSON {
    return this.appService.getData();
  }

  @ApiOperation({ summary: 'Activate/Deactivate Application' })
  @ApiNotFoundResponse()
  // @ApiOkResponse({type: GetApplicationResponseDto, description: 'Activated or Deactivated Application'})
  @ApiParam({name: 'id', type:'string', required:true})
  @ApiBody({
    type: Rate,
  })
  @Patch('/:id/update/json')
  async setData(
      @Param('id') id: string,
      @Req() req: Request
  ): Promise<RateResponse> {
    try {
      return await this.appService.update(id, req.body);
    } catch (e) {
      console.error('Exception:', e);
      throw new NotFoundException();
    }
  }
}
