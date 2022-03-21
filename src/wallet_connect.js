import React, { useState } from "react";
import { InjectedConnector } from "@web3-react/injected-connector";
import "bootstrap/dist/css/bootstrap.min.css";
import { useWeb3React } from "@web3-react/core";

export default function Wallet_connect() {
  const injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42, 56, 97, 1337],
  });

  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();

  const connect = async () => {
    try {
      await activate(injected);
    } catch (ex) {
      console.log(ex);
    }
  };

  const Wallet_connect = () => {};

  return (
    <div className="container">
      <div className="row" style={{ marginBottom: "10px" }}>
        <div className="col">
          <label className="form-label">UST:</label>
          <input type="number" className="form-control"></input>
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <button
            type="button"
            className="btn btn-primary form-control"
            onClick={connect}
          >
            Dispot
          </button>
        </div>
        <div className="col-6">
          <button type="button" className="btn btn-primary form-control">
            Claim
          </button>
        </div>
      </div>
      {active ? (
        <span>
          Connected with <b>{account}</b>
        </span>
      ) : (
        <span>Not connected</span>
      )}
    </div>
  );
}
