import Transaction from '../models/Transaction';
import Balance from '../models/Balance';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface CreateBalanceDTO {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.somaPor(this.transactions, 'income');
    const outcome = this.somaPor(this.transactions, 'outcome');
    const total = income - outcome;

    const balance = new Balance({ income, outcome, total });

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }

  // eslint-disable-next-line class-methods-use-this
  private somaPor(objArray: Transaction[], typeKey: string): number {
    let retorno = 0;
    return objArray.reduce((acc, objAtual) => {
      if (objAtual.type === typeKey) {
        retorno = acc + objAtual.value;
      }

      return retorno;
    }, 0);
  }
}

export default TransactionsRepository;
