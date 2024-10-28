import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent implements OnInit {
  constructor() {}

  scrollTo(target: string): void {
    const found = document.getElementById(target);
    if (found) {
      found.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  contactInfo(): void {
    Swal.fire({
      title: '¡Aquí puedes encontrarnos!',
      html: `<p><b>Juan Esteban Álvarez: </b></p>
              <ul style="list-style-type:none;">
                <li>+57 300 5628702</li>
                <li>juanalvarezgcl&#64;gmail.com</li>
                <li>&#8193 </li>
              </ul>
              <p><b>Cesar Alejandro Avellaneda: </b></p>
              <ul style="list-style-type:none;">
                <li>+57 313 2856036</li>
                <li>c.avellanedac&#64;uniandes.edu.co</li>
                <li>&#8193 </li>
              </ul>
              <p><b>Daniela Torres: </b></p>
              <ul style="list-style-type:none;">
                <li>+57 314 2988894</li>
                <li>d.torrest2&#64;uniandes.edu.co</li>
                <li>&#8193 </li>
              </ul>`,
      icon: 'info',
      confirmButtonText: 'Cerrar',
    });
  }

  ngOnInit() {}
}
