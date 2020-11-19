<script>
  import * as Replayable from "../Replayable";
  import { fadeInEnd, fadeOutStart } from "../../helpers/animations.js";
</script>

<style>
  .bw-years {
    position: relative;
  }

  svg {
    position: absolute;
    width: 100%;
  }

  text {
    transform: translate(180px, 22px);
    text-anchor: middle;
    fill: currentColor;
    font-size: 20px;
  }
</style>

<div class="bw-years">
  <Replayable.Animation>
    <svg viewBox="0 0 360 30">
      <text style={fadeOutStart}>2016</text>
      <text style={fadeInEnd}>2020</text>
    </svg>
  </Replayable.Animation>
</div>
