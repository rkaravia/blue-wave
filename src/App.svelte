<script>
  import Header from "./components/Header.svelte";
  import BlueWave from "./components/BlueWave/BlueWave.svelte";
  import Footer from "./components/Footer.svelte";

  import * as Replayable from "./components/Replayable";

  let replay;

  let useDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
  updateBackgroundColor();

  function updateBackgroundColor() {
    document.body.style.background = useDarkMode ? "#15202b" : "";
  }

  function toggleDarkMode() {
    useDarkMode = !useDarkMode;
    updateBackgroundColor();
  }
</script>

<style>
  main {
    color: #333;
    --color-blue: #81a8db;
    --color-red: #ff7a64;
    --color-open: #d7d7d7;
  }

  main :global(a),
  main :global(a:visited) {
    color: #0064c8;
  }

  main.bw-dark {
    color: #fff;
    --color-blue: #618ec0;
    --color-red: #ce6661;
    --color-open: #7b7b7c;
  }

  main.bw-dark :global(a),
  main.bw-dark :global(a:visited) {
    color: #1b95e0;
  }
</style>

<main class:bw-dark={useDarkMode}>
  <Header />
  <BlueWave bind:replay />
  <Footer on:replay={replay} on:toggleDarkMode={toggleDarkMode} />
</main>
