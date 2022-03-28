pragma solidity >=0.7.0 <0.9.0;
pragma experimental ABIEncoderV2; //новый экспериментальный кодер ABI:)

contract Donations {
    address mainAdr;

    struct Donation {
        address adr;
        uint256 money;
    }
    Donation[] public donationsForContract;

    mapping(address => uint256) public donationsForUser;

    constructor() {
        mainAdr = msg.sender;
    }

    //пожертвование прописанной суммы
    function PayDonat() public payable {
        bool isOk = false;
        for (uint256 i = 0; i < donationsForContract.length; i++) {
            if (donationsForContract[i].adr == msg.sender) {
                donationsForContract[i].money += msg.value;
                isOk = true;
                break;
            }
        }
        if (!isOk) {
            donationsForContract.push(Donation(msg.sender, msg.value));
        }
    }

    //создатель контракта отправляет деньги
    function SendDonat(address _adr, uint256 money) public payable {
        require(
            msg.sender == mainAdr,
            "You must be the creator of the contract"
        );
        require(address(this).balance >= money, "Contract haven't money");

        payable(_adr).transfer(money);

        donationsForUser[_adr] += money;
    }

    //получить все пожертвования в адрес контракта
    function GetAllDonatToCont() public view returns (Donation[] memory) {
        return donationsForContract;
    }

    //получить все пожертвования по адресу от создателя контракта
    function GetDonatToAddr(address _adr) public view returns (uint256) {
        return donationsForUser[_adr];
    }
}
