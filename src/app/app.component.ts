import { Component, PLATFORM_ID, Inject, ViewEncapsulation } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { LoadingBarService } from "@ngx-loading-bar/core";
import { map, delay, withLatestFrom } from "rxjs/operators";
import { TranslateService } from "@ngx-translate/core";
import { Router , Event, NavigationStart, NavigationEnd, NavigationError  } from "@angular/router";
export let browserRefresh = false;
export let returnFromWrongRoute = localStorage.getItem('wrongURL');

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  encapsulation: ViewEncapsulation.None

})

export class AppComponent {

  
  // For Progressbar
  loaders = this.loader.progress$.pipe(
    delay(1000),
    withLatestFrom(this.loader.progress$),
    map((v) => v[1])
  );

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private loader: LoadingBarService,
    private router: Router,
    translate: TranslateService
  ) {
    if (isPlatformBrowser(this.platformId)) {
      translate.setDefaultLang("en");
      translate.addLangs(["en", "de", "es", "fr", "pt", "cn", "ae"]);
    }

    router.events.subscribe( (event: Event) => {

      if (event instanceof NavigationStart) {
        browserRefresh = !router.navigated;
        localStorage.setItem('lasturl', event.url + '');
        if(browserRefresh){
        
        }
        }

      if (event instanceof NavigationEnd) {
        // console.log(event.url)
      }

      if (event instanceof NavigationError) {
        // console.log(event.url)
          // console.log(event.error);
      }
  });
  }

  ngOnInit(): void {
  
    if(returnFromWrongRoute){
      this.router.navigate([localStorage.getItem('lasturl')]);
    }

  }
}
