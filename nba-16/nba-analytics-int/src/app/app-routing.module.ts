import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonLeftNavComponent } from './common-left-nav/common-left-nav.component';

const routes: Routes = [
  {
    path: '',
    component: CommonLeftNavComponent
  },
  // {
  //   path: 'analytics',

  //   loadChildren: () => import('./analytics/analytics.module').then(m => m.AnalyticsModule),
  // },

  {
    path:'co-scores',
    loadChildren: () => import('./nba-22-criteria-a/nba-22-criteria-a.module').then(m => m.Nba22CriteriaAModule),
  },

  {
    path: 'nba22',
    loadChildren: () => import('./nba22/nba22.module').then(m => m.Nba22Module),
  },
  {
    path: 'nba23',
    loadChildren: () => import('./nba23/nba23.module').then(m => m.Nba23Module),
  },
  {
    path: 'nba24',
    loadChildren: () => import('./nba24/nba24.module').then(m => m.Nba24Module),
  },
  {
    path: 'nba25',
    loadChildren: () => import('./nba25/nba25.module').then(m => m.Nba25Module),
  },
  {
    path: 'nba26',
    loadChildren: () => import('./nba26/nba26.module').then(m => m.Nba26Module),
  },
  {
    path: 'nba17',
    loadChildren: () => import('./nba17/nba17.module').then(m => m.Nba17Module),
  },
  {
    path: 'nba31',
    loadChildren: () => import('./nba31/nba31.module').then(m => m.Nba31Module),
  },

  {
    path: 'nba16',
    loadChildren: () => import('./nba16/nba16.module').then(m => m.Nba16Module),
  },
  {
    path: 'nba27a',
    loadChildren: () => import('./nba27a/nba27a.module').then(m => m.Nba27aModule),
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
