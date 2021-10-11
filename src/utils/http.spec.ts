import {expect} from 'chai';
import * as sinon from 'sinon';
import {beforeEach} from 'mocha';
import HTTP, {Response} from './http';
import HTTPTransport from './http';

const baseUrl = '/api/v1';
const http = new HTTP(baseUrl);

const xhrMock = sinon.useFakeXMLHttpRequest();
(global as any).XMLHttpRequest = xhrMock;

describe('HTTP', function () {
  let server: sinon.SinonFakeServer;

  beforeEach(() => {
    server = sinon.fakeServer.create();
    server.respondWith(
      new RegExp(`${baseUrl}/(\\d+)`),
      (xhr: sinon.SinonFakeXMLHttpRequest, id?: string) => {
        xhr.respond(Number(id), {}, id || '');
      }
    );
    server.autoRespond = true;
  });

  describe('Request', function () {
    it('Should resolve on 2xx status', async function () {
      const res = await http.request<string>('/200');

      expect(res.status).to.equal(200);
    });

    it('Should reject on status 4xx', async function () {
      try {
        await http.request('/404');
      } catch (e) {
        expect((e as Response).status).to.equal(404);
      }
    });

    it('Should reject on status 5xx', async function () {
      try {
        await http.request('/502');
      } catch (e) {
        expect((e as Response).status).to.equal(502);
      }
    });
  });

  describe('Get', function () {
    it('Should use GET method', async function () {
      await http.get('/200');

      expect(server.requests[0].method).to.equal('GET');
    });

    it('Should stringify data', async function () {
      await http.get('/200', {data: {a: 1, b: 'test'}});

      expect(server.requests[0].url).to.equal(
        `${HTTPTransport.BASE_URL}${baseUrl}/200?a=1&b=test`
      );
    });
  });

  describe('Post', function () {
    it('Should use POST method', async function () {
      await http.post('/200');

      expect(server.requests[0].method).to.equal('POST');
    });
  });

  describe('Put', function () {
    it('Should use PUT method', async function () {
      await http.put('/200');

      expect(server.requests[0].method).to.equal('PUT');
    });
  });

  describe('Patch', function () {
    it('Should use PATCH method', async function () {
      await http.patch('/200');

      expect(server.requests[0].method).to.equal('PATCH');
    });
  });

  describe('Delete', function () {
    it('Should use DELETE method', async function () {
      await http.delete('/200');

      expect(server.requests[0].method).to.equal('DELETE');
    });
  });
});
