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
        switchMap(({id}) => this.authService.confirmAccount(id))

      ).subscribe({
        next: (user) => this.userName = user.nombre,
        error: () => this.router.navigateByUrl('/auth/register')
      }
      // user => {
      //   if (!user) return console.log('Error');
      //   this.userName = user.nombre;
      //   return;
      // }
      );
  }

}
