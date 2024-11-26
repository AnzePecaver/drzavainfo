import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IpInfo } from "../models/ip-info.model";

@Injectable({
    providedIn: 'root'
})
export class IpService {
    constructor (private http: HttpClient) {

    }

    getIpInfo(): Observable<IpInfo> {
        return this.http.get<IpInfo>('/naloga/api/task/get-ip');
    }
}