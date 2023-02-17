import fetch from 'node-fetch';
import * as fs from 'fs';

const QUALIFIED_POOLS = [
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

let finalDelegators = [];

const main = async () => {
    for (let i in QUALIFIED_POOLS) {
        const pool = QUALIFIED_POOLS[i];
        console.log(new Date(), 'Fetching Delegators ', pool.idBech32, pool.ticker);
        const requestDelegators = async () => {
            console.log(new Date(), 'Requesting ', `https://api.koios.rest/api/v0/pool_delegators?_pool_bech32=${pool.idBech32}`);
            const poolDelegationReq = await fetch(`https://api.koios.rest/api/v0/pool_delegators?_pool_bech32=${pool.idBech32}`);
            const delegators = await poolDelegationReq.json();
            return delegators;
        };
        finalDelegators = [...finalDelegators, ...(await requestDelegators()).map(d => d.stake_address)];
    }
    console.log(new Date(), "Total Delegators Detected", finalDelegators.length);
    fs.writeFileSync("delegators.json", JSON.stringify(finalDelegators));
}

main();