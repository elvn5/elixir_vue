import type { RouteLocationNormalizedLoaded } from "vue-router";


type IdParams = {
  id:string
}

export type IdRouteParams = RouteLocationNormalizedLoaded & {params: IdParams};
