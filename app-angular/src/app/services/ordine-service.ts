import { Service, computed, signal } from '@angular/core';
import { Piatto, RigaOrdine } from '../modelli/piatto';

@Service()
export class OrdineService {
  // stato privato: solo il servizio può modificarlo
  private readonly righe = signal<RigaOrdine[]>([]);

  // ciò che i componenti possono leggere
  readonly elenco = this.righe.asReadonly();

  readonly numeroPezzi = computed(() =>
    this.righe().reduce((somma, r) => somma + r.quantita, 0)
  );

  readonly totale = computed(() =>
    this.righe().reduce((somma, r) => somma + r.piatto.prezzo * r.quantita, 0)
  );

  aggiungi(piatto: Piatto): void {
    if (this.trova(piatto.id)) {
      this.righe.update(lista =>
        lista.map(r => (r.piatto.id === piatto.id ? { ...r, quantita: r.quantita + 1 } : r))
      );
    } else {
      this.righe.update(lista => [...lista, { piatto: piatto, quantita: 1 }]);
    }
  }

  rimuovi(idPiatto: number): void {
    this.righe.update(lista => lista.filter(r => r.piatto.id !== idPiatto));
  }

  trova(idPiatto: number): RigaOrdine | undefined {
    return this.righe().find(r => r.piatto.id === idPiatto);
  }

  svuota(): void {
    this.righe.set([]);
  }
}