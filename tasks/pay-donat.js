module.exports = function () {
    task("pay-donat", "Send wei's to the contract address")
        .addParam("amount", "Donation amount")
        .setAction(async (taskArgs) => {
            Donations = await ethers.getContractFactory("Donations");
            hardhatDonations = await Donations.attach('0xE5053342cb1216535577132ecc32006901BCdfFa');

            await hardhatDonations.PayDonat({ value: taskArgs.amount });
            console.log(`Пожертвование в размере ${String(taskArgs.amount)} успешно завершено`);
        });
};