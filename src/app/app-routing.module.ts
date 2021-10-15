import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandyComponent } from './candy/candy.component';

const routes: Routes = [{ path: '', component: CandyComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
