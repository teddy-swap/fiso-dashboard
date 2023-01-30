import { Avatar, Paper } from '@mui/material';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Pool, QUALIFIED_POOLS, sortedByIdPools as sortPoolsById } from './Pools';

type Block = {
  block_height: number
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
    const blockRequest = await fetch("https://api.koios.rest/api/v0/blocks?offset=0&limit=1");
    const blockResponse: Block[] = await blockRequest.json();
    if (blockResponse.length > 0)
      setCurrentBlockHeight(blockResponse[0].block_height);
  };

  useEffect(() => {
    refreshBlockAsync();
  }, [currentDateTimeString]);

  useEffect(() => {
    const refreshResultsAsync = async () => {
      const blockNumber = TARGET_BLOCK + (TARGET_BLOCK_INTERVAL * CHOSEN_POOLS.length);
      if (currentBlockHeight < blockNumber) return;
      try {
        const blockRequest = await fetch(`https://api.koios.rest/api/v0/blocks?block_height=eq.${blockNumber}`);
        const blocksResponse: Block[] = await blockRequest.json();
        const blockResponse: Block = blocksResponse[0];
        // Map blockhash to pool number
        if (typeof blockResponse.hash === "string") {
          var bn = BigInt('0x' + blockResponse.hash);
          const chosenPool = QUALIFIED_POOLS.at(Number(bn % 102n)) as Pool;

          if (CHOSEN_POOLS.filter(p => !p.invalid).indexOf(chosenPool) !== -1) {
            CHOSEN_POOLS.push({ ticker: "", id: "", invalid: true });
          }
          else {
            chosenPool.choosenBlockNo = blockNumber;

            if (CHOSEN_POOLS.indexOf(chosenPool) === -1 && CHOSEN_POOLS.filter(p => !p.invalid).length < 25) {
              console.log(Number(bn % 102n), chosenPool);
              CHOSEN_POOLS.push(chosenPool);
            }
          }

          if (currentBlockHeight >= blockNumber && CHOSEN_POOLS.filter(p => !p.invalid).length < 25) {
            await refreshResultsAsync();
          }
        }
      } catch (ex) {
        console.log(`Error processing ${blockNumber}`, ex);
      }
      setChoosenPools(CHOSEN_POOLS.filter(p => p));
    };
    refreshResultsAsync();
  }, [currentBlockHeight]);

  setInterval(() => {
    setCurrentDateTimeString(new Date().toUTCString());
  }, 40000);

  const nextResultBlock = TARGET_BLOCK + (TARGET_BLOCK_INTERVAL * CHOSEN_POOLS.length);
  const blocksRemaining = nextResultBlock - currentBlockHeight;
  const secondsRemaining = blocksRemaining * 20;
  const timeRemaining = moment().add(secondsRemaining, "seconds").fromNow();
  console.log(timeRemaining);
  return (
    <div className="App bg-main bg-cover bg-center w-[100vw] h-[100vh] pb-6">
      <main className="container mx-auto">
        <header className="pt-4">
          <div className="flex justify-center lg:justify-start"><img src="teddy-logo.svg" alt="logo" className="w-[200px]" /></div>
          <h1 className="text-[#66A7F2] lg:text-[35px] text-[25px] font-bold">FISO Stake Pools</h1>
          <h2 className="text-[#66A7F2] lg:text-[25px] text-[15px] font-bold">Latest Cardano Block: <b className="text-white">{currentBlockHeight}</b></h2>
        </header>
        <section className="font-medium text-white text-[22px] mt-6">
          <h4>Pools will be selected using the block hash as a random seed, next pool choosen at block <b>{TARGET_BLOCK + (TARGET_BLOCK_INTERVAL * CHOSEN_POOLS.length)}</b>. <br /> Next pool will be selected <b>{timeRemaining}</b>. One pool will be selected per 180 blocks (1 hour) until all 25 stake pools are selected. <br /> <br />
            <span className="text-gray-300 text-[15px]">The selection process will be based on a cyclic division of the block hash using the modulo operator. The resulting number will be used to index into an array of qualified pools, which is ordered based on their pool id (which is a hash) and sorted. This ensures that the selection of pools is random and unbiased, and provides a way to periodically update the set of chosen pools. Furthermore, by ordering the pools based on their pool id, it ensures that there is a deterministic ordering of the pools, which can be useful for debugging or auditing purposes. In case a block hash results in a number that maps to a pool that has already been chosen, the block will be skipped, and the next block will be used based on the predetermined interval. This will ensure that the final set of chosen pools is unique, and no pool is chosen more than once.</span></h4>
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
