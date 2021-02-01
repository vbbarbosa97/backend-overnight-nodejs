import { Controller, Get } from '@overnightjs/core';
import { Beach } from '@src/models/beach';
import { Forecast } from '@src/services/forecast';
import { ESRCH } from 'constants';
import { Request, Response } from 'express';

@Controller('forecast')
export class ForecastController {
  private readonly forecast: Forecast;

  constructor() {
    this.forecast = new Forecast();
  }

  @Get('')
  public async getForecastForLoggedUser(_: Request, res: Response): Promise<void> {
    try {
      const beaches = await Beach.find({});
      const forecastData = await this.forecast.processForecastForBeaches(beaches);
      res.status(200).send(forecastData);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
}
