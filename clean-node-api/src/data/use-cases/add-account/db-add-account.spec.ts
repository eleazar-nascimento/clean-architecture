import { DbAddAccount } from "./db-add-account";

describe('DbAddAccount UseCase', () => {
  test('Should call Encrypter with correct password', async () => {
    class EncrypterStub {
      async encrypt(value: string): Promise<string> {
        return new Promise(resolve => resolve('hashed_password'));
      }
    }
    const encryptStup = new EncrypterStub()
    const sut = new DbAddAccount(encryptStup);
    const encryptSpy = jest.spyOn(encryptStup, 'encrypt');
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password',
    }

    await sut.add(accountData);
    expect(encryptSpy).toHaveBeenCalledWith('valid_password');
  });
});