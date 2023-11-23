import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/decenMessage.sol/decenMessage.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [reciever, setReciever] = useState("");
  const [newMessage, setNewMessage] = useState("");

  const contractAddress = "0xc5A85Ed4674426F5AdB853c038639CfA12fbbc05";
  const atmABI = atm_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(account);
    }
  };

  const handleAccount = (account) => {
    if (account) {
      console.log("Account connected: ", account);
      setAccount(account);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);

    // once wallet is set we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);
  };

  const getBalance = async () => {
    console.log("getBalance");
    if (atm) {
      console.log("inside atm");
      const is_message = await atm.getMessage({
        from: account[0],
      });
      setBalance(is_message);
      console.log(is_message);
    }
  };

  const sendMessage = async () => {
    if (atm) {
      console.log(`reciever ${reciever}, message: ${newMessage}`);
      let tx = await atm.sendMessage(reciever, newMessage, {
        from: account[0],
      });
      await tx.wait();
    }
  };

  const initUser = () => {
    // Check to see if user has Metamask
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>;
    }

    // Check to see if user is connected. If not, connect to their account
    if (!account) {
      return (
        <button onClick={connectAccount}>
          Please connect your Metamask wallet
        </button>
      );
    }

    if (balance == undefined) {
      getBalance();
    }

    return (
      <div>
        <p>Your Account: {account[0]}</p>
        <p>Your Messages: {balance}</p>
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main className="container">
      <header>
        <h1>Welcome to the Decen Message</h1>
      </header>
      {initUser()}
      <style jsx>
        {`
          .container {
            text-align: center;
          }
        `}
      </style>
      <div>
        Reciever Address:
        <input
          type="text"
          value={reciever}
          placeholder="Address"
          onChange={(e) => setReciever(e.target.value)}
        />
        <br></br>
        Message:
        <input
          type="text"
          placeholder="Message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <br></br>
        <button onClick={sendMessage}>Send Message</button>
      </div>
    </main>
  );
}
