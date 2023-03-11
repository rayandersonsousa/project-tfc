import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import matches from '../integration/ultils/macthMock';
import Matches from '../database/models/Matches';
import { IMatch } from '../interfaces/IMatch';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes de integração do endpoit /matches', function() {
  afterEach(function () {
    sinon.restore();
  });

  it('Testa se é possível requisitar todas as matches', async function() {
    sinon.stub(Matches, 'findAll').resolves(matches as unknown as IMatch[]);

    const response = await chai.request(app).get('/matches');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(matches);
  })
})