export function formatIcon(tokenInfo) {
  if (tokenInfo && tokenInfo.logo_url) {
    return store.state.globalConfig + tokenInfo.logo_url;
  }
  if (tokenInfo && typeof tokenInfo === "string") {
    let [address, chain] = tokenInfo.split("-");
    if (address && chain) {
      address = address?.replace?.(/:/g, "") || address;
      return `https://www.avestorage.cloud/token_icon/${chain}/${address}.png`;
    }
    return "";
  }
  let address = tokenInfo?.address || tokenInfo?.token || "";
  address = address?.replace?.(/:/g, "") || address;
  return (
    tokenInfo?.logo_url ||
    tokenInfo?.appendix?.logo_url ||
    `https://www.avestorage.cloud/token_icon/${
      tokenInfo?.chain || tokenInfo?.network || ""
    }/${address}.png`
  );
}
