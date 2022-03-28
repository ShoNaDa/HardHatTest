const { expect } = require("chai");
const { ethers, waffle } = require("hardhat");

describe("Donations contract", function () {
  //деплой контракта 
  let Donations, hardhatDonations, provider, owner, adr1, adr2;
  before(async function () {
    Donations = await ethers.getContractFactory("Donations");
    hardhatDonations = await Donations.deploy();

    provider = waffle.provider;
    [owner, adr1, adr2] = await ethers.getSigners();
  });

  describe("PayDonat()", function () {
    it("Weis are credited to the contract balance, weis are withdrawn from the user's balance", async function () {
      //начальный баланс контракта
      const balanceContract = await provider.getBalance(hardhatDonations.address);

      //функция пожертвования msg.value на счет контракта
      await hardhatDonations.PayDonat({ value: 65 });

      //проверяем увеличился ли баланс контракта на msg.value
      expect(65 + Number(balanceContract)).to.equal(await provider.getBalance(hardhatDonations.address));
    });

    it("Adding values to an array", async function () {
      await hardhatDonations.connect(adr1).PayDonat({ value: 65 });
      //т.к. функция с этого адреса вызвана первый раз, то этот пользователь жертвует впервые, проверяем, что значения добавились
      let firstDonat = String(await hardhatDonations.donationsForContract(1)).split(',')[1].trim();

      expect(65).to.equal(Number(firstDonat));

      //если пользователь с таким адресом уже отправлял пожертвование, то проверяем какая сумма уже была
      await hardhatDonations.connect(adr1).PayDonat({ value: 65 });
      let secondDonat = String(await hardhatDonations.donationsForContract(1)).split(',')[1].trim();
      
      //после того, как он отправил снова, проверяем - прибавилось ли значение
      expect(Number(firstDonat) + 65).to.equal(Number(secondDonat));
    });
  });

  describe("SendDonat()", function () {
    it("The contract creator transfers the donation", async function () {
      //проверяем, что функцию вызывает именно создатель контракта
      await expect(hardhatDonations.connect(adr2).SendDonat(adr1.address, 55)).to.be.revertedWith("You must be the creator of the contract");
      //проверяем, что на балансе контракта больше заявленного пожертвования
      await expect(hardhatDonations.SendDonat(adr1.address, 1000)).to.be.revertedWith("Contract haven't money");

      //начальный баланс пользователя
      const balanceAdr1 = await provider.getBalance(adr1.address);

      //функция пожертвования money на счет пользователя со счета создателя контракта
      await hardhatDonations.SendDonat(adr1.address, 55);

      //проверяем увеличился ли баланс пользователя на money
      expect(55 + Number(balanceAdr1)).to.equal(Number(await provider.getBalance(adr1.address)));
    });

    it("Mapping donationsForUser was update", async function () {
      //начальное количество пожертвований пользователю в mapping
      const moneyOfAdr1 = await hardhatDonations.donationsForUser(adr1.address);

      await hardhatDonations.SendDonat(adr1.address, 1);

      //проверяем увеличилоль ли количество пожертвований пользователю в mapping
      expect(1 + Number(moneyOfAdr1)).to.equal(await hardhatDonations.donationsForUser(adr1.address));
    });
  });
});