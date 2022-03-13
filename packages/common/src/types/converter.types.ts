import { Observable } from "rxjs";
import { Balance } from "./account.types";

export interface ConvertQuery {
  from: Balance;
  to: Balance;
}

export interface ConvertResult {
  requestedAmount: Balance;
  resultedAmount: Balance;
}

export interface ConverterService {
  convert(data: ConvertQuery): Observable<ConvertResult>;
}
