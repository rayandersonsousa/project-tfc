import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { matches, finishedMatches, newMatch, outputMatch } from '../integration/ultils/macthMock';
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

  it('Testa se é possível requisitar as matches em progresso', async function () {
    sinon.stub(Matches, 'findAll').resolves(matches as unknown as IMatch[]);

    const response = await chai.request(app).get('/matches?inProgress=true');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(matches);
  })

  it('Testa se é possível requisitar as matches que já terminaram', async function() {
    sinon.stub(Matches, 'findAll').resolves(finishedMatches as unknown as IMatch[]);

    const response = await chai.request(app).get('/matches?inProgress=false');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(finishedMatches);
  })

  it('Testa se é possível atualizar uma partida em andamento', async function() {
    const loginData = { email: 'user@user.com', password: 'secret_user' };
    const uLogin = await chai.request(app).post('/login').send(loginData);

    expect(uLogin.body.token).to.not.be.empty;

    const token:string = uLogin.body.token;
    
    sinon.stub(Matches, 'update').resolves()

    const response = await chai.request(app).patch('matches/1/finish').set('authorization', token)

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal({ message: 'Daijoubu' });
  })

  it('Testa se é possível cadastrar uma nova partida', async function() {
    const loginData = { email: 'user@user.com', password: 'secret_user' };
    const uLogin = await chai.request(app).post('/login').send(loginData);

    expect(uLogin.body.token).to.not.be.empty;

    const token:string = uLogin.body.token;

    sinon.stub(Matches, 'create').resolves(outputMatch as unknown as IMatch)

    const response = await chai.request(app).post('/matches').send(newMatch).set('authorization', token)

    expect(response.status).to.be.equal(201);
    expect(response.body).to.be.deep.equal(outputMatch);
  })
})