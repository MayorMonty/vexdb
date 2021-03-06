import test from "ava";
import { size, constant } from "../out/main";
import { version } from "../package";

test("Register a header", (t) => {
  constant.header({
    Accept: "application/json",
  });
  t.deepEqual(constant.settings.headers, {
    "User-Agent": "vexdb (nodejs)",
    Accept: "application/json",
  });
});

test("Register a default parameter", async (t) => {
  const cmp = await size("events", { season: "Nothing But Net" });
  constant.param({
    season: "Nothing But Net",
  });
  t.is(await size("events"), cmp);
});
