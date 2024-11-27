import { useState, useEffect } from 'react';
import './App.css';
import abi from './contractJson/test.json';
import { ethers } from 'ethers';

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null
  });
  
  const [account, setAccount] = useState('Not connected');

  useEffect(() => {
    const template = async () => {
      const contractAddress = ""; // Replace with your actual contract address
      const contractABI = abi.abi;

      try {
        const { ethereum } = window;

        if (!ethereum) {
          alert("Metamask not detected");
          return;
        }

        const accounts = await ethereum.request({
          method: "eth_requestAccounts"
        });
        window.ethereum.on("accountsChanged",()=>{
          window.location.reload()
        })
        setAccount(accounts[0]);

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        console.log(contract)
        setState({ provider, signer, contract });
      } catch (error) {
        alert(error.message);
      }
    };
    template();
  }, []);

  return (
    <div className="App">
      connected account: {account}
      
    </div>
  );
}

export default App;
