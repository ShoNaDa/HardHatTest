module.exports = function () {
    task("send-donat", "Send wei's to the people address")
        .addParam("address", "User address")
        .addParam("amount", "Donation amount")
        .setAction(async (taskArgs) => {
            Donations = await ethers.getContractFactory("Donations");
            hardhatDonations = await Donations.attach('0xE5053342cb1216535577132ecc32006901BCdfFa');

            await hardhatDonations.SendDonat(taskArgs.address, taskArgs.amount);
            console.log(`Пожертвование в размере ${String(taskArgs.amount)} пользователю с адресом
    ${String(taskArgs.address)} успешно завершено`);
        });
};