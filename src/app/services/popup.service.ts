import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  private popupSubject = new BehaviorSubject<{ message: string, visible: boolean }>({ message: '', visible: false });
  popupState$ = this.popupSubject.asObservable();

  showPopup(message: string) {
    this.popupSubject.next({ message, visible: true });
  }

  hidePopup() {
    this.popupSubject.next({ message: '', visible: false });
  }
}
