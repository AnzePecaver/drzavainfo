import { Component, OnInit } from '@angular/core';
import { IpService } from '../../services/ip.service';
import { IpInfo } from '../../models/ip-info.model';
import { CommonModule } from '@angular/common';
import { ErrorMessageComponent } from '../error-message/error-message.component';

@Component({
  selector: 'app-ip-display',
  standalone: true,
  imports: [CommonModule, ErrorMessageComponent],
  templateUrl: './ip-display.component.html',
  styleUrls: ['./ip-display.component.css'],
})
export class IpDisplayComponent implements OnInit {
  ipInfo: IpInfo | null = null;
  error: string | null = null

  constructor(private ipService: IpService) {}

  ngOnInit(): void {
    this.fetchIpInfo();
  }

  fetchIpInfo(): void {
    this.ipService.getIpInfo().subscribe({
      next: (data) => {
        this.ipInfo = data;
      },
      error: (error) => {
        const errorMessage = 'Napaka pri pridobivanju IP naslova.'
        this.error = errorMessage
        console.error(errorMessage, error);
      },
    });
  }
}