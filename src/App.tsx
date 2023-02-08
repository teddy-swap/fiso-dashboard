import { Alert, Avatar, Badge, Button, Card, CardContent, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Snackbar, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { Pool, QUALIFIED_POOLS, sortedByIdPools as sortPoolsById } from './Pools';
import JSConfetti from 'js-confetti';
import { Close, ConfirmationNumber, Info, Loop, Wallet, WalletTwoTone, WallpaperTwoTone } from '@mui/icons-material';
import { Blockfrost, Lucid } from 'lucid-cardano';

const jsConfetti = new JSConfetti();
let isFirstLoad = false;

let callback: () => void | null;

type Block = {
  block_height: number
  hash: string
  status: number
}

type BlockHouseResponse = {
  pooldata: BlockHousePoolData[],
  fiso_stats: BlockHouseFisoStats
}

type BlockHouseFisoStats = {
  total_stake: string
  total_delegators: number
  total_growth_live: string
  total_growth_last_hour: string
  total_growth_last_day: string
  total_growth_full: string
  stake_to_unlock_reserve_pools: string
}

type BlockHousePoolData = {
  ticker: string
  name: string
  delegators: number
  live_stake: string
  fixed_fee: number
  margin: string
  block_count: number
}

type Wallet = {
  apiVersion: string;
  icon: string;
  name: string;
  id: string;
}

const TARGET_BLOCK = 8336640;
// 180 blocks = every 1 hour
const TARGET_BLOCK_INTERVAL = 180;
const CHOSEN_POOLS: Pool[] = [
  {
    "ticker": "RABIT",
    "id": "9fa14b049b735e287da702a2b0a7c2a6612e81db9cc4284339a6a2f1",
    "choosenBlockNo": 8336640,
    "idBech32": "pool1n7s5kpymwd0zsld8q23tpf7z5esjaqwmnnzzssee5630zpx5ww0",
    "homepage": "https://rabbitholepools.io"
  },
  {
    "ticker": "FUNGI",
    "id": "9dcb2a0398835a6b0a71dd5bbaa0d6bb961276aedd72f2655c7879d0",
    "choosenBlockNo": 8336820,
    "idBech32": "pool1nh9j5qucsddxkzn3m4dm4gxkhwtpya4wm4e0ye2u0puaqgkcm65",
    "homepage": "https://fungi-pool.com"
  },
  {
    "ticker": "ADAR",
    "id": "f0e3c8d48efb750cdf256b68babc880787bc688972acfbbee1ffc537",
    "choosenBlockNo": 8337000,
    "idBech32": "pool17r3u34ywld6sehe9dd5t40ygq7rmc6yfw2k0h0hpllznwlmwsnn",
    "homepage": "https://adarewards.org"
  },
  {
    "ticker": "PIADA",
    "id": "b8d8742c7b7b512468448429c776b3b0f824cef460db61aa1d24bc65",
    "choosenBlockNo": 8337180,
    "idBech32": "pool1hrv8gtrm0dgjg6zyss5uwa4nkruzfnh5vrdkr2sayj7x2nw6mjc",
    "homepage": "https://piada.io/"
  },
  {
    "ticker": "ADAHS",
    "id": "5201765589793cc9a04d8f378bc85125ec0ef7bf70beb84d01692c82",
    "choosenBlockNo": 8337360,
    "idBech32": "pool12gqhv4vf0y7vngzd3umchjz3yhkqaaalwzltsngpdykgyud5rhz",
    "homepage": "https://the.adahou.se"
  },
  {
    "ticker": "LSS",
    "id": "4d470d31f80c01d797996b43abdfe7339ae5b408fb31cc655a80ccd7",
    "choosenBlockNo": 8337540,
    "idBech32": "pool1f4rs6v0cpsqa09ueddp6hhl8xwdwtdqglvcuce26srxdwmzxl6v",
    "homepage": "https://longshortsignal.com/cardanopool"
  },
  {
    "ticker": "ARM1",
    "id": "a2ccd8e93f5a518d4400790cb081673e79ed41e4bf1132f740f26a28",
    "choosenBlockNo": 8337720,
    "idBech32": "pool15txd36fltfgc63qq0yxtpqt88eu76s0yhugn9a6q7f4zspq6k5f",
    "homepage": "https://www.armadastakepool.com"
  },
  {
    "ticker": "CBH",
    "id": "c4039f4fa97ed735b884800d6d605dbc65fbe995c4ba70b532e162a2",
    "choosenBlockNo": 8337900,
    "idBech32": "pool1cspe7naf0mtntwyysqxk6czah3jlh6v4cja8pdfju932yxsehnm",
    "homepage": "https://cardano-blockhouse.de/"
  },
  {
    "ticker": "AAATO",
    "id": "96cd4a3a846cad3a99b43a3632990ba2eba9a2153f736f78ab2ab3e1",
    "choosenBlockNo": 8338080,
    "idBech32": "pool1jmx55w5ydjkn4xd58gmr9xgt5t46ngs48aek779t92e7zcqfw97",
    "homepage": "https://www.cryptovios.com/stake/ada/"
  },
  {
    "ticker": "VROOM",
    "id": "138031b823a08dec4535e583ca8ea91530abd9c62b1c0b768fd1f834",
    "choosenBlockNo": 8338260,
    "idBech32": "pool1zwqrrwpr5zx7c3f4ukpu4r4fz5c2hkwx9vwqka5068urgqvpjzr",
    "homepage": "https://carpoolcrypto.com/"
  },
  {
    "ticker": "CAKE",
    "id": "b31af8dc07b05f799805f82853f69dd8d9de48bb89f4371bc46f5cc9",
    "choosenBlockNo": 8338440,
    "idBech32": "pool1kvd03hq8kp0hnxq9lq598a5amrvauj9m386rwx7ydawvjdskwnh",
    "homepage": "https://stakeforcake.com"
  },
  {
    "ticker": "DOTAR",
    "id": "7cd510133850b195b1f989bc96c88d86203fe574806eaba169c78d41",
    "choosenBlockNo": 8338620,
    "idBech32": "pool10n23qyec2zcetv0e3x7fdjydscsrlet5sph2hgtfc7x5ze56jqn",
    "homepage": "https://dotare.io"
  },
  {
    "ticker": "RTIST",
    "id": "0df0f6e5a3191520aa0a58268c38fe608d1d931766fc006635f3f2b1",
    "choosenBlockNo": 8338800,
    "idBech32": "pool1phc0dedrry2jp2s2tqngcw87vzx3mychvm7qqe3470etzsf3ph7",
    "homepage": "https://rtistpool.carrd.co/"
  },
  {
    "ticker": "TRUST",
    "id": "b42ea10739065e30e388d4781a7f5a446c3a31343c87dcf26750f83d",
    "choosenBlockNo": 8338980,
    "idBech32": "pool1ksh2zpeeqe0rpcug63up5l66g3kr5vf58jraeun82rur6m4g6xz",
    "homepage": "https://adatrust.space"
  },
  {
    "ticker": "CBFR",
    "id": "d6095a71081323dbc614d974f6159c37cd5f4133c8830172f877ca51",
    "choosenBlockNo": 8339160,
    "idBech32": "pool16cy45uggzv3ah3s5m960v9vuxlx47sfnezpszuhcwl99z7nq8kq",
    "homepage": "https://cardanoblockchain.fr/staking/"
  },
  {
    "ticker": "NANI",
    "id": "d0deba25ce9e6ff59af7f39305fce373241156616cdf0a49b1d49e48",
    "choosenBlockNo": 8339340,
    "idBech32": "pool16r0t5fwwnehltxhh7wfstl8rwvjpz4npdn0s5jd36j0ysflw7ef",
    "homepage": "https://nanipool.com"
  },
  {
    "ticker": "AGC",
    "id": "f04fd2e69f967986b370fe95dd6bc4f7dce314c270a5cfbb9e6a540f",
    "choosenBlockNo": 8339700,
    "idBech32": "pool17p8a9e5ljeucdvmsl62a667y7lwwx9xzwzjulwu7df2q7854mh4",
    "homepage": "http://argyroscrypto.com"
  },
  {
    "ticker": "SAGAN",
    "id": "387c1f515894d2511d1e791161e69882ddb427ab1701b7af719a8c9f",
    "choosenBlockNo": 8339880,
    "idBech32": "pool18p7p752cjnf9z8g70ygkre5cstwmgfatzuqm0tm3n2xf739j8k8",
    "homepage": "https://www.saganpool.com"
  },
  {
    "ticker": "RSV",
    "id": "1be0613ee44270f56b5fbb71f667528e1d877d77d349dd7324d50869",
    "choosenBlockNo": 8340060,
    "idBech32": "pool1r0sxz0hygfc0266lhdclve6j3cwcwlth6dya6uey65yxjnwm7qc",
    "homepage": "https://reservoir.network"
  },
  {
    "ticker": "TREK",
    "id": "c6c0117e031cb813891a07439188fa3f3556fd7ee318d80a03d50fb6",
    "choosenBlockNo": 8340240,
    "idBech32": "pool1cmqpzlsrrjup8zg6qaperz868u64dlt7uvvdszsr658mvzz9qq0",
    "homepage": "https://stakeTREK.io"
  },
  {
    "ticker": "LTES",
    "id": "86d56db6754947d5c6dfd788568c189cc188d448aa6bc4ee634f655a",
    "choosenBlockNo": 8340420,
    "idBech32": "pool1sm2kmdn4f9rat3kl67y9drqcnnqc34zg4f4ufmnrfaj45gcv89d",
    "homepage": "https://let-them-eat-stake.com"
  },
  {
    "ticker": "DDOS",
    "id": "a59e2c8422ed40242742f3b6e8219fa0c454eaa7288d71981d3b65a9",
    "choosenBlockNo": 8340600,
    "idBech32": "pool15k0zeppza4qzgf6z7wmwsgvl5rz9f6489zxhrxqa8dj6jzju6ct",
    "homepage": "https://www.ddos.design/"
  },
  {
    "ticker": "ATM",
    "id": "003da6afe37eca8d1bec9a040a51f23eb085c3e1b924948a214067e7",
    "choosenBlockNo": 8340780,
    "idBech32": "pool1qq76dtlr0m9g6xlvngzq550j86cgtslphyjffz3pgpn7wazatdc",
    "homepage": "https://atmstakepool.com"
  },
  {
    "ticker": "KORA",
    "id": "d81407a659b5a9f59e4ab0c644d06c71a82afe9f78f5d4def27ed685",
    "choosenBlockNo": 8340960,
    "idBech32": "pool1mq2q0fjekk5lt8j2krryf5rvwx5z4l5l0r6afhhj0mtg23ylyuk",
    "homepage": "https://koralabs.io"
  },
  {
    "ticker": "MYLO",
    "id": "90e719ff625d4652a6f41568f9cdc0c8ddf90a7556929b4d30298e8c",
    "choosenBlockNo": 8341140,
    "idBech32": "pool1jrn3nlmzt4r99fh5z450nnwqerwljzn426ffknfs9x8gcqgffst",
    "homepage": "https://mylo.farm"
  }
];

setInterval(() => {
  if (callback != null)
    callback();
}, 40000);

function App() {

  sortPoolsById();
  const [currentBlockHeight, setCurrentBlockHeight] = useState<number>(0);
  const [currentDateTimeString, setCurrentDateTimeString] = useState<string>();
  const [choosenPools, setChoosenPools] = useState<Pool[]>(CHOSEN_POOLS);
  const [showRandomInfo, setShowRandomInfo] = useState<boolean>(false);
  const [fisoData, setFisoData] = useState<BlockHouseResponse>();
  const [wallets, setWallets] = useState<Wallet[]>();
  const [currentWalletApi, setCurrentWalletApi] = useState<any>();
  const [showConnectWallet, setShowConnectWallet] = useState<boolean>(false);
  const [currentWallet, setCurrentWallet] = useState<Wallet>();
  const [currentAddress, setCurrentAddress] = useState<string>();
  const [lucid, setLucid] = useState<Lucid>();
  const [showWalletError, setShowWalletError] = useState<boolean>(false);
  const [currentPoolId, setCurrentPoolid] = useState<string | null>(null);
  const [showStakeSuccess, setShowStakeSuccess] = useState<boolean>(false);
  const [showRegisterStake, setShowRegisterStake] = useState<boolean>(false);
  const [showTxError, setShowTxError] = useState<boolean>(false);
  const [txError, setTxError] = useState<string>("");

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
              if (!isFirstLoad)
                jsConfetti.addConfetti();
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
      isFirstLoad = false;
    };

    const refreshStakeDataAsync = async () => {
      const fisoDataRequest = await fetch(`https://teddy-fiso.azurewebsites.net/api/teddy_fiso_api`);
      const fisoDataResponse: BlockHouseResponse = await fisoDataRequest.json();
      setFisoData(fisoDataResponse);
    };

    refreshStakeDataAsync();
    // refreshResultsAsync();
  }, [currentBlockHeight]);

  const fisoDataByPoolTicker = useCallback((ticker: string) => fisoData?.pooldata.filter(v => v.ticker === ticker)?.at(0), [fisoData]);

  useEffect(() => {
    choosenPools.sort((a, b) => {
      const aData = fisoDataByPoolTicker(a.ticker);
      const bData = fisoDataByPoolTicker(b.ticker);
      if (aData === undefined || bData === undefined) return 0;
      if (parseFloat(aData.live_stake.replaceAll(",", "")) === parseFloat(bData.live_stake.replaceAll(",", ""))) return 0;
      if (parseFloat(aData.live_stake.replaceAll(",", "")) < parseFloat(bData.live_stake.replaceAll(",", "")))
        return -1;
      else
        return 1;
    });

    setChoosenPools(choosenPools);

  }, [choosenPools, fisoData, fisoDataByPoolTicker]);

  const isSmallestFisoPool = (ticker: string) => {
    return fisoData?.pooldata.sort((a, b) => {
      if (parseFloat(a.live_stake.replaceAll(",", "")) === parseFloat(b.live_stake.replaceAll(",", ""))) return 0;
      if (parseFloat(a.live_stake.replaceAll(",", "")) < parseFloat(b.live_stake.replaceAll(",", "")))
        return -1;
      else
        return 1;
    }).at(0)?.ticker === ticker
  };

  const nextResultBlock = TARGET_BLOCK + (TARGET_BLOCK_INTERVAL * CHOSEN_POOLS.length);
  const blocksRemaining = nextResultBlock - currentBlockHeight;
  const secondsRemaining = blocksRemaining * 20;
  // const timeRemaining = moment().add(secondsRemaining, "seconds").fromNow();

  const onConnectWalletShow = async () => {
    setShowConnectWallet(true);
  };

  const onConnectWallet = async (wallet: Wallet) => {
    const lucid = await Lucid.new(
      new Blockfrost("https://cardano-mainnet.blockfrost.io/api/v0", "mainnetP3r1osidROSxcW9Vas1ywFiRiRkMcDyj"),
      "Mainnet",
    );


    const api = await (window as any).cardano[wallet.id].enable();
    lucid.selectWallet(api);

    const rewardAddress = await lucid?.wallet.rewardAddress();

    setLucid(lucid);
    setCurrentWalletApi(api);
    setCurrentWallet(wallet);
    setShowConnectWallet(false);
    setCurrentAddress(await lucid.wallet.address());
    setCurrentPoolid((await getDelegationAsync(rewardAddress!))[0].delegated_pool);
  }

  const getDelegationAsync = async (rewardAddress: string) => {
    const accInfoReq = fetch(
      "https://api.koios.rest/api/v0/account_info",
      {
        headers: { "content-type": "application/json" },
        method: "POST", body: JSON.stringify({ _stake_addresses: [rewardAddress] })
      });
    const accInfo = await (await accInfoReq).json();
    return accInfo;
  }

  const onStake = async (pool: Pool) => {
    if (lucid !== undefined) {
      try {
        const rewardAddress = await lucid?.wallet.rewardAddress();
        let tx = lucid?.newTx();

        const accInfoReq = fetch(
          "https://api.koios.rest/api/v0/account_info",
          {
            headers: { "content-type": "application/json" },
            method: "POST", body: JSON.stringify({ _stake_addresses: [rewardAddress] })
          });
        const accInfo = await (await accInfoReq).json();

        if (accInfo[0].status !== "registered") {
          tx = tx.registerStake(rewardAddress!).addSigner(rewardAddress!);
        }

        const txHash = await (await (await tx.delegateTo(rewardAddress!, pool.idBech32!).complete())?.sign().complete())?.submit();
        setShowStakeSuccess(true);
        await lucid?.awaitTx(txHash);
        setCurrentPoolid((await getDelegationAsync(rewardAddress!))[0].delegated_pool);
      } catch (ex: any) {
        setShowRegisterStake(false);
        setTxError(ex.toString());
        setShowTxError(true);
      }

    } else {
      setShowWalletError(true);
    }
  }

  useEffect(() => {
    const getWalletsAsync = async () => {
      const result: Wallet[] = [];
      const cardano = (window as any).cardano;
      for (const i in cardano) {
        const p = cardano[i];
        if (p.apiVersion != null && p.icon != null && p.name != null && i !== "ccvault") {
          result.push({
            apiVersion: p.apiVersion,
            icon: p.icon,
            name: p.name,
            id: i.toString()
          });
        }
      }
      return result;
    };

    (async () => setWallets(await getWalletsAsync()))();
  }, []);

  callback = () => {
    setCurrentDateTimeString(new Date().toString());
  }

  return (
    <div className="App bg-main bg-cover bg-center w-[100vw] h-[100vh] pb-6">
      <main className="container mx-auto relative">
        <header className="pt-4">
          <div className="flex justify-center lg:justify-start"><img src="teddy-logo.svg" alt="logo" className="w-[200px]" /></div>
          <h1 className="text-[#66A7F2] lg:text-[35px] text-[25px] font-bold">FISO Stake Dashboard</h1>
          <h2 className="text-[#66A7F2] lg:text-[25px] text-[15px] font-bold">Latest Cardano Block: <b className="text-white">{currentBlockHeight}</b></h2>
          <div className="md:absolute md:right-0 md:top-5 static">
            {currentWalletApi === undefined && <Button startIcon={<WalletTwoTone />} onClick={onConnectWalletShow}>Connect Wallet</Button>}
            {currentWalletApi !== undefined && currentAddress !== undefined &&
              <Chip className="!text-white" avatar={<Avatar src={currentWallet?.icon} />} label={currentAddress?.substring(0, 10) + "..." + currentAddress?.substring(currentAddress?.length - 6)} onClick={() => setCurrentWalletApi(undefined)} />}
            {currentWalletApi !== undefined && currentAddress === undefined &&
              <Chip className="!text-white" avatar={<Loop className="animate-spin" />} label={"loading..."} />}
          </div>
        </header>
        <section className="grid grid-cols-1 md:grid-cols-3 font-medium text-white text-[22px] mt-6 md:gap-4 gap-2">
          <Card sx={{ backgroundColor: "#294F72", color: "#FFF" }} className="!rounded-lg py-4 px-6">
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Total Stake
              </Typography>
              <Typography variant="h5" component="div">
                {fisoData?.fiso_stats.total_stake} ₳
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                All Time
              </Typography>
              <Typography variant="body2">
                Total Growth Since
                <br />
                <b>{fisoData?.fiso_stats.total_growth_full} ₳</b>
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ backgroundColor: "#294F72", color: "#FFF" }} className="!rounded-lg py-4 px-6">
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Total Growth
              </Typography>
              <Typography variant="h5" component="div">
                {fisoData?.fiso_stats.total_growth_last_day} ₳
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                last 24 hours
              </Typography>
              <Typography variant="body2">
                Total Delegators
                <br />
                <b>{fisoData?.fiso_stats.total_delegators}</b>
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ backgroundColor: "#294F72", color: "#FFF" }} className="!rounded-lg py-4 px-6">
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Total Growth
              </Typography>
              <Typography variant="h5" component="div">
                {fisoData?.fiso_stats.total_growth_last_hour} ₳
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                last 1 hour
              </Typography>
              <Typography variant="body2">
                Total Growth Live
                <br />
                <b>{fisoData?.fiso_stats.total_growth_live} ₳</b>
              </Typography>
            </CardContent>
          </Card>

        </section>
        <section className="font-medium text-white text-[22px] mt-6">
          <Paper elevation={2} sx={{ backgroundColor: "#294F72", color: "#FFF" }} className="mt-8 !rounded-lg py-4 px-6">
            <div className="flex relative">
              <div>
                <h3 className="mr-4 lg:text-[25px] text-[15px] hidden sm:inline-block align-middle">FISO Stake Pools</h3>
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
                  <div className={`w-[42px] h-[15px] bg-teddy-smallest rounded-lg inline-block align-middle`}></div>
                </div>
                <div>
                  <div className="ml-2 inline-block align-middle text-[17px]"><span>=</span> x1.25 bonus</div>
                </div>
              </div>
              <div className="flex basis-1/3 absolute right-0">
                <div>
                  <div className="ml-2 inline-block align-middle text-[17px]">
                    {!showRandomInfo &&
                      <IconButton aria-label="delete" color="info" onClick={() => setShowRandomInfo(!showRandomInfo)}>
                        <Info />
                      </IconButton>}
                    {showRandomInfo &&
                      <IconButton aria-label="delete" color="info" onClick={() => setShowRandomInfo(!showRandomInfo)}>
                        <Close />
                      </IconButton>}
                  </div>
                </div>
              </div>
            </div>
            {isFirstLoad && (
              <div>
                <Loop className="animate-spin" />
              </div>)
            }
            <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-4 mb-4 gap-4">
              {choosenPools.map((pool, i) => {
                return <Paper className={"h-[180px] !rounded-lg py-2 pl-2 text-[12px] text-right !bg-teddy-active"} key={i}>
                  <div className="grid grid-cols-4 content-center ">
                    <div className="grid content-center justify-center">
                      <Avatar alt={pool.ticker} sx={{ width: 70, height: 70 }} src={`https://ui-avatars.com/api/?name=${pool.ticker}&background=random`} />
                    </div>
                    <div className="col-span-3 mr-3">
                      <div className="flex justify-end">
                        <div className="font-bold mr-1 text-gray-800 "><a href={pool.homepage} target="_blank" rel="noreferrer" className="underline">{pool.ticker}</a></div>
                        <div className="font-bold text-gray-800 ">| {fisoDataByPoolTicker(pool.ticker)?.name}</div>
                      </div>
                      <div className="flex justify-end">
                        <div className="text-gray-800 font-bold">#{pool.choosenBlockNo}</div>
                      </div>
                      <div className="flex justify-end">
                        <div className="mr-1 text-gray-800">Live Stake: </div>
                        <div className="text-gray-800 font-bold">{fisoDataByPoolTicker(pool.ticker)?.live_stake} ₳</div>
                      </div>
                      <div className="flex justify-end">
                        <div className="mr-1 text-gray-800">Blocks: </div>
                        <div className="text-gray-800 font-bold">{fisoDataByPoolTicker(pool.ticker)?.block_count}</div>
                      </div>
                      <div className="flex justify-end">
                        <div className="mr-1 text-gray-800">Delegators: </div>
                        <div className="text-gray-800 font-bold">{fisoDataByPoolTicker(pool.ticker)?.delegators}</div>
                      </div>
                      <div className="flex justify-end">
                        <div className="mr-1 text-gray-800">Fixed Fee: </div>
                        <div className="text-gray-800 font-bold">{fisoDataByPoolTicker(pool.ticker)?.fixed_fee} ₳</div>
                      </div>
                      <div className="flex justify-end">
                        <div className="mr-1 text-gray-800">Margin Fee: </div>
                        <div className="text-gray-800 font-bold">{fisoDataByPoolTicker(pool.ticker)?.margin}%</div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full mt-2 flex justify-center">
                    {currentPoolId !== pool.idBech32 && <>
                      {isSmallestFisoPool(pool.ticker) &&
                        <Badge badgeContent={"x1.25"} color="error"><Button color="success" className="w-[120px] h-[30px] !text-gray-800" variant="contained" startIcon={<Wallet />} onClick={() => onStake(pool)}>stake</Button></Badge>
                      }
                      {!isSmallestFisoPool(pool.ticker) &&
                        <Button color="success" className="w-[120px] h-[30px] !text-gray-800" variant="contained" startIcon={<Wallet />} onClick={() => onStake(pool)}>stake</Button>}
                    </>}

                    {currentPoolId != null && currentPoolId === pool.idBech32 &&
                      <Button color="info" className="w-[120px] h-[30px] !text-gray-800" variant="contained" startIcon={<ConfirmationNumber />}>STAKED</Button>}
                  </div>
                </Paper>
              })}
              {/* {choosenPools.filter(p => !p.invalid).slice(10, 25).map((pool, i) => {
                return <Paper className="grid grid-cols-2 content-center h-[50px] !bg-teddy-reserved !rounded-lg p-2 text-[12px] text-center" key={i}>
                  <Avatar alt={pool.ticker} src={`https://ui-avatars.com/api/?name=${pool.ticker}&background=random`} />
                  <div>
                    <div className="font-bold">{pool.ticker}</div>
                    <div className="text-gray-600">#{pool.choosenBlockNo}</div>
                  </div>
                </Paper>
              })} */}
              {/* {Array.from({ length: 10 - choosenPools.filter(p => !p.invalid).slice(0, 10).length }, (_, i) => i + 1).map((_, i) => i + 1).map((_, i) => {
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
              })} */}
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
      </main >
      <Dialog
        open={showRandomInfo}
        onClose={() => setShowRandomInfo(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" color={"white"}>
          {"Random Selection Process"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <span className="text-white">
              <h3>The FISO pools was selected using the block hash as a random seed, the first block was choosen at block 8336640. One pool was selected per 180 blocks (1 hour) until all 25 stake pools were selected.</h3>
              <br />
              <span>The selection process was be based on a cyclic division of the block hash using the modulo operator. The resulting number was be used to index into an array of qualified pools, which is ordered based on their pool id (which is a hash) and sorted. This ensures that the selection of pools was random and unbiased, and provides a way to periodically update the set of chosen pools. Furthermore, by ordering the pools based on their pool id, it ensures that there is a deterministic ordering of the pools, which can be useful for debugging or auditing purposes. In case a block hash results in a number that maps to a pool that has already been chosen, the block was skipped, and the next block was used, based on the predetermined interval. This ensured that the final set of chosen pools was unique, and no pool is chosen more than once.</span>
            </span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowRandomInfo(false)} autoFocus>
            Okay
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={showConnectWallet}
        onClose={() => setShowConnectWallet(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" color={"white"}>
          {"Connect your wallet!"}
        </DialogTitle>
        <DialogContent className="w-[480px] text-white">
          {(wallets === undefined || wallets?.length <= 0) && <>No wallets found.</>}
          <List>
            {wallets?.map(wallet =>
              <div key={wallet.id}>
                <ListItem disablePadding>
                  <ListItemButton onClick={() => onConnectWallet(wallet)}>
                    <ListItemIcon>
                      <Avatar src={wallet.icon} />
                    </ListItemIcon>
                    <ListItemText className="text-white" primary={wallet.name.toUpperCase()} />
                  </ListItemButton>
                </ListItem>
              </div>
            )}
          </List>
        </DialogContent>
      </Dialog>
      <Snackbar open={showWalletError} autoHideDuration={6000} onClose={() => setShowWalletError(false)}>
        <Alert onClose={() => setShowWalletError(false)} severity="error" sx={{ width: '100%' }}>
          Please connect your wallet first!
        </Alert>
      </Snackbar>
      <Snackbar open={showTxError} autoHideDuration={6000} onClose={() => setShowTxError(false)}>
        <Alert onClose={() => setShowTxError(false)} severity="error" sx={{ width: '100%' }}>
          Something went wrong, please try again. {txError}
        </Alert>
      </Snackbar>
      <Snackbar open={showStakeSuccess} autoHideDuration={6000} onClose={() => setShowStakeSuccess(false)}>
        <Alert onClose={() => setShowStakeSuccess(false)} severity="success" sx={{ width: '100%' }}>
          Congratulations, you are now staked to a TeddySwap FISO Pool 🎊, Please note that it will take a few seconds for this to be reflected!
        </Alert>
      </Snackbar>
      <Snackbar open={showRegisterStake}>
        <Alert severity="success" sx={{ width: '100%' }}>
          Processing registering your stake address for the first time, Please wait...
        </Alert>
      </Snackbar>
      <footer className="flex content-center justify-center text-center text-white w-full mt-6 md:flex-row flex-col">
        <span className="self-center mr-2">
          Special thanks to <a href="https://cardano-blockhouse.de/" target="_blank" rel="noreferrer" className="underline">Cardano Blockhouse</a>
        </span>
        <img className="self-center" width="50" src="https://teddyswap.cardano-blockhouse.de/img/cbh_logo.png" alt="cbh" />
      </footer>
    </div >
  );
}

export default App;
