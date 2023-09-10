import { Encrypter } from "../../protocols/encrypter";
import { DbAddAccount } from "./db-add-account";

interface SutTypes {
  sut: DbAddAccount;
  encrypterStup: Encrypter;
}

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt(value: string): Promise<string> {
      return new Promise(resolve => resolve('hashed_password'));
    }
  }
  return new EncrypterStub()
}

const makeSut = (): SutTypes => {

  const encrypterStup = makeEncrypter()
  const sut = new DbAddAccount(encrypterStup);

  return {
    sut,
    encrypterStup,
  }
}

describe('DbAddAccount UseCase', () => {
  test('Should call Encrypter with correct password', async () => {
    const { encrypterStup, sut } = makeSut();
    const encryptSpy = jest.spyOn(encrypterStup, 'encrypt');
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password',
    }

    await sut.add(accountData);
    expect(encryptSpy).toHaveBeenCalledWith('valid_password');
  });
  test('Should throw if Encrypter throws', async () => {
    const { encrypterStup, sut } = makeSut();
    jest.spyOn(encrypterStup, 'encrypt').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())));
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password',
    }

    const promise = sut.add(accountData);
    await expect(promise).rejects.toThrow();
  });
});