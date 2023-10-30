import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'auth-confirm-account-page',
  templateUrl: './confirm-account-page.component.html',
  styleUrls: ['./confirm-account-page.component.css']
})
export class ConfirmAccountPageComponent implements OnInit {

  private activatedRoute = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private router = inject(Router);

  public userName: string = '';

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({token}) => this.authService.confirmAccount(token))

      ).subscribe({
        next: (user) => this.userName = user.nombre,
        error: () => this.router.navigateByUrl('/not-found')
      }
      // user => {
      //   if (!user) return console.log('Error');
      //   this.userName = user.nombre;
      //   return;
      // }
      );
  }

}
