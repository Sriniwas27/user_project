import * as https from 'https';
import axios, { AxiosRequestConfig } from 'axios';
import { Injectable } from '@nestjs/common';
import { LoggerService } from './logger/logger.service';

@Injectable()
export class ApiService {
  constructor(private readonly log: LoggerService) {}
  httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });

  getCall = async (req_id: string, requestConfig: AxiosRequestConfig) => {
    this.log.setLog('info', req_id, ApiService.name, 'getCall', {
      url: requestConfig.url,
      headers: requestConfig.headers,
    });
    try {
      const config = {
        ...requestConfig,
        method: 'get',
        httpsAgent: this.httpsAgent,
      };
      const { data } = await axios(config);
      this.log.setLog(
        'info',
        req_id,
        ApiService.name,
        'getCall - response',
        data,
      );
      return data;
    } catch (err) {
      this.log.setLog('error', req_id, ApiService.name, 'getCall', {
        error: err.message || err.stack,
      });
      return err;
    }
  };

  postCall = async (req_id: string, requestConfig: AxiosRequestConfig) => {
    this.log.setLog('info', req_id, ApiService.name, 'postCall', {
      url: requestConfig.url,
      data: requestConfig.data,
      headers: requestConfig.headers,
    });
    try {
      const config = {
        ...requestConfig,
        method: 'post',
        httpsAgent: this.httpsAgent,
      };
      const response = await axios(config);
      this.log.setLog(
        'info',
        req_id,
        ApiService.name,
        'postCall',
        response.data,
      );
      return response;
    } catch (err) {
      this.log.setLog('error', req_id, ApiService.name, 'postCall', {
        error: err?.response?.data || err?.message,
      });
      return err;
    }
  };

  axiosRetry = async (
    req_id: string,
    requestConfig: AxiosRequestConfig,
    retryCount: number,
    delay: number, // in sec
  ) => {
    this.log.setLog('info', req_id, ApiService.name, 'axiosRetry', {
      url: requestConfig.url,
      data: requestConfig.data,
      headers: requestConfig.headers,
    });

    const retries = retryCount,
      retryDelay = delay * 1000;

    let attempt = 0;

    while (attempt < retries) {
      this.log.setLog('info', req_id, ApiService.name, 'axiosRetry', {
        attempt,
        retries,
      });

      try {
        const response = await axios(requestConfig);
        this.log.setLog(
          'info',
          req_id,
          ApiService.name,
          'axiosRetry',
          response.data,
        );
        return response;
      } catch (error) {
        attempt++;
        this.log.setLog('error', req_id, ApiService.name, 'axiosRetry', {
          error: error.message || error.stack,
        });

        if (attempt >= retries) {
          return error;
        }

        this.log.setLog('error', req_id, ApiService.name, 'axiosRetry', {
          message: `Attempt ${attempt} failed. Retrying in ${retryDelay} ms...`,
        });
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
      }
    }
  };
}
