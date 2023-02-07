
export type Pool = {
    ticker: string
    id: string
    choosenBlockNo?: number
    invalid?: boolean
    idBech32?: string
};

export const sortedByIdPools = () => {
    return QUALIFIED_POOLS.sort((a: Pool, b: Pool) => {
        return a.id.localeCompare(b.id);
    });
};


export const QUALIFIED_POOLS: Pool[] = [
    {
        ticker: "HEDGE",
        id: "281f1aa1feb755f5bb1173a59e78ae5167fea70f728219e6810f28ee"
    },
    {
        ticker: "MYLO",
        id: "90e719ff625d4652a6f41568f9cdc0c8ddf90a7556929b4d30298e8c"
    },
    {
        ticker: "DAO",
        id: "b1dde27cdda55577137376f9cd867c68bd22f7343a9c0ce0cc2cd551"
    },
    {
        ticker: "LSS",
        id: "4d470d31f80c01d797996b43abdfe7339ae5b408fb31cc655a80ccd7"
    },
    {
        ticker: "DDOS",
        id: "a59e2c8422ed40242742f3b6e8219fa0c454eaa7288d71981d3b65a9"
    },
    {
        ticker: "ITZA",
        id: "c29dd3c55a4f3f3b02aae6463ef8e1e66a70b5d000f8a6dc3430ef04"
    },
    {
        ticker: "LOOPS",
        id: "c9bc139d73045ba6c5b002ff88ea2a5854b3e783c468adb9250df917"
    },
    {
        ticker: "DND",
        id: "0084f4fee5502c87ee5c4f5c592856f2bfb6269355b9d87ed549e551"
    },
    {
        ticker: "TTS17",
        id: "5790d62ab1ba703e861fe800f9cefaaf1485c3ca42c6ba9ce74690a1"
    },
    {
        ticker: "SEA",
        id: "f1ae552b032c2d87a416f4067eaf4636b3fe5e80230a1f63aa33f6bc"
    },
    {
        ticker: "ECP",
        id: "d61ab012cf4b0c24daf2447309638b25573f85b0a7e4ffdb60db9b22"
    },
    {
        ticker: "KORA",
        id: "d81407a659b5a9f59e4ab0c644d06c71a82afe9f78f5d4def27ed685"
    },
    {
        ticker: "NSPYR",
        id: "45faad3e1ab98f4a06a54e3d1a3bc70bed80d6e437ce8f9361a5a9be"
    },
    {
        ticker: "KTOP",
        id: "8d2fef46df5f9b2fcb64ebad739f27062b4f38c04df1a916fa216752"
    },
    {
        ticker: "CSP",
        id: "693cb17b244a81dfaa589c2a076ea604e35462a3915a28d6c98685c9"
    },
    {
        ticker: "FUNGI",
        id: "9dcb2a0398835a6b0a71dd5bbaa0d6bb961276aedd72f2655c7879d0"
    },
    {
        ticker: "FRCA",
        id: "4af5266d2b3ad11fb848d393008ff934678e02989e2ce263ac05a80d"
    },
    {
        ticker: "CHEF",
        id: "682fd73eea4d7370b6f7a781c80b1252817b23f74688cea6257471f3"
    },
    {
        ticker: "ARM1",
        id: "a2ccd8e93f5a518d4400790cb081673e79ed41e4bf1132f740f26a28"
    },
    {
        ticker: "LAGO",
        id: "e94c464e6994f92111f356c29a8c4b6b87080faea06897eb60fa2758"
    },
    {
        ticker: "ENVY",
        id: "14eae9da8ab6d322176ea88f40e9d32d843996bf2de88240e35594ea"
    },
    {
        ticker: "TREK",
        id: "c6c0117e031cb813891a07439188fa3f3556fd7ee318d80a03d50fb6"
    },
    {
        ticker: "WAT",
        id: "ee92ba5963b30f6fcfad5f338d5b8ab5e0ba028c5af5ed877d7a9893"
    },
    {
        ticker: "SUI",
        id: "71499ef7ad908b4d456955fd6eac7fe4986991cde9f3f38b5abbd58b"
    },
    {
        ticker: "A3C",
        id: "159bd971439653da2b97d12facae06ff5e6d7410d074edaab425202b"
    },
    {
        ticker: "VETS",
        id: "a39c252e5179a5919a0b74b22bfc279801c3c88c305f7d3655b09a0d"
    },
    {
        ticker: "STLL",
        id: "033c7a00ae33e9a0fa6802b388ccfa5ca9633d712231c41c468c2d39"
    },
    {
        ticker: "TOPO",
        id: "9dda57fac3474adbe8b64be48aafeff6aa31f59909231f202b642d33"
    },
    {
        ticker: "ONE",
        id: "00a6461d1561987241f41c34d42c5c5830a11510d3007a32d33f007e"
    },
    {
        ticker: "BBHMM",
        id: "7874e696cf4baca102c098067ca483f2370d2bdc958ad322dadf650b"
    },
    {
        ticker: "SUDTI",
        id: "2dabd15e4759334738940a65e06b6589f674a29347db0a36d75a5d36"
    },
    {
        ticker: "Yoada",
        id: "96553a437b99271fdcaa30c279e432224342e88147741db73872f03c"
    },
    {
        ticker: "HONEY",
        id: "5be57ce6d1225697f4ad4090355f0a72d6e1e2446d1d768f36aa118c"
    },
    {
        ticker: "EUSKL",
        id: "b4122e4d02a6986e9604d5c74ab2974e80638f78e6bd1aa01b883e6e"
    },
    {
        ticker: "DOLCA",
        id: "550f5dc96814537404c7544175d348262699e448d74005dfa26540d3"
    },
    {
        ticker: "CBH",
        id: "c4039f4fa97ed735b884800d6d605dbc65fbe995c4ba70b532e162a2"
    },
    {
        ticker: "CDN",
        id: "d65467e9d63f124ed903101f82868bda6ffd39f83bc7d30de65a288f"
    },
    {
        ticker: "GAIA",
        id: "f66a36de855d53b9d5110bd46640f48dbab1c848c9e2f5c36d8c12dc"
    },
    {
        ticker: "ADAR",
        id: "f0e3c8d48efb750cdf256b68babc880787bc688972acfbbee1ffc537"
    },
    {
        ticker: "CRPL",
        id: "cc49ee3c6b02850b63dd9c18b1b6a18b16c2dd1f20962c320cfd94a7"
    },
    {
        ticker: "ATM",
        id: "003da6afe37eca8d1bec9a040a51f23eb085c3e1b924948a214067e7"
    },
    {
        ticker: "GREEN",
        id: "34a89f77c5fcf0563d129bde9b255f20b269a2dda1561c65d418ec40"
    },
    {
        ticker: "SPRO",
        id: "a50d1fd3cda9b9452cb149474a601d24332a870a6fe32b60add3a98b"
    },
    {
        ticker: "ADAHS",
        id: "5201765589793cc9a04d8f378bc85125ec0ef7bf70beb84d01692c82"
    },
    {
        ticker: "RISE",
        id: "1e4f8dc9672d16131da6533287e32ea100b34d67543ff7c7358c7b5e"
    },
    {
        ticker: "NOVA",
        id: "827c7aa359964ec100a9a3b943c73c1dd2056725b8897fd744c8adc0"
    },
    {
        ticker: "YUMMI",
        id: "440781cb7ac2ec0e653ad9e502303f63e51a7afc0ccaae5be06e37ef"
    },
    {
        ticker: "STKH1",
        id: "b62ecc8ce7e46c4443b63b91fffaeb19f869d191a7d2381087aaa768"
    },
    {
        ticker: "EQUTY",
        id: "39c6ec8fe6dd619d005f17905dde221e31cbd4aadf5eecef9c611311"
    },
    {
        ticker: "NIMUE",
        id: "68d8505aea5a000e630f904f8741c1deec9135a729e5df770fe3b659"
    },
    {
        ticker: "DOXA",
        id: "a6d3691e1ff660bc6f6da75feea466a26b7f8a21c0f41d74940a7639"
    },
    {
        ticker: "SOLIA",
        id: "eeb180952144eaf1aa5ff27a19322a5560e027ca1510bae10ec2e76a"
    },
    {
        ticker: "FLUID",
        id: "38c2ea35c92392314b84f70535632b1b8ac3d3bd99fa7786296b160c"
    },
    {
        ticker: "VET",
        id: "72b90b4cce444f1ede43323879d8bbed7219801b2928a736df89dfa5"
    },
    {
        ticker: "ADNT",
        id: "f11fc71643e98cb05abbba2d7b132a66a4014cf5e1effd1fe533811c"
    },
    {
        ticker: "NEXUS",
        id: "2b5ac5073e3e8071024263a8fe69e4577bcf3bfed41110ced8ac8aa7"
    },
    {
        ticker: "VLHLA",
        id: "29889ecc8151e5a93fcd321cd905eee0f50c8364273550205058bfe8"
    },
    {
        ticker: "RABIT",
        id: "9fa14b049b735e287da702a2b0a7c2a6612e81db9cc4284339a6a2f1"
    },
    {
        ticker: "OYSTR",
        id: "febb924e349d816997e007dc09847ded9a2e72d218023c0e5186176d"
    },
    {
        ticker: "GNP1",
        id: "4b0a9386e29fae1d2a240bb585a7d1e94f76fa63b9ddbf23e1c72e9d"
    },
    {
        ticker: "XORN",
        id: "6a37c771eb33798edea1cc2b95759fc30a7765bbfc63668bdc92c633"
    },
    {
        ticker: "AAATO",
        id: "96cd4a3a846cad3a99b43a3632990ba2eba9a2153f736f78ab2ab3e1"
    },
    {
        ticker: "CBFR",
        id: "d6095a71081323dbc614d974f6159c37cd5f4133c8830172f877ca51"
    },
    {
        ticker: "HAMDA",
        id: "bb32c21c1ca7dc8f73fad1b6263987139a868fad820b3c3069fefcd6"
    },
    {
        ticker: "COINZ",
        id: "91991d9238f3f270a46fc237acc3abcdf2456ff163c1639951d75d15"
    },
    {
        ticker: "GREAT",
        id: "fa8b96740590a9638e8b548ca07992c776efda3ea56f50f8d99bf73d"
    },
    {
        ticker: "VROOM",
        id: "138031b823a08dec4535e583ca8ea91530abd9c62b1c0b768fd1f834"
    },
    {
        ticker: "LCP",
        id: "bcc34d3c45cd3b8770c75c91c3023a9146aa505c4bd5cf094dae9acc"
    },
    {
        ticker: "LTES",
        id: "86d56db6754947d5c6dfd788568c189cc188d448aa6bc4ee634f655a"
    },
    {
        ticker: "LAKE",
        id: "abcd27d5ee8f838e24cdb8653cbe309a86d7a4c48576ac3e0893a810"
    },
    {
        ticker: "KAWAN",
        id: "40c5a505a4276c94e49b848c1b0aa62c4ea244574f4e2e28ebb29210"
    },
    {
        ticker: "GRANA",
        id: "7a4c1ee9d663dd8d3b1bedf13155cc624c5dfa95f432c30d198cd3c6"
    },
    {
        ticker: "MNSTR",
        id: "a223873b6d882d07c44bfd2baac9f5acbb09c5b886858404cb375a99"
    },
    {
        ticker: "RSV",
        id: "1be0613ee44270f56b5fbb71f667528e1d877d77d349dd7324d50869"
    },
    {
        ticker: "BIKES",
        id: "33502e7de0cc0331534210f16726b7c0c8407ca40e2ab2754dff0bd5"
    },
    {
        ticker: "ADAVZ",
        id: "2f4e768d6769a2ee28b93d198f974e9424b2b3f3fca8b1d48d90007d"
    },
    {
        ticker: "TRUST",
        id: "b42ea10739065e30e388d4781a7f5a446c3a31343c87dcf26750f83d"
    },
    {
        ticker: "CCPL",
        id: "74e98daf82b20099df575c83fe7b9fc828035aabbe34e5ed4990d1b8"
    },
    {
        ticker: "ALKUL",
        id: "671dd64d0255f9b857ff8d445ea5b2b4cead3a62411560ee649ddaf7"
    },
    {
        ticker: "PPP",
        id: "359f35c5dbf9121784988355771054feb9c82d61d1f2b1226cea5448"
    },
    {
        ticker: "RIOT",
        id: "0dbd895b0d875c64aa8d76fefcfc8765e46f383e983b38464eeafb3c"
    },
    {
        ticker: "RTIST",
        id: "0df0f6e5a3191520aa0a58268c38fe608d1d931766fc006635f3f2b1"
    },
    {
        ticker: "SAGAN",
        id: "387c1f515894d2511d1e791161e69882ddb427ab1701b7af719a8c9f"
    },
    {
        ticker: "OTAKU",
        id: "77ff160eacd3e99e84b70c9216f698965004da4b3dc628dac60cd290"
    },
    {
        ticker: "ASN",
        id: "f1263e0885fb00f352968294c5a6bf18da372b98236f55a457416d62"
    },
    {
        ticker: "SHARE",
        id: "ea7cdd8918204b6c53e41ac6b0c319a1ffa95312660eeeb2ced8be3a"
    },
    {
        ticker: "8BALL",
        id: "8ba11724b0b39f34223d166a752da604269db13562095d6386a14bb3"
    },
    {
        ticker: "SAPIO",
        id: "c3cd2527a5f0b82a86ff69fdd5a3440dc51bcb957953ba19137738c0"
    },
    {
        ticker: "KYOTO",
        id: "144b0b64741e666be425df847ef72a25e9a2d5e8712c15a7097d235f"
    },
    {
        ticker: "AZTEC",
        id: "2119e61a82bde0dd3e41aaffe530229b98164831a6ea2f4875571163"
    },
    {
        ticker: "NANI",
        id: "d0deba25ce9e6ff59af7f39305fce373241156616cdf0a49b1d49e48"
    },
    {
        ticker: "OBI",
        id: "2b2b2404c6ff959e80e1ca70bead8b84516bac8269e6e60a16b6e3bb"
    },
    {
        ticker: "HOLA",
        id: "ce9f192835046ba71ed302d5d3e0ba99d65fd3950346cadad4781814"
    },
    {
        ticker: "CAKE",
        id: "b31af8dc07b05f799805f82853f69dd8d9de48bb89f4371bc46f5cc9"
    },
    {
        ticker: "CAMP",
        id: "06e18b1dff6bb6a8aeaba67e6c1e9e19d41bc783b2fcb0901aa4d735"
    },
    {
        ticker: "ALFA",
        id: "381ad61d5031c2a570c268d2f018bfb65c6eb7e32e535a58384f9a21"
    },
    {
        ticker: "DOTAR",
        id: "7cd510133850b195b1f989bc96c88d86203fe574806eaba169c78d41"
    },
    {
        ticker: "ARMN",
        id: "2a05c534817a0b97ce0c5a2354b6e35a067c52408fa70c77e0b5e378"
    },
    {
        ticker: "ISR",
        id: "5121819e5114235cb8c377ecf0a9d4e311898c447043e3b5b2848f63"
    },
    {
        ticker: "PIADA",
        id: "b8d8742c7b7b512468448429c776b3b0f824cef460db61aa1d24bc65"
    },
    {
        ticker: "9000",
        id: "4f3410f074e7363091a1cc1c21b128ae423d1cce897bd19478e534bb"
    },
    {
        ticker: "AGC",
        id: "f04fd2e69f967986b370fe95dd6bc4f7dce314c270a5cfbb9e6a540f"
    }
];