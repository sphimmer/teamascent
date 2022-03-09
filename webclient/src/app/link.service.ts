import { Injectable } from '@angular/core';
import { Route } from '@angular/router';
import { map, Page, SiteMap } from './sitemap';

@Injectable({
  providedIn: 'root',
})
export class LinkService {
  static siteMap = SiteMap;
  constructor() {}

  getLink(pageName: string): string | null {
    return this.findNestedLink(pageName, LinkService.siteMap);
  }

  private findNestedLink(pageName: string, pages: map<Page>): string | null {
    if (pageName in pages) {
      return '/' + pages[pageName].path;
    } else {
      for (const key in pages) {
        const children = pages[key].children;
        if (children) {
          const path = this.findNestedLink(pageName, children);
          if (path) {
            return '/' + pages[key].path + path;
          } else {
            continue;
          }
        }
      }
      return null;
    }
  }

  static getRouterConfig(
    routeName: string = '',
    pages: map<Page> = LinkService.siteMap
  ): Route {
    if (routeName in pages) {
      const route: Route = LinkService.convertPageToRoute(pages[routeName]);
      return route;
    } else {
      throw Error('Route not found');
    }
  }

  static convertPageToRoute(page: Page): Route {
    const route: Route = {};
    route.path = page.path;
    route.component = page.component;
    route.canActivate = page.canActivate;
    const children = page.children;
    route.children = [];
    if (children) {
      for (const key in children) {
        route.children?.push(this.convertPageToRoute(children[key]));
      }
    }
    return route;
  }
}
