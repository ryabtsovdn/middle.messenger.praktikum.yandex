import HTTPTransport from '../utils/http';

export default abstract class BaseAPI {
  protected http: HTTPTransport;

  constructor(pathname: string) {
    this.http = new HTTPTransport(pathname);
  }

  public abstract create?(data: unknown): Promise<unknown>;

  public abstract read?(id?: string): Promise<unknown>;

  public abstract update?(data: unknown, id?: string): Promise<unknown>;

  public abstract delete?(data: unknown, id?: string): Promise<unknown>;
}
