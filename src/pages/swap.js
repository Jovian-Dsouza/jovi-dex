import { Input, Popover, Radio, Modal, message } from "antd";
import {
  ArrowDownOutlined,
  DownOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import tokenList from "../tokenList.json";

export default function Swap() {
  const [tokenOneAmount, setTokenOneAmount] = useState(null);
  const [tokenTwoAmount, setTokenTwoAmount] = useState(null);
  const [prices, setPrices] = useState();
  const [slippage, setSlippage] = useState(2.5);
  const [tokenOne, setTokenOne] = useState(tokenList[0]);
  const [tokenTwo, setTokenTwo] = useState(tokenList[1]);

  function handleSlippageChange(e) {
    setSlippage(e.target.value);
  }

  function changeAmount(e) {
    console.log(prices, e.target.value);
    setTokenOneAmount(e.target.value);
    if (e.target.value !== "" && prices) {
      setTokenTwoAmount((e.target.value * prices.ratio).toFixed(2));
    } else {
      setTokenTwoAmount(null);
    }
  }

  function switchToken() {
    setPrices(null)
    setTokenOneAmount(null)
    setTokenTwoAmount(null)
    const one = tokenOne;
    const two = tokenTwo;
    setTokenOne(two);
    setTokenTwo(one);
    fetchPrices(two.address, one.address)
  }

  async function fetchPrices(address1, address2) {
    fetch(`/api/tokenPrice?addressOne=${address1}&addressTwo=${address2}`, {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((data) => setPrices(data.usdPrices));
  }

  useEffect(() => {
    fetchPrices(tokenOne.address, tokenTwo.address);
  }, []);

  const settings = (
    <div>
      Slippage Tolerance
      <div>
        <Radio.Group value={slippage} onChange={handleSlippageChange}>
          <Radio.Button value={0.5}>0.5%</Radio.Button>
          <Radio.Button value={2.5}>2.5%</Radio.Button>
          <Radio.Button value={5}>5.0%</Radio.Button>
        </Radio.Group>
      </div>
    </div>
  );

  return (
    // Swap container
    <div className="flex justify-center w-full mt-16">
      {/* Swap box */}
      <div className="flex flex-col justify-start items-start w-[460px] bg-[#0E111B] min-h-[360px] border-2 border-solid border-[#21273a] rounded-[15px] px-[30px]">
        {/* Swap header and settings */}
        <div className="flex items-center justify-between mt-4 mb-4 w-[98%]">
          <h4 className="font-bold">Swap</h4>
          <Popover
            content={settings}
            title="Settings"
            trigger="click"
            placement="bottomRight"
          >
            <SettingOutlined className="text-[#51586f] transition-all duraiton-300 hover:text-white hover:cursor-pointer hover:rotate-90" />
          </Popover>
        </div>

        {/* Price container */}
        <div className="relative">
          <Input
            placeholder="0"
            value={tokenOneAmount}
            onChange={changeAmount}
            disabled={!prices}
            className="bg-red-800"
          ></Input>

          {/* Asset chosing container */}
          <div className="absolute flex items-center justify-center space-x-2 min-w-[50px] h-[30px] top-[36px] right-[20px] pr-2 font-bold text-lg rounded-full bg-[#3a4157] hover:cursor-pointer">
            <img src={tokenOne.img} alt="assetOneLogo" className="w-5 ml-2" />
            <div className="uppercase">{tokenOne.ticker}</div>
            <DownOutlined />
          </div>

          <Input
            placeholder="0"
            value={tokenTwoAmount}
            disabled={true}
            className="bg-red-800"
          ></Input>

          {/* Asset chosing container */}
          <div className="absolute flex items-center justify-center space-x-2 min-w-[50px] h-[30px] top-[135px] right-[20px] pr-2 font-bold text-lg rounded-full bg-[#3a4157] hover:cursor-pointer">
            <img src={tokenTwo.img} alt="assetOneLogo" className="w-5 ml-2" />
            <div className="uppercase">{tokenTwo.ticker}</div>
            <DownOutlined />
          </div>

          {/* Switch arrow */}
          <div
            onClick={switchToken}
            className="absolute flex justify-center items-center top-[86px] left-[180px] 
                          w-7 h-7 bg-[#3a4157] text-[#5F6783] text-sm rounded-md border-[3px]
                          border-[#0E111B] hover:text-white hover:cursor-pointer"
          >
            <ArrowDownOutlined />
          </div>

          {/* Swap button */}
          <div className="flex justify-center items-center mt-2 rounded-xl  h-[55px]   font-bold text-xl">
            <button
              className="w-full h-full rounded-xl hover:cursor-pointer text-[#5981F3] bg-[#243056] hover:bg-[#3b4874] disabled:bg-[#243056] 
                        disabled:opacity-40 disabled:text-[#5982f39b] disabled:hover:bg-[#243056] disabled:hover:cursor-not-allowed transition duration-300"
              disabled={!tokenOneAmount}
            >
              Swap
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
