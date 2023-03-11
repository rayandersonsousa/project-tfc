import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Users from '../database/models/Users';
import userMock from '../integration/ultils/userMocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes de integração para o endpoint /login', function() {
  afterEach(function() {
    sinon.restore();
  });

  it('Testa se é possível realizar o login de usuário', async function() {
    sinon.stub(Users, 'findOne').resolves(userMock as Users);

    const response = await chai.request(app).post('/login')
      .send({ email: 'user@user.com', password: 'inuyasha'})
    
    expect(response.status).to.be.equal(200);
  });

  it('Testa se não é possível realizar o login sem uma senha', async function() {
    sinon.stub(Users, 'findOne').resolves(userMock as Users);

    const response = await chai.request(app).post('/login')
      .send({ email: 'user@user.com', password: ''})
    
    expect(response.status).to.be.equal(400);
    expect(response.body.message).to.be.deep.equal('All fields must be filled');
  });

  it('Testa se não é possível realizar o login sem um email', async function() {
    sinon.stub(Users, 'findOne').resolves(userMock as Users);

    const response = await chai.request(app).post('/login')
      .send({ email: '', password: 'inuyasha'})
    
    expect(response.status).to.be.equal(400);
    expect(response.body.message).to.be.deep.equal('All fields must be filled');
  });

  it('Testa se não é possível realizar o login com senha inválida', async function() {
    sinon.stub(Users, 'findOne').resolves(userMock as Users);

    const response = await chai.request(app).post('/login')
      .send({ email: 'user@user.com', password: 'inu'})
    
    expect(response.status).to.be.equal(401);
    expect(response.body.message).to.be.deep.equal('Invalid email or password');
  });

  it('Testa se não é possível realizar o login com email inválido', async function() {
    sinon.stub(Users, 'findOne').resolves(userMock as Users);

    const response = await chai.request(app).post('/login')
      .send({ email: 'user@user', password: 'inuyasha'})
    
    expect(response.status).to.be.equal(401);
    expect(response.body.message).to.be.deep.equal('Invalid email or password');
  });
})