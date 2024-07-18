export type RouteType = Array<{
  path: string;
  module: any;
  children?: Array<{
    path: string;
    module: any;
  }>;
}>;
