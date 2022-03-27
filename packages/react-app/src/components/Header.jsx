import { PageHeader } from "antd";
import React from "react";

export default function Header() {
  return (
    <a href="https://github.com/brotherlymite/aave-transfer-account" target="_blank" rel="noopener noreferrer">
      <PageHeader
        title="AAVE Flash Account Transfer"
        subTitle="Transfer all your AAVE Positions from one account to another (v2 Kovan MainMarket)"
        style={{ cursor: "pointer" }}
      />
    </a>
  );
}