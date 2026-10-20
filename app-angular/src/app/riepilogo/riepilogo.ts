import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OrdineService } from '../services/ordine-service';

@Component({
  imports: [RouterLink],
  selector: 'app-riepilogo',
  styleUrl: './riepilogo.css',
  templateUrl: './riepilogo.html',
})
export class Riepilogo {
  readonly ordine = inject(OrdineService);
}