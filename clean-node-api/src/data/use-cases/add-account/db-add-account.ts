import { AddAccount, AddAccountModel, Encrypter, AccountModel } from "./db-add-accout-protocols";

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter;

  constructor(encrypter: Encrypter) {
    this.encrypter = encrypter;
  }

  async add(account: AddAccountModel): Promise<AccountModel> {
    await this.encrypter.encrypt(account.password);
    return new Promise(resolve => resolve(null));
  }
}