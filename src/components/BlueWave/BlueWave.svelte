<script>
  import * as Replayable from "../Replayable";
  import Bar from "./Bar.svelte";
  import Year from "./Year.svelte";
  import Map from "./Map.svelte";
  import { getHexagonMap } from "../../helpers/hexagons.js";
  import results2016 from "../../data/results2016.json";
  import results2020 from "../../data/results2020.json";

  export let data = { results2016, results2020 };

  const { hexagons, lines, bounds, stopsByColor } = getHexagonMap(data);

  let doReplay;

  export function replay() {
    doReplay();
  }
</script>

<Replayable.Context bind:replay={doReplay}>
  <Bar {stopsByColor} />
  <Year />
  <Map {hexagons} {lines} {bounds} />
</Replayable.Context>
