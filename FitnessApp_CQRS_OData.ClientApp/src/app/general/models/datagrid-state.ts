export class DatagridState {
  page?: {
      from?: number;
      to?: number;
      size?: number;
      current?: number;
  }
  sort?: {
      by: string;
      reverse: boolean;
  };
  filters: any[] = [];
}
