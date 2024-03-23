import { Routes } from '@angular/router';


export const content: Routes = [
  
  {
    path: '', loadChildren: () => import('../../components/admin/admin.module').then(m => m.AdminModule)
  },
  // {
  //   path: 'collectormanager',
  //   // loadChildren: () => import('../../components/collectormanager/collectormanager.module').then(m=> m.CollectormanagerModule)
  //   loadChildren: () => import('../../components/admin/admin.module').then(m => m.AdminModule)

  // },
];
