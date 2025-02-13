import "dotenv/config";
import {
  createNft,
  fetchDigitalAsset,
  mplTokenMetadata,
} from "@metaplex-foundation/mpl-token-metadata";

import {
  getExplorerLink,
  getKeypairFromEnvironment,
} from "@solana-developers/helpers";

import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";

import { Connection, clusterApiUrl } from "@solana/web3.js";
import {
  generateSigner,
  keypairIdentity,
  percentAmount,
} from "@metaplex-foundation/umi";

const connection = new Connection(clusterApiUrl("devnet"));

const user = await getKeypairFromEnvironment("SECRET_KEY");

console.log("Loaded user", user.publicKey.toBase58());

const umi = createUmi(connection.rpcEndpoint);
umi.use(mplTokenMetadata());

const umiUser = umi.eddsa.createKeypairFromSecretKey(user.secretKey);
umi.use(keypairIdentity(umiUser));

console.log("Set up Umi instance for user");

const collectionMint = await generateSigner(umi);

const transaction = await createNft(umi, {
  mint: collectionMint,
  name: "mereRam",
  symbol: "dev",
  uri: "https://walrus.tusky.io/OHFH6jpLcd-Js2fWI2doHETk2IowvY-eFNM-Qi5HaZA",
  sellerFeeBasisPoints: percentAmount(0),
  isCollection: true,
});
await transaction.sendAndConfirm(umi);

const createdCollectionNft = await fetchDigitalAsset(
  umi,
  collectionMint.publicKey
);

console.log(
  `Created Collection 📦! Address is ${getExplorerLink(
    "address",
    createdCollectionNft.mint.publicKey,
    "devnet"
  )}`
);
