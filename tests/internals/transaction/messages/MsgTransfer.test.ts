import { CosmosMsg, MsgTransfer } from "../../../../src";

describe("MsgTransfer", () => {
  test("it returns the correct typeUrl", () => {
    const msg = new MsgTransfer({
      sender: "address1",
      receiver: "address2",
      sourcePort: "channel-1",
      sourceChannel: "channel-2",
      token: { amount: "1000000", denom: "uastrod" },
      timeoutHeight: { revisionHeight: "100", revisionNumber: "1" },
      timeoutTimestamp: "1000000000",
    });

    expect(msg.typeUrl).toEqual("/ibc.applications.transfer.v1.MsgTransfer");
  });

  test("it converts to CosmosMsg", () => {
    const msg = new MsgTransfer({
      sender: "address1",
      receiver: "address2",
      sourcePort: "channel-1",
      sourceChannel: "channel-2",
      token: { amount: "1000000", denom: "uastrod" },
      timeoutHeight: { revisionHeight: "100", revisionNumber: "1" },
      timeoutTimestamp: "1000000000",
    });

    const cosmosMsg: CosmosMsg = msg.toCosmosMsg();

    expect(cosmosMsg).toEqual({
      typeUrl: "/ibc.applications.transfer.v1.MsgTransfer",
      value: {
        sender: "address1",
        receiver: "address2",
        sourcePort: "channel-1",
        sourceChannel: "channel-2",
        token: { amount: "1000000", denom: "uastrod" },
        timeoutHeight: { revisionHeight: "100", revisionNumber: "1" },
        timeoutTimestamp: "1000000000",
      },
    });
  });

  test("it converts to TerraExtension string", () => {
    const msg = new MsgTransfer({
      sender: "address1",
      receiver: "address2",
      sourcePort: "channel-1",
      sourceChannel: "channel-2",
      token: { amount: "1000000", denom: "uastrod" },
      timeoutHeight: { revisionHeight: "100", revisionNumber: "1" },
      timeoutTimestamp: "1000000000",
    });

    const terraExtensionMsg: string = msg.toTerraExtensionMsg();

    expect(terraExtensionMsg).toEqual(
      JSON.stringify({
        "@type": "/ibc.applications.transfer.v1.MsgTransfer",
        sender: "address1",
        receiver: "address2",
        source_port: "channel-1",
        source_channel: "channel-2",
        token: { amount: "1000000", denom: "uastrod" },
        timeout_height: { revision_height: "100", revision_number: "1" },
        timeout_timestamp: "1000000000",
      }),
    );
  });

  test("token amd timeoutHeight are optional", () => {
    const msg = new MsgTransfer({
      sender: "address1",
      receiver: "address2",
      sourcePort: "channel-1",
      sourceChannel: "channel-2",
      timeoutTimestamp: "1000000000",
    });

    const cosmosMsg: CosmosMsg = msg.toCosmosMsg();

    expect(cosmosMsg).toEqual({
      typeUrl: "/ibc.applications.transfer.v1.MsgTransfer",
      value: {
        sender: "address1",
        receiver: "address2",
        sourcePort: "channel-1",
        sourceChannel: "channel-2",
        timeoutTimestamp: "1000000000",
      },
    });

    const terraExtensionMsg: string = msg.toTerraExtensionMsg();

    expect(terraExtensionMsg).toEqual(
      JSON.stringify({
        "@type": "/ibc.applications.transfer.v1.MsgTransfer",
        sender: "address1",
        receiver: "address2",
        source_port: "channel-1",
        source_channel: "channel-2",
        timeout_timestamp: "1000000000",
      }),
    );
  });
});
