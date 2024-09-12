import { storageKeys } from "@/constants";
import { atomWithStorage } from "jotai/utils";

export const referralStore = atomWithStorage<string>(
  storageKeys.REFERRAL_CODE,
  ""
);
