import { MsgGrantAllowance as CosmosMsgGrantAllowance } from "cosmjs-types/cosmos/feegrant/v1beta1/tx";

import BasicAllowance from "./BasicAllowance";
import TransactionMsg, { CosmosMsg, ProtoMsg } from "./TransactionMsg";

export type MsgGrantAllowanceValue = {
  granter: string;
  grantee: string;
  allowance: BasicAllowance;
};

export class MsgGrantAllowance extends TransactionMsg<MsgGrantAllowanceValue> {
  static TYPE = "/cosmos.feegrant.v1beta1.MsgGrantAllowance";

  constructor({ granter, grantee, allowance }: MsgGrantAllowanceValue) {
    super(MsgGrantAllowance.TYPE, {
      granter,
      grantee,
      allowance,
    });
  }

  toCosmosMsg(): CosmosMsg {
    return {
      typeUrl: this.typeUrl,
      value: {
        ...this.value,
        allowance: this.value.allowance.toCosmosMsg(),
      },
    };
  }

  toTerraExtensionMsg(): any {
    return JSON.stringify({
      "@type": this.typeUrl,
      ...this.value,
      allowance: {
        "@type": this.value.allowance.typeUrl,
        ...this.value.allowance.value,
      },
    });
  }

  toProtoMsg(): ProtoMsg {
    const cosmosMsg = this.toCosmosMsg();
    return {
      typeUrl: this.typeUrl,
      value: CosmosMsgGrantAllowance.encode(CosmosMsgGrantAllowance.fromPartial(cosmosMsg.value)).finish(),
    };
  }
}

export default MsgGrantAllowance;
