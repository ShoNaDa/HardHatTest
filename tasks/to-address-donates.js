module.exports = function () {
    task("to-address-donates", "Get all donates to address")
        .addParam("address", "User address")
        .setAction(async (taskArgs) => {
            Donations = await ethers.getContractFactory("Donations");
            hardhatDonations = await Donations.attach('0xE5053342cb1216535577132ecc32006901BCdfFa');

            console.log(`Общее число пожертвованиё на адрес ${taskArgs.address}: 
    ${await hardhatDonations.GetDonatToAddr(taskArgs.address)}`);
        });
};