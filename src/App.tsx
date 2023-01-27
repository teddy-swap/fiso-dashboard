import { Avatar, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Pool, QUALIFIED_POOLS, sortedByIdPools as sortPoolsById } from './Pools';

const BLOCKFROST_PROJECT_ID = "mainnetP3r1osidROSxcW9Vas1ywFiRiRkMcDyj";
type Block = {
  height: number
  hash: string
  status: number
}

const TARGET_BLOCK = 8336640;
// 180 blocks = every 1 hour
const TARGET_BLOCK_INTERVAL = 180;
const CHOSEN_POOLS: Pool[] = [];

function App() {

  sortPoolsById();

  const [currentBlockHeight, setCurrentBlockHeight] = useState<number>(0);
  const [currentDateTimeString, setCurrentDateTimeString] = useState<string>(new Date().toUTCString());
  const [choosenPools, setChoosenPools] = useState<Pool[]>(CHOSEN_POOLS);

  const refreshBlockAsync = async () => {
    const blockRequest = await fetch("https://cardano-mainnet.blockfrost.io/api/v0/blocks/latest", {
      headers: {
        project_id: BLOCKFROST_PROJECT_ID
      } as any
    });
    const blockResponse: Block = await blockRequest.json();
    setCurrentBlockHeight(blockResponse.height);
  };

  const refreshResultsAsync = async () => {
    const blockNumber = TARGET_BLOCK + (TARGET_BLOCK_INTERVAL * CHOSEN_POOLS.length);
    try {
      const blockRequest = await fetch(`https://cardano-mainnet.blockfrost.io/api/v0/blocks/${blockNumber}`, {
        headers: {
          project_id: BLOCKFROST_PROJECT_ID
        } as any
      });
      const blockResponse: Block = await blockRequest.json();
      // Map blockhash to pool number
      if (typeof blockResponse.hash === "string") {
        var bn = BigInt('0x' + blockResponse.hash);
        const chosenPool = QUALIFIED_POOLS.at(Number(bn % 103n) - 1) as Pool;

        if (CHOSEN_POOLS.filter(p => !p.invalid).indexOf(chosenPool) !== -1) {
          CHOSEN_POOLS.push({ ticker: "", id: "", invalid: true });
          setChoosenPools(CHOSEN_POOLS.filter(p => p));
          return;
        }

        chosenPool.choosenBlockNo = blockNumber;

        if (CHOSEN_POOLS.indexOf(chosenPool) === -1 && CHOSEN_POOLS.filter(p => !p.invalid).length < 25) {
          CHOSEN_POOLS.push(chosenPool);
          console.log(Number(bn % 103n), chosenPool);
        }

        if (currentBlockHeight <= blockNumber) {
          await refreshResultsAsync();
        }
      }
      setChoosenPools(CHOSEN_POOLS.filter(p => p));
    } catch (ex) {
      console.log(`Error processing ${blockNumber}`, ex);
    }
  };

  useEffect(() => {
    refreshBlockAsync();
    refreshResultsAsync();
  }, [currentDateTimeString]);

  // Update everything every second
  setInterval(() => {
    setCurrentDateTimeString(new Date().toUTCString());
  }, 1000);

  return (
    <div className="App bg-main bg-cover bg-center w-[100vw] h-[100vh] pb-6">
      <main className="container mx-auto">
        <header className="pt-4">
          <div className="flex justify-center lg:justify-start"><img src="teddy-logo.svg" alt="logo" className="w-[200px]" /></div>
          <h1 className="text-[#66A7F2] lg:text-[35px] text-[25px] font-bold">FISO Stake Pools</h1>
          <h2 className="text-[#66A7F2] lg:text-[25px] text-[15px] font-bold">Latest Cardano Block: <b className="text-white">{currentBlockHeight}</b></h2>
        </header>
        <section className="font-medium text-white text-[22px] mt-6">
          <h4>Pools will be chosen based the on block hash as a random seed starting at block: <b>{TARGET_BLOCK}</b>.</h4>
          <Paper elevation={2} sx={{ backgroundColor: "#294F72", color: "#FFF" }} className="mt-8 !rounded-lg py-4 px-6">
            <div className="flex">
              <div>
                <h3 className="mr-4 lg:text-[25px] text-[15px] hidden sm:inline-block align-middle">Choosen Stake Pools</h3>
              </div>
              <div className="flex">
                <div>
                  <div className={`w-[42px] h-[15px] bg-teddy-active rounded-lg inline-block align-middle`}></div>
                </div>
                <div>
                  <div className="ml-2 inline-block align-middle text-[17px]"><span>=</span> Active</div>
                </div>
              </div>
              <div className="flex ml-4">
                <div>
                  <div className={`w-[42px] h-[15px] bg-teddy-reserved rounded-lg inline-block align-middle`}></div>
                </div>
                <div>
                  <div className="ml-2 inline-block align-middle text-[17px]"><span>=</span> Reserve</div>
                </div>
              </div>
            </div>
            <div className="grid lg:grid-cols-7 md:grid-cols-4 grid-cols-2 mt-4 mb-4 gap-4">
              {choosenPools.filter(p => !p.invalid).slice(0, 10).map((pool, i) => {
                return <Paper className="grid grid-cols-2 content-center h-[50px] !bg-teddy-active !rounded-lg p-2 text-[12px] text-center" key={i}>
                  <Avatar alt={pool.ticker} src={`https://ui-avatars.com/api/?name=${pool.ticker}&background=random`} />
                  <div>
                    <div className="font-bold">{pool.ticker}</div>
                    <div className="text-gray-600">#{pool.choosenBlockNo}</div>
                  </div>
                </Paper>
              })}
              {choosenPools.filter(p => !p.invalid).slice(10, 25).map((pool, i) => {
                return <Paper className="grid grid-cols-2 content-center h-[50px] !bg-teddy-reserved !rounded-lg p-2 text-[12px] text-center" key={i}>
                  <Avatar alt={pool.ticker} src={`https://ui-avatars.com/api/?name=${pool.ticker}&background=random`} />
                  <div>
                    <div className="font-bold">{pool.ticker}</div>
                    <div className="text-gray-600">#{pool.choosenBlockNo}</div>
                  </div>
                </Paper>
              })}
              {Array.from({ length: 10 - choosenPools.filter(p => !p.invalid).slice(0, 10).length }, (_, i) => i + 1).map((_, i) => i + 1).map((_, i) => {
                return <Paper className="grid grid-cols-2 content-center h-[50px] !bg-teddy-active !rounded-lg p-2 text-[12px] text-center" key={i}>
                  <Avatar alt="?" src={`https://ui-avatars.com/api/?name=%3F&background=random`} />
                  <div>
                    <div className="font-bold">?</div>
                    <div className="text-gray-600">#?</div>
                  </div>
                </Paper>
              })}
              {Array.from({ length: 15 - choosenPools.filter(p => !p.invalid).slice(10, 25).length }, (_, i) => i + 1).map((_, i) => i + 1).map((_, i) => {
                return <Paper className="grid grid-cols-2 content-center h-[50px] !bg-teddy-reserved !rounded-lg p-2 text-[12px] text-center" key={i}>
                  <Avatar alt="?" src={`https://ui-avatars.com/api/?name=%3F&background=random`} />
                  <div>
                    <div className="font-bold">?</div>
                    <div className="text-gray-600">#?</div>
                  </div>
                </Paper>
              })}
            </div>
          </Paper>
        </section>
        <section className="font-medium text-white text-[22px] mt-6">
          <Paper elevation={2} sx={{ backgroundColor: "#294F72", color: "#FFF" }} className="mt-8 !rounded-lg py-4 px-6">
            <div className="flex">
              <h3 className="mr-4">Qualified Stake Pools</h3>
            </div>
            <div className="grid lg:grid-cols-7 md:grid-cols-4 grid-cols-2 mt-4 mb-4 gap-4">
              {QUALIFIED_POOLS.map((pool, i) => {
                return <Paper className="grid grid-cols-2 content-center h-[50px] !bg-teddy-inactive !rounded-lg p-2 text-[12px] text-center" key={i}>
                  <Avatar className="" alt={pool.ticker} src={`https://ui-avatars.com/api/?name=${pool.ticker}&background=random`} />
                  <div>
                    <div className="font-bold">{pool.ticker}</div>
                    <div className="text-gray-600">#{(i + 1).toString().padStart(4, "0")}</div>
                  </div>
                </Paper>
              })}
            </div>
          </Paper>
        </section>
      </main>
    </div>
  );
}

export default App;
