<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  function replay() {
    dispatch("replay");
  }

  function toggleDarkMode() {
    dispatch("toggleDarkMode");
  }
</script>

<style>
  p {
    margin-bottom: 24px;
  }

  h2 {
    margin-bottom: 8px;
  }
</style>

<p>
  A 7 second summary of the
  <a
    href="https://en.wikipedia.org/wiki/2020_United_States_presidential_election">
    2020 US presidential election
  </a>
</p>

<button on:click={replay}>Replay</button>

<h2>Not shown: Disenfranchised voters</h2>
<ul>
  <li>
    <a
      href="https://en.wikipedia.org/wiki/United_States_Electoral_College#Lack_of_enfranchisement_of_U.S._territories">
      Roughly four million Americans in Puerto Rico, the Northern Mariana
      Islands, the U.S. Virgin Islands, American Samoa, and Guam
    </a>
  </li>
  <li>
    Victims of
    <a
      href="https://en.wikipedia.org/wiki/Voter_suppression_in_the_United_States">
      voter suppression
    </a>
  </li>
  <li>
    <a
      href="https://en.wikipedia.org/wiki/Felony_disenfranchisement_in_the_United_States">
      Millions of convicted felons
    </a>
  </li>
</ul>
<h2>Credits</h2>
<ul>
  <li>
    Electoral College Map from
    <a href="https://pitchinteractiveinc.github.io/tilegrams/">
      Pitch Interactive
    </a>
  </li>
  <li>
    Colors from
    <a
      href="https://nzzdev.github.io/Storytelling-Styleguide/#/colors?a=united-states">
      NZZ Visuals
    </a>
  </li>
</ul>
<h2>Disclaimers</h2>
<ul>
  <li>
    <a
      href="https://en.wikipedia.org/wiki/Faithless_electors_in_the_2016_United_States_presidential_election">
      Faithless electors
    </a>
    are ignored
  </li>
</ul>
<h2>Technical details</h2>
<ul>
  <li>
    Made with
    <a href="https://svelte.dev/">Svelte</a>
  </li>
  <li>
    Inspired by
    <a href="https://www.redblobgames.com/grids/hexagons/">
      Hexagonal Grids from Red Blob Games
    </a>
  </li>
  <li>
    Source code on GitHub:
    <a href="https://github.com/rkaravia/blue-wave">rkaravia/blue-wave</a>
  </li>
  <li>
    Also available in
    <a
      href="https://svelte.dev/repl/4720c76789b84e349764f7d1c0ef395c?version=3.29.7">
      Svelte REPL
    </a>
  </li>
</ul>
<button on:click={toggleDarkMode}>Toggle light/dark mode</button>
