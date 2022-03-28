module.exports = function () {
    task("balance", "Get the balance at the specified address")
        .addParam("address", "Any address")
        .setAction(async (taskArgs) => {
            Donations = await ethers.getContractFactory("Donations");
            hardhatDonations = await Donations.attach('0xE5053342cb1216535577132ecc32006901BCdfFa');
            provider = waffle.provider;

            console.log(`Баланс: ${Number(await provider.getBalance(taskArgs.address))}`);
        });
};