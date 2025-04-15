export interface IQueryConfigObject {
  enabled?: boolean;
}

export interface IQueryConfig {
  queryConfig?: IQueryConfigObject;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type MutationResponse = any;

export interface IMutationParams {
  onSuccess?: (response: MutationResponse) => void;
  onError?: (error: Error) => void;
}
