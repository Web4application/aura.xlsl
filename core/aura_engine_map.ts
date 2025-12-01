import { xlmathEngine } from "../backend/xlmath/xlmath.engine";
import { xlcodeEngine } from "../backend/xlcode/xlcode.engine";
import { xldataEngine } from "../backend/xldata/xldata.engine";
import { xlquantumEngine } from "../backend/xlquantum/xlquantum.engine";
import { xlaiEngine } from "../backend/xlai/xlai.engine";

export const EngineMap = {
  ".xlmath": xlmathEngine,
  ".xlcode": xlcodeEngine,
  ".xldata": xldataEngine,
  ".xlquantum": xlquantumEngine,
  ".xlai": xlaiEngine,
};
