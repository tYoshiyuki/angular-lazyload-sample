import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationError, NavigationStart, Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-lazyload-sample';
  readonly key = 'replace';

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe(x => {
      if (x instanceof NavigationStart) {
        console.log('NavigationStart');
      }

      if (x instanceof NavigationEnd) {
        console.log('NavigationEnd');
        localStorage.removeItem(this.key);
      }

      // 遅延ロードエラー時には、NavigationError が発生します。
      if (x instanceof NavigationError) {
        console.log('NavigationError');

        // 遅延ロードエラー時のリトライ処理サンプルです。
        const chunkFailedMessage = /Loading chunk [\d]+ failed/;
        if (chunkFailedMessage.test(x.error.message)) {
          const replaceCounter = JSON.parse(localStorage.getItem(this.key) ?? JSON.stringify({ count: 0})) as ReplaceCounter;
          if (replaceCounter.count < 3) {
            replaceCounter.count += 1;
            localStorage.setItem(this.key, JSON.stringify(replaceCounter));
            window.location.replace(x.url);
          }
        }
      }
      console.log(x);
    });
  }
}

interface ReplaceCounter {
  count: number;
}
