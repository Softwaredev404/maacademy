import { Injector } from "@angular/core";
import { LayoutService } from "../app/shared/services/layout.service";
var injector = Injector.create([
  { provide: LayoutService, deps: [] },
]);

export const environment = {

  production: true,
  Server_URL: `https://www.maapp.misrpedia.com/public/api`,
  // Server_URL: `https://elmister.eyedebugger.com/public/api`,

};
