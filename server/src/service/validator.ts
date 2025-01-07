import { Request } from 'express';
import { MAIN_CONFIG } from 'src/config/main.config';

export function validator(request: Request): boolean {
  if (request.headers['check'] !== MAIN_CONFIG.check) {
    return false;
  }
  return true;
}
