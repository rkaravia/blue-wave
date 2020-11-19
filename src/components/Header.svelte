<script>
  const timestamp = new Date().toISOString().slice(0, 16) + "Z";
  const twitterLink = `(<a href="https://twitter.com/rkaravia">@rkaravia</a>)`;
</script>

<style>
  .bw-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
  }

  .bw-title {
    font-size: 24px;
    font-weight: bold;
  }

  .bw-subtitle {
    margin-top: 4px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 8px;
  }

  .bw-timestamp {
    font-size: 12px;
  }
</style>

<div class="bw-header">
  <div class="bw-title">Blue wave</div>
  <div class="bw-subtitle">
    <div>
      by Roman Karavia
      {@html twitterLink}
    </div>
    <div class="bw-timestamp">v3 @ {timestamp}</div>
  </div>
</div>
