import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'restaurantes',
    component: TabsPage,
    children: [
      {
        path: 'lista',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tabs/lista/tab1.module').then(m => m.Tab1PageModule)
          }
        ]
      },
      {
        path: 'cadastro',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tabs/cadastro/tab2.module').then(m => m.Tab2PageModule)
          }
        ]
      },
      {
        path: 'random',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tabs/random/random.module').then(m => m.RandomPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/restaurantes/lista',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/restaurantes/lista',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
