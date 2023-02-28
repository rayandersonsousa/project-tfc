import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Teams from '../database/models/Teams';

import { Response } from 'superagent';
import teamsMock from '../integration/ultils/teamsMoks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes de integração do endpoint /teams', () => {
  beforeEach(() => {
    sinon.restore();
  })
  it('Verifica se é possível buscar por todos os teams', async () => {
    sinon.stub(Teams, 'findAll').resolves(teamsMock as Teams[]);

    const result = await chai.request(app).get('/teams');

    expect(result.status).to.be.eq(200);
    expect(result.body).to.be.deep.equal(teamsMock);
  });
});
