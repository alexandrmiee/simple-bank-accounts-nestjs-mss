import { Observable } from "rxjs";
import { Account, Balance } from "./account.types";

export interface CommissionQuery {
  account: Account;
  amount: Balance;
}

export interface CommissionService {
  getCommission(data: CommissionQuery): Observable<Balance>;
}
