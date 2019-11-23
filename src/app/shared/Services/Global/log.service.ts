import { Injectable } from '@angular/core';
import {LogPublisherService} from './log-publisher.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, concatMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { JSON_SERVER_URLS } from '../../config';
export enum LogLevel {
  All = 0,
  Debug = 1,
  Info = 2,
  Warn = 3,
  Error = 4,
  Fatal = 5,
  Off = 6
}
class LogPublisherConfig {
  loggerName: string;
  loggerLocation: string;
  isActive: boolean;
}
const LOGS_URL = environment.JSONSERVER + JSON_SERVER_URLS.LOGS;
@Injectable({
  providedIn: 'root'
})
export class LogService {
  url='http://localhost:3000/logs';
  level: LogLevel = LogLevel.All;
  logWithDate = true;
  private publisher ;
  constructor(private logPublisher:  LogPublisherService,private http:HttpClient) {
    this.publisher = this.logPublisher.getPublisher();
  }
  debug(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Debug, optionalParams);
  }

  info(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Info, optionalParams);
  }

  warn(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Warn, optionalParams);
  }

  error(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Error, optionalParams);
  }

  fatal(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Fatal, optionalParams);
  }

  log(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.All, optionalParams);
  }

  private writeToLog(msg: string, level: LogLevel, params: any[]) {
    let newObject;
    let newUsers;
    let currentData;

    if (this.shouldLog(level)) {
      const entry: LogEntry = new LogEntry();
      entry.message = msg;
      entry.level = level;
      entry.extraInfo = params;
      entry.logWithDate = this.logWithDate;
      this.publisher[1].log(entry.buildLogString());
     this.http.post(LOGS_URL,entry);
     
    }
   
  }
  private shouldLog(level: LogLevel): boolean {
    let ret = false;
    if ((level >= this.level && level !== LogLevel.Off) || this.level === LogLevel.All) {
      ret = true;
    }
    return ret;
  }
}
export class LogEntry {
  // Public Properties
  entryDate: Date = new Date();
  message = '';
  level: LogLevel = LogLevel.Debug;
  extraInfo: any[] = [];
  logWithDate = true;
  id:number;
  buildLogString(): string {
    let ret = '';

    if (this.logWithDate) {
      ret = new Date() + ' - ';
    }
    ret += 'Type: ' + LogLevel[this.level];
    ret += ' - Message: ' + this.message;
    if (this.extraInfo.length) {
      ret += ' - Extra Info: ' + this.formatParams(this.extraInfo);
    }

    return ret;
  }

  private formatParams(params: any[]): string {
    let ret: string = params.join(',');

    // Is there at least one object in the array?
    if (params.some(p => typeof p === 'object')) {
      ret = '';
      // Build comma-delimited string
      for (const item of params) {
        ret += JSON.stringify(item) + ',';
      }
    }

    return ret;
  }
}
