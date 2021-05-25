import { ErrorHandler, Injectable } from '@angular/core';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService extends ErrorHandler {

  constructor(private loggingService: LoggingService) {
    super();
  }

  handleError(error: Error) {
    this.loggingService.logException(error);
  }
}
