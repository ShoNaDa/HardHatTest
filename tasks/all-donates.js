module.exports = function () {
    task("all-donates", "Get all donates to contract")
        .setAction(async () => {
            Donations = await ethers.getContractFactory("Donations");
            hardhatDonations = await Donations.attach('0xE5053342cb1216535577132ecc32006901BCdfFa');

            console.log(`Адреса и их пожертвования на адрес контракта: 
    ${await hardhatDonations.GetAllDonatToCont()}`);
        });
};